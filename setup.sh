#!/bin/bash

# Script de setup inicial para el proyecto Flask Comments API
echo "🚀 Configurando proyecto Flask Comments API..."

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 no está instalado. Por favor, instala Python 3.11 o superior."
    exit 1
fi

echo "✅ Python encontrado: $(python3 --version)"

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
echo "🔄 Activando entorno virtual..."
source venv/bin/activate

# Actualizar pip
echo "⬆️ Actualizando pip..."
pip install --upgrade pip

# Instalar dependencias
echo "📥 Instalando dependencias..."
pip install -r requirements.txt

# Instalar dependencias de desarrollo
echo "🛠️ Instalando dependencias de desarrollo..."
pip install pytest flask-testing flake8

echo "✅ Setup completado!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Activar el entorno virtual: source venv/bin/activate"
echo "2. Ejecutar la aplicación: python app.py"
echo "3. Probar la API: ./test_api.sh"
echo "4. Ejecutar tests: python -m pytest tests/ -v"
echo ""
echo "🌐 La aplicación estará disponible en: http://localhost:8080"
