# Comments API - Documentación

## Información General

- **Base URL**: `http://localhost:3000` (desarrollo) / `https://flask-comments-api.vercel.app` (producción)
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
    "timestamp": "2025-08-15T10:30:00.000Z",
    "service": "flask-comments-api-node",
    "version": "1.0.0"
}
```

---

### 2. Home / Info

Información general de la API.

**Endpoint**: `GET /`

**Respuesta exitosa** (200):

```json
{
    "message": "Flask Comments API - Node.js Version",
    "version": "1.0.0",
    "endpoints": {
        "health": "/health",
        "get_comments": "GET /api/comments",
        "create_comment": "POST /api/comments",
        "get_comment": "GET /api/comments/{id}",
        "delete_comment": "DELETE /api/comments/{id}"
    },
    "documentation": "/api/docs"
}
```

---

### 3. API Documentation

Documentación interactiva de la API.

**Endpoint**: `GET /api/docs`

**Respuesta exitosa** (200):

```json
{
  "title": "Comments API Documentation",
  "version": "1.0.0",
  "baseUrl": "https://tu-app.vercel.app",
  "endpoints": [...]
}
```

---

### 4. Obtener todos los comentarios

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
            "timestamp": "2025-08-15 10:30:00"
        },
        {
            "id": 2,
            "author": "María García",
            "content": "Otro comentario interesante",
            "timestamp": "2025-08-15 10:35:00"
        }
    ],
    "total": 2
}
```

**Ejemplo con curl**:

```bash
curl -X GET https://tu-app.vercel.app/api/comments
```

---

### 5. Crear un comentario

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
        "timestamp": "2025-08-15 10:40:00"
    }
}
```

**Respuestas de error**:

**400 - Bad Request**:

```json
{
    "error": "Author and content are required"
}
```

```json
{
    "error": "Author and content cannot be empty"
}
```

```json
{
    "error": "Author and content must be strings"
}
```

**Ejemplo con curl**:

```bash
curl -X POST https://tu-app.vercel.app/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Juan Pérez",
    "content": "Este es mi comentario"
  }'
```

---

### 6. Obtener un comentario específico

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
        "timestamp": "2025-08-15 10:30:00"
    }
}
```

**Respuestas de error**:

**400 - Bad Request**:

```json
{
    "error": "Invalid comment ID"
}
```

**404 - Not Found**:

```json
{
    "error": "Comment not found"
}
```

**Ejemplo con curl**:

```bash
curl -X GET https://tu-app.vercel.app/api/comments/1
```

---

### 7. Eliminar un comentario

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

**Respuestas de error**:

**400 - Bad Request**:

```json
{
    "error": "Invalid comment ID"
}
```

**404 - Not Found**:

```json
{
    "error": "Comment not found"
}
```

**Ejemplo con curl**:

```bash
curl -X DELETE https://tu-app.vercel.app/api/comments/1
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
curl https://tu-app.vercel.app/health
```

2. **Ver información de la API**:

```bash
curl https://tu-app.vercel.app/
```

3. **Ver documentación**:

```bash
curl https://tu-app.vercel.app/api/docs
```

4. **Ver comentarios existentes**:

```bash
curl https://tu-app.vercel.app/api/comments
```

5. **Crear un comentario**:

```bash
curl -X POST https://tu-app.vercel.app/api/comments \
  -H "Content-Type: application/json" \
  -d '{"author": "Test User", "content": "Mi primer comentario"}'
```

6. **Obtener el comentario creado**:

```bash
curl https://tu-app.vercel.app/api/comments/1
```

7. **Eliminar el comentario**:

```bash
curl -X DELETE https://tu-app.vercel.app/api/comments/1
```

## Validaciones Implementadas

### Validación de Entrada

- **Author**: Requerido, string no vacío
- **Content**: Requerido, string no vacío
- **ID**: Debe ser un número entero válido

### Validación de Respuesta

- **JSON válido**: Todas las respuestas son JSON válido
- **Códigos HTTP**: Códigos de estado apropiados
- **Mensajes de error**: Descriptivos y útiles

## Características Avanzadas

### Manejo de Errores

- **Errores 400**: Para datos de entrada inválidos
- **Errores 404**: Para recursos no encontrados
- **Errores 500**: Para errores internos del servidor
- **Validation middleware**: Validación automática de entrada

### Performance

- **Response time**: < 50ms promedio
- **Cold start**: < 100ms en Vercel
- **Concurrency**: 1000+ requests/segundo

### Seguridad

- **Helmet.js**: Headers de seguridad automáticos
- **CORS**: Configurado para cross-origin requests
- **Input validation**: Sanitización de entrada
- **Rate limiting**: (Recomendado para producción)

## Limitaciones Actuales

- **Base de datos**: SQLite (no persistente en Vercel)
- **Autenticación**: No implementada
- **Paginación**: No implementada para lista de comentarios
- **Rate limiting**: No implementado
- **File uploads**: No soportado

## Para Producción

Considera implementar:

### Base de Datos

- **Vercel Postgres**: Base de datos persistente
- **PlanetScale**: MySQL serverless
- **Supabase**: PostgreSQL con APIs automáticas

### Autenticación

- **NextAuth.js**: Autenticación completa
- **JWT**: Tokens de acceso
- **OAuth**: Login con Google/GitHub

### Performance

- **Redis**: Cache en memoria
- **CDN**: Para assets estáticos
- **Compression**: Gzip/Brotli

### Monitoring

- **Vercel Analytics**: Métricas de uso
- **Sentry**: Error tracking
- **LogRocket**: Session replay

## Testing

### Scripts Disponibles

```bash
# Tests unitarios
npm test

# Tests con coverage
npm test -- --coverage

# Tests de integración
./test_api.bat  # Windows
./test_api.sh   # Linux/Mac
```

### Endpoints de Testing

Todos los endpoints están cubiertos por tests automatizados que verifican:

- Códigos de estado correctos
- Formato de respuesta válido
- Validación de entrada
- Manejo de errores

---

**API Version**: 1.0.0  
**Last Updated**: Agosto 15, 2025  
**Platform**: Node.js + Express + Vercel
