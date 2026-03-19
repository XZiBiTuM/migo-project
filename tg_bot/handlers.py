import logging
from aiogram import Router, F, types
from aiogram.filters import CommandStart, Command
from aiogram.fsm.context import FSMContext
from asgiref.sync import sync_to_async

from tg_bot.states import LeadForm
from tg_bot import keyboards as kb

from core.models import Lead

router = Router()

MAPPING_TYPES = {
    'work': Lead.LeadType.JOB,
    'housing': Lead.LeadType.HOUSING,
    'service': Lead.LeadType.SERVICE,
    'law': Lead.LeadType.SERVICE, # Map law to service for now, or you can add LAW to LeadType in django
    'docs': Lead.LeadType.SERVICE,
    'dms': Lead.LeadType.SERVICE,
}

@router.message(CommandStart())
async def cmd_start(message: types.Message, state: FSMContext, command: Command):
    # Deep link arguments come in command.args
    args = command.args
    
    if args and args in MAPPING_TYPES:
        lead_type = MAPPING_TYPES[args]
        await state.update_data(lead_type=lead_type, utm_source=f'telegram_bot_start_{args}')
        await message.answer(
            f"Здравствуйте, {message.from_user.first_name}! Давайте оформим заявку.\n"
            "Как к вам обращаться (Ваше Имя)?",
            reply_markup=types.ReplyKeyboardRemove()
        )
        await state.set_state(LeadForm.waiting_for_name)
    else:
        # Default menu
        await message.answer(
            f"Добро пожаловать в MIGO, {message.from_user.first_name}!\n"
            "MIGO — сервис помощи гражданам СНГ в России.\n\n"
            "Выберите интересующее вас направление:",
            reply_markup=kb.main_menu_kb()
        )

@router.callback_query(F.data.startswith("type_"))
async def process_main_menu_callback(callback: types.CallbackQuery, state: FSMContext):
    action = callback.data.split("_")[1] # job, housing, service, law
    
    lead_type = MAPPING_TYPES.get(action, Lead.LeadType.SERVICE)
    await state.update_data(lead_type=lead_type, utm_source='telegram_bot_menu')
    
    await callback.message.edit_reply_markup(reply_markup=None)
    await callback.message.answer(
        "Давайте оформим заявку.\nКак к вам обращаться (Ваше Имя)?",
        reply_markup=types.ReplyKeyboardRemove()
    )
    await state.set_state(LeadForm.waiting_for_name)
    await callback.answer()

@router.message(LeadForm.waiting_for_name)
async def process_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text)
    await message.answer(
        "Пожалуйста, поделитесь вашим номером телефона.",
        reply_markup=kb.phone_request_kb()
    )
    await state.set_state(LeadForm.waiting_for_phone)

@router.message(LeadForm.waiting_for_phone)
async def process_phone(message: types.Message, state: FSMContext):
    if message.contact:
        phone = message.contact.phone_number
    else:
        phone = message.text
        
    await state.update_data(phone=phone)
    await message.answer(
        "Укажите ваше гражданство:",
        reply_markup=kb.citizenship_kb()
    )
    await state.set_state(LeadForm.waiting_for_citizenship)

@router.message(LeadForm.waiting_for_citizenship)
async def process_citizenship(message: types.Message, state: FSMContext):
    await state.update_data(citizenship=message.text)
    await message.answer(
        "В каком городе вы находитесь/планируете работать?",
        reply_markup=types.ReplyKeyboardRemove()
    )
    await state.set_state(LeadForm.waiting_for_city)

@router.message(LeadForm.waiting_for_city)
async def process_city(message: types.Message, state: FSMContext):
    await state.update_data(city=message.text)
    await message.answer(
        "Хотите добавить комментарий к заявке? (или нажмите Пропустить)",
        reply_markup=kb.skip_kb()
    )
    await state.set_state(LeadForm.waiting_for_comment)

@router.message(LeadForm.waiting_for_comment)
async def process_comment(message: types.Message, state: FSMContext):
    comment = "" if message.text.lower() == "пропустить" else message.text
    await state.update_data(comment=comment)
    
    data = await state.get_data()
    
    summary = (
        f"📋 <b>Проверьте ваши данные:</b>\n\n"
        f"👤 Имя: {data.get('name')}\n"
        f"📱 Телефон: {data.get('phone')}\n"
        f"🌍 Гражданство: {data.get('citizenship')}\n"
        f"🏙 Город: {data.get('city')}\n"
    )
    if comment:
        summary += f"💬 Комментарий: {comment}\n"
        
    summary += "\nСогласны ли вы на обработку персональных данных для связи с вами?"
    
    await message.answer(summary, reply_markup=kb.confirm_consent_kb(), parse_mode="HTML")
    await state.set_state(LeadForm.confirm_consent)

@router.callback_query(LeadForm.confirm_consent, F.data.startswith("consent_"))
async def process_consent(callback: types.CallbackQuery, state: FSMContext):
    action = callback.data.split("_")[1]
    
    if action == "no":
        await callback.message.edit_reply_markup(reply_markup=None)
        await callback.message.answer("Заявка отменена. Вы можете начать заново, отправив /start.")
        await state.clear()
        return

    # User agreed
    await callback.message.edit_reply_markup(reply_markup=None)
    data = await state.get_data()
    
    # Save to Django Database using sync_to_async
    try:
        data['telegram_id'] = str(callback.from_user.id)
        await save_lead_to_db(data)
        await callback.message.answer(
            "✅ <b>Спасибо! Ваша заявка успешно отправлена.</b>\n\n"
            "Наш специалист скоро свяжется с вами для уточнения деталей.",
            parse_mode="HTML"
        )
    except Exception as e:
        logging.error(f"Error saving lead: {e}")
        await callback.message.answer("Произошла ошибка при сохранении заявки. Пожалуйста, попробуйте позже.")
        
    await state.clear()
    await callback.answer()


@sync_to_async
def save_lead_to_db(data: dict):
    from core.models import Lead
    Lead.objects.create(
        lead_type=data.get('lead_type', Lead.LeadType.JOB),
        name=data.get('name', ''),
        phone=data.get('phone', ''),
        citizenship=data.get('citizenship', ''),
        city=data.get('city', ''),
        comment=data.get('comment', ''),
        telegram_id=data.get('telegram_id', ''),
        consent_given=True,
        utm_source=data.get('utm_source', 'telegram_bot')
    )
