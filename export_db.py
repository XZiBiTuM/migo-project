import os
import subprocess
import sys

def export_database():
    venv_python = os.path.join(".venv", "Scripts", "python.exe")
    output_file = "data_export.json"
    
    if not os.path.exists(venv_python):
        print(f"Ошибка: Не найден виртуальный окружение по пути {venv_python}")
        return

    print(f"Экспорт базы данных в {output_file}...")
    
    try:
        env = os.environ.copy()
        env["PYTHONUTF8"] = "1"
        env["PYTHONIOENCODING"] = "utf-8"

        result = subprocess.run([
            venv_python, "manage.py", "dumpdata", 
            "--indent", "2", 
            "--output", output_file,
            "--exclude", "auth.permission", 
            "--exclude", "contenttypes"
        ], capture_output=True, text=True, encoding='utf-8', env=env)

        if result.returncode == 0:
            print(f"Успешно! Файл {output_file} создан.")
        else:
            print(f"Ошибка при экспорте: {result.stderr}")
            
    except Exception as e:
        print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    export_database()
