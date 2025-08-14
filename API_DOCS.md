# Flask Comments API - Documentación de la API

## Información General

- **Base URL**: `http://localhost:8080` (desarrollo) / `https://tu-servicio.run.app` (producción)
- **Formato de respuesta**: JSON
- **Autenticación**: No requerida (para este prototipo)

## Endpoints

### 1. Health Check

Verifica que la API esté funcionando correctamente.

**Endpoint**: `GET /health`

**Respuesta exitosa** (200):
```json
{
  "status": "healthy",
  "timestamp": "2025-08-14T10:30:00.000Z",
  "service": "flask-comments-api"
}
```

---

### 2. Home / Info

Información general de la API.

**Endpoint**: `GET /`

**Respuesta exitosa** (200):
```json
{
  "message": "Flask Comments API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "get_comments": "GET /api/comments",
    "create_comment": "POST /api/comments",
    "get_comment": "GET /api/comments/{id}",
    "delete_comment": "DELETE /api/comments/{id}"
  }
}
```

---

### 3. Obtener todos los comentarios

Obtiene la lista completa de comentarios.

**Endpoint**: `GET /api/comments`

**Respuesta exitosa** (200):
```json
{
  "comments": [
    {
      "id": 1,
      "author": "Juan Pérez",
      "content": "Este es un comentario de ejemplo",
      "timestamp": "2025-08-14 10:30:00"
    },
    {
      "id": 2,
      "author": "María García",
      "content": "Otro comentario interesante",
      "timestamp": "2025-08-14 10:35:00"
    }
  ],
  "total": 2
}
```

**Ejemplo con curl**:
```bash
curl -X GET http://localhost:8080/api/comments
```

---

### 4. Crear un comentario

Crea un nuevo comentario.

**Endpoint**: `POST /api/comments`

**Headers requeridos**:
- `Content-Type: application/json`

**Body requerido**:
```json
{
  "author": "string (requerido, no vacío)",
  "content": "string (requerido, no vacío)"
}
```

**Respuesta exitosa** (201):
```json
{
  "message": "Comment created successfully",
  "comment": {
    "id": 3,
    "author": "Juan Pérez",
    "content": "Mi nuevo comentario",
    "timestamp": "2025-08-14 10:40:00"
  }
}
```

**Respuesta de error** (400):
```json
{
  "error": "Author and content are required"
}
```

**Ejemplo con curl**:
```bash
curl -X POST http://localhost:8080/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Juan Pérez",
    "content": "Este es mi comentario"
  }'
```

---

### 5. Obtener un comentario específico

Obtiene un comentario por su ID.

**Endpoint**: `GET /api/comments/{id}`

**Parámetros**:
- `id` (integer): ID del comentario

**Respuesta exitosa** (200):
```json
{
  "comment": {
    "id": 1,
    "author": "Juan Pérez",
    "content": "Este es un comentario de ejemplo",
    "timestamp": "2025-08-14 10:30:00"
  }
}
```

**Respuesta de error** (404):
```json
{
  "error": "Comment not found"
}
```

**Ejemplo con curl**:
```bash
curl -X GET http://localhost:8080/api/comments/1
```

---

### 6. Eliminar un comentario

Elimina un comentario por su ID.

**Endpoint**: `DELETE /api/comments/{id}`

**Parámetros**:
- `id` (integer): ID del comentario

**Respuesta exitosa** (200):
```json
{
  "message": "Comment deleted successfully"
}
```

**Respuesta de error** (404):
```json
{
  "error": "Comment not found"
}
```

**Ejemplo con curl**:
```bash
curl -X DELETE http://localhost:8080/api/comments/1
```

---

## Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

## Estructura de Error

Todos los errores siguen la misma estructura:

```json
{
  "error": "Descripción del error"
}
```

## Ejemplos de Uso Completos

### Flujo típico de uso:

1. **Verificar estado de la API**:
```bash
curl http://localhost:8080/health
```

2. **Ver comentarios existentes**:
```bash
curl http://localhost:8080/api/comments
```

3. **Crear un comentario**:
```bash
curl -X POST http://localhost:8080/api/comments \
  -H "Content-Type: application/json" \
  -d '{"author": "Test User", "content": "Mi primer comentario"}'
```

4. **Obtener el comentario creado**:
```bash
curl http://localhost:8080/api/comments/1
```

5. **Eliminar el comentario**:
```bash
curl -X DELETE http://localhost:8080/api/comments/1
```

## Limitaciones Actuales

- No hay autenticación implementada
- No hay paginación para la lista de comentarios
- No hay límites de rate limiting
- La base de datos es SQLite (no recomendada para producción)

## Para Producción

En un entorno de producción, considera implementar:
- Autenticación JWT
- Paginación de resultados
- Rate limiting
- Base de datos PostgreSQL
- Validación más robusta
- Logging estructurado
- Métricas y monitoreo
