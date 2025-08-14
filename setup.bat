@echo off
REM Script de setup inicial para el proyecto Flask Comments API (Windows)
echo 🚀 Configurando proyecto Flask Comments API...

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no está instalado. Por favor, instala Python 3.11 o superior.
    pause
    exit /b 1
)

echo ✅ Python encontrado:
python --version

REM Crear entorno virtual si no existe
if not exist "venv" (
    echo 📦 Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual
echo 🔄 Activando entorno virtual...
call venv\Scripts\activate.bat

REM Actualizar pip
echo ⬆️ Actualizando pip...
python -m pip install --upgrade pip

REM Instalar dependencias
echo 📥 Instalando dependencias...
pip install -r requirements.txt

REM Instalar dependencias de desarrollo
echo 🛠️ Instalando dependencias de desarrollo...
pip install pytest flask-testing flake8

echo ✅ Setup completado!
echo.
echo 📋 Próximos pasos:
echo 1. Activar el entorno virtual: venv\Scripts\activate
echo 2. Ejecutar la aplicación: python app.py
echo 3. Probar la API: test_api.bat
echo 4. Ejecutar tests: python -m pytest tests/ -v
echo.
echo 🌐 La aplicación estará disponible en: http://localhost:8080
pause
