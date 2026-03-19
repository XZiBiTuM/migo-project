from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder

def main_menu_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="Найти работу", callback_data="type_job")
    builder.button(text="Подобрать жильё", callback_data="type_housing")
    builder.button(text="Оформить документы", callback_data="type_service")
    builder.button(text="Юр. помощь", callback_data="type_law")
    builder.adjust(2, 2)
    return builder.as_markup()

def phone_request_kb() -> ReplyKeyboardMarkup:
    kb = [
        [KeyboardButton(text="Отправить номер телефона 📱", request_contact=True)]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True, one_time_keyboard=True)

def citizenship_kb() -> ReplyKeyboardMarkup:
    kb = [
        [KeyboardButton(text="Узбекистан 🇺🇿"), KeyboardButton(text="Таджикистан 🇹🇯")],
        [KeyboardButton(text="Кыргызстан 🇰🇬"), KeyboardButton(text="Казахстан 🇰🇿")],
        [KeyboardButton(text="РФ 🇷🇺"), KeyboardButton(text="Другое")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True, one_time_keyboard=True)

def skip_kb() -> ReplyKeyboardMarkup:
    kb = [
        [KeyboardButton(text="Пропустить")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True, one_time_keyboard=True)

def confirm_consent_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="Согласен ✅", callback_data="consent_yes")
    builder.button(text="Отмена ❌", callback_data="consent_no")
    builder.adjust(2)
    return builder.as_markup()
