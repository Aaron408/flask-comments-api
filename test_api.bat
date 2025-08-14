@echo off
REM Script de prueba para la API Flask Comments en Windows
echo 🧪 Iniciando pruebas de la API Flask Comments...

REM URL base de la API (cambiar según el entorno)
if "%1"=="" (
    set BASE_URL=http://localhost:8080
) else (
    set BASE_URL=%1
)

echo 📍 URL base: %BASE_URL%

REM 1. Health Check
echo.
echo 🔄 Test: Health Check
curl -s %BASE_URL%/health
echo.

REM 2. Endpoint principal
echo.
echo 🔄 Test: Home endpoint
curl -s %BASE_URL%/
echo.

REM 3. Obtener comentarios (inicialmente vacío)
echo.
echo 🔄 Test: Obtener comentarios iniciales
curl -s %BASE_URL%/api/comments
echo.

REM 4. Crear primer comentario
echo.
echo 🔄 Test: Crear primer comentario
curl -s -X POST %BASE_URL%/api/comments -H "Content-Type: application/json" -d "{\"author\": \"Test User 1\", \"content\": \"Este es mi primer comentario de prueba\"}"
echo.

REM 5. Crear segundo comentario
echo.
echo 🔄 Test: Crear segundo comentario
curl -s -X POST %BASE_URL%/api/comments -H "Content-Type: application/json" -d "{\"author\": \"Test User 2\", \"content\": \"Este es mi segundo comentario de prueba\"}"
echo.

REM 6. Obtener todos los comentarios
echo.
echo 🔄 Test: Obtener todos los comentarios
curl -s %BASE_URL%/api/comments
echo.

REM 7. Obtener comentario específico
echo.
echo 🔄 Test: Obtener comentario con ID 1
curl -s %BASE_URL%/api/comments/1
echo.

REM 8. Eliminar un comentario
echo.
echo 🔄 Test: Eliminar comentario con ID 1
curl -s -X DELETE %BASE_URL%/api/comments/1
echo.

REM 9. Verificar que el comentario fue eliminado
echo.
echo 🔄 Test: Verificar eliminación del comentario
curl -s %BASE_URL%/api/comments/1
echo.

REM 10. Obtener comentarios finales
echo.
echo 🔄 Test: Obtener comentarios finales
curl -s %BASE_URL%/api/comments
echo.

echo.
echo ✅ Pruebas completadas!
echo.
echo 📋 Endpoints probados:
echo    ✓ GET /health
echo    ✓ GET /
echo    ✓ GET /api/comments
echo    ✓ POST /api/comments
echo    ✓ GET /api/comments/{id}
echo    ✓ DELETE /api/comments/{id}
echo.
echo 🎯 Para probar con una URL específica:
echo    test_api.bat https://tu-servicio-cloud-run.com
