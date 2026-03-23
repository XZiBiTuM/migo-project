import os
import subprocess
import sys

def export_database():
    # Путь к интерпретатору в виртуальном окружении
    venv_python = os.path.join(".venv", "Scripts", "python.exe")
    
    if not os.path.exists(venv_python):
        print(f"Ошибка: Не найден виртуальный окружение по пути {venv_python}")
        return

    output_file = "data_export.json"
    
    print(f"Экспорт базы данных в {output_file}...")
    
    try:
        # Принудительно устанавливаем UTF-8 для окружения Python
        env = os.environ.copy()
        env["PYTHONUTF8"] = "1"
        env["PYTHONIOENCODING"] = "utf-8"

        # Запуск dumpdata через venv python
        result = subprocess.run([
            venv_python, "manage.py", "dumpdata", 
            "--indent", "2", 
            "--output", output_file,
            "--exclude", "auth.permission", 
            "--exclude", "contenttypes"
        ], capture_output=True, text=True, encoding='utf-8', env=env)

        if result.returncode == 0:
            print(f"Успешно! Файл {output_file} создан.")
            print(f"Размер файла: {os.path.getsize(output_file)} байт")
        else:
            print("Ошибка при экспортe:")
            print(result.stderr)
            
    except Exception as e:
        print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    export_database()
