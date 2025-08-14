# Flask Comments API

Una API RESTful desarrollada con Flask para gestionar comentarios, con despliegue automatizado en Google Cloud Run usando CI/CD.

## 🚀 Características

- API RESTful para gestionar comentarios
- Base de datos SQLite
- Dockerización
- CI/CD con GitHub Actions
- Despliegue en Google Cloud Run
- Tests automatizados
- Health checks

## 📋 Endpoints

### Health Check
- `GET /health` - Verificar estado de la API

### Comentarios
- `GET /api/comments` - Obtener todos los comentarios
- `POST /api/comments` - Crear un nuevo comentario
- `GET /api/comments/{id}` - Obtener un comentario específico
- `DELETE /api/comments/{id}` - Eliminar un comentario

### Ejemplo de uso

```bash
# Crear un comentario
curl -X POST http://localhost:8080/api/comments \
  -H "Content-Type: application/json" \
  -d '{"author": "Juan Pérez", "content": "Este es mi comentario"}'

# Obtener todos los comentarios
curl http://localhost:8080/api/comments

# Obtener un comentario específico
curl http://localhost:8080/api/comments/1

# Eliminar un comentario
curl -X DELETE http://localhost:8080/api/comments/1
```

## 🛠️ Desarrollo Local

### Requisitos
- Python 3.11+
- Docker (opcional)

### Instalación

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd flask-comments-api
```

2. Crear entorno virtual:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecutar la aplicación:
```bash
python app.py
```

La API estará disponible en `http://localhost:8080`

### Ejecutar tests

```bash
python -m pytest tests/ -v
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t flask-comments-api .
```

### Ejecutar contenedor
```bash
docker run -p 8080:8080 flask-comments-api
```

## ☁️ Despliegue en Google Cloud

Este proyecto incluye un pipeline de CI/CD que despliega automáticamente en Google Cloud Run cuando se hace push a la rama `main`.

### Configuración requerida:

1. **Secrets en GitHub:**
   - `GCP_PROJECT_ID`: ID de tu proyecto de Google Cloud
   - `GCP_SA_KEY`: Clave JSON de la cuenta de servicio

2. **Servicios de Google Cloud habilitados:**
   - Cloud Run API
   - Artifact Registry API
   - Cloud Build API

## 🔧 Configuración de Google Cloud

Ver la sección de configuración en la documentación del proyecto.

## 📊 Monitoreo

- Health check disponible en `/health`
- Logs disponibles en Google Cloud Console
- Métricas de Cloud Run disponibles

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
