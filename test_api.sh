#!/bin/bash

# Script de prueba para la API Node.js Comments
echo "🧪 Iniciando pruebas de la API Node.js Comments..."

# URL base de la API (cambiar según el entorno)
if [ -z "$1" ]; then
    BASE_URL="http://localhost:3000"
else
    BASE_URL="$1"
fi

echo "📍 URL base: $BASE_URL"

# Función para hacer peticiones HTTP y mostrar resultados
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo ""
    echo "🔄 Test: $description"
    echo "   $method $endpoint"
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
                       -H "Content-Type: application/json" \
                       -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    fi
    
    # Separar cuerpo de respuesta y código HTTP
    body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n 1)
    
    echo "   Status: $status_code"
    echo "   Response: $body" | head -c 200
    if [ ${#body} -gt 200 ]; then
        echo "..."
    fi
    echo ""
    
    return $status_code
}

# 1. Health Check
test_endpoint "GET" "/health" "" "Health Check"

# 2. Endpoint principal
test_endpoint "GET" "/" "" "Home endpoint"

# 3. API Documentation
test_endpoint "GET" "/api/docs" "" "API Documentation"

# 4. Obtener comentarios (inicialmente vacío)
test_endpoint "GET" "/api/comments" "" "Obtener comentarios iniciales"

# 5. Crear primer comentario
test_endpoint "POST" "/api/comments" '{"author": "Test User 1", "content": "Este es mi primer comentario de prueba con Node.js"}' "Crear primer comentario"

# 6. Crear segundo comentario
test_endpoint "POST" "/api/comments" '{"author": "Test User 2", "content": "Este es mi segundo comentario de prueba con Express"}' "Crear segundo comentario"

# 7. Obtener todos los comentarios
test_endpoint "GET" "/api/comments" "" "Obtener todos los comentarios"

# 8. Obtener comentario específico
test_endpoint "GET" "/api/comments/1" "" "Obtener comentario con ID 1"

# 9. Intentar crear comentario inválido
test_endpoint "POST" "/api/comments" '{"author": "", "content": ""}' "Crear comentario inválido (campos vacíos)"

# 10. Intentar obtener comentario inexistente
test_endpoint "GET" "/api/comments/999" "" "Obtener comentario inexistente"

# 11. Intentar obtener comentario con ID inválido
test_endpoint "GET" "/api/comments/invalid-id" "" "ID de comentario inválido"

# 12. Eliminar un comentario
test_endpoint "DELETE" "/api/comments/1" "" "Eliminar comentario con ID 1"

# 13. Verificar que el comentario fue eliminado
test_endpoint "GET" "/api/comments/1" "" "Verificar eliminación del comentario"

# 14. Obtener comentarios finales
test_endpoint "GET" "/api/comments" "" "Obtener comentarios finales"

# 15. Probar ruta inexistente
test_endpoint "GET" "/non-existent-route" "" "Probar manejo de ruta inexistente"

echo ""
echo "✅ Pruebas completadas!"
echo ""
echo "📋 Resumen de endpoints probados:"
echo "   ✓ GET /health"
echo "   ✓ GET /"
echo "   ✓ GET /api/docs"
echo "   ✓ GET /api/comments"
echo "   ✓ POST /api/comments"
echo "   ✓ GET /api/comments/{id}"
echo "   ✓ DELETE /api/comments/{id}"
echo "   ✓ Error handling"
echo ""
echo "🎯 Para probar con una URL específica:"
echo "   ./test_api.sh https://tu-app-vercel.vercel.app"
