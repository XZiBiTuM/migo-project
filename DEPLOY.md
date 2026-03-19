# Руководство по деплою проекта MIGO на VDS

Проект состоит из:
1. **Backend**: Django (API)
2. **Frontend**: Next.js
3. **Bot**: Telegram Bot (Aiogram)
4. **Database**: PostgreSQL
5. **Gateway**: Nginx

## 1. Подготовка сервера (VDS)

Рекомендуемая ОС: **Ubuntu 22.04 LTS** или **Debian 12**.

### Установите Docker и Docker Compose:
```bash
# Обновите пакеты
sudo apt update && sudo apt upgrade -y

# Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавьте пользователя в группу docker (чтобы не писать sudo перед docker)
sudo usermod -aG docker $USER
# Перезайдите в терминал!
```

## 2. Перенос файлов

Склонируйте репозиторий на сервер или загрузите файлы через SCP/SFTP.

Затем создайте файл `.env` на сервере со следующим содержимым:

```env
# База данных
DATABASE_URL=postgres://migo_user:migo_password@db:5432/migo_db
POSTGRES_DB=migo_db
POSTGRES_USER=migo_user
POSTGRES_PASSWORD=migo_password

# Django
SECRET_KEY=ВАШ_ОЧЕНЬ_ДЛИННЫЙ_И_СЕКРЕТНЫЙ_КЛЮЧ
DEBUG=False
ALLOWED_HOSTS=api.migo.ru,migo.ru

# Telegram
BOT_TOKEN=ВАШ_ТОКЕН_БОТА

# Frontend
NEXT_PUBLIC_API_URL=https://api.migo.ru
NEXT_PUBLIC_BOT_URL=https://t.me/migo_work
```

## 3. Запуск через Docker Compose

```bash
# Сборка и запуск в фоновом режиме
docker compose up -d --build

# Выполнение миграций базы данных
docker compose exec backend python manage.py migrate

# Создание суперпользователя (для админки)
docker compose exec backend python manage.py createsuperuser

# Сбор статики
docker compose exec backend python manage.py collectstatic --no-input
```

## 4. Настройка SSL (HTTPS)

Файл `nginx/migo.conf` сейчас настроен только на HTTP (порт 80). Для работы через HTTPS рекомендуется использовать **Certbot**.

Пример команды для установки SSL через Certbot:
```bash
sudo apt install certbot
# Нужно временно остановить nginx в докере или использовать webroot
```

Или лучше обновите `migo.conf`, чтобы он поддерживал SSL, и подложите сертификаты в папку `./certs`.

## 5. Перенос данных (если нужно из sqlite)

Если вы хотите перенести текущие данные из `db.sqlite3`:
1. На локальной машине: `python manage.py dumpdata --exclude auth.permission --exclude contenttypes > data.json`
2. Перенесите `data.json` на сервер.
3. На сервере: `docker compose exec backend python manage.py loaddata data.json`

## Полезные команды

- Просмотр логов: `docker compose logs -f`
- Перезапуск: `docker compose restart`
- Остановка: `docker compose down`

---
Разработал: Antigravity
