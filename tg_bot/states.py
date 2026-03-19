from aiogram.fsm.state import State, StatesGroup

class LeadForm(StatesGroup):
    choosing_type = State() # job, housing, service, law
    waiting_for_name = State()
    waiting_for_phone = State()
    waiting_for_citizenship = State()
    waiting_for_city = State()
    waiting_for_comment = State()
    confirm_consent = State()
