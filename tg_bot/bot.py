import os
import sys
import asyncio
import logging
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties

# Load local environment variables (like BOT_TOKEN)
load_dotenv()

# We need to setup Django before importing any Django models
# Make sure the project root is in sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'migo.settings')

# Import Django and set it up
import django
django.setup()

# Now we can import handlers which use Django models
from tg_bot.handlers import router

# Configure logging
logging.basicConfig(level=logging.INFO)

async def main():
    bot_token = os.getenv("BOT_TOKEN")
    if not bot_token:
        logging.error("BOT_TOKEN not found in environment variables. Please create a .env file with BOT_TOKEN=your_token.")
        return

    # Initialize bot and dispatcher
    bot = Bot(token=bot_token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher()

    # Include routers
    dp.include_router(router)

    # Start polling
    logging.info("Starting bot polling...")
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
