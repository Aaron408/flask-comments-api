# Flask Comments API - Node.js Version

Una API RESTful desarrollada con **Node.js + Express** para gestionar comentarios, con despliegue optimizado en **Vercel**.

# Comments API - Node.js/Express

� **API RESTful para gestionar comentarios** desarrollada con **Node.js y Express**.

> 🎯 **Stack tecnológico moderno** optimizado para performance y costos en Vercel.

## 🚀 Características

- API RESTful para gestionar comentarios
- Desarrollada con **Node.js + Express**
- Base de datos SQLite
- Despliegue automático en **Vercel**
- CI/CD con GitHub Actions
- Tests automatizados con Jest
- Cold starts ultra-rápidos (~50ms)

## ⚡ ¿Por qué Node.js + Vercel?

| Ventaja           | Node.js + Vercel | Alternativas Tradicionales |
| ----------------- | ---------------- | --------------------------- |
| **Cold Start**    | ~50ms            | ~2-3 segundos               |
| **Costo**         | $0/mes           | ~$5-15/mes                  |
| **Setup**         | 5 minutos        | 30-60 minutos               |
| **Mantenimiento** | Mínimo           | Moderado-Alto               |

## 📋 Endpoints

### Health Check

- `GET /health` - Verificar estado de la API

### API Info

- `GET /` - Información general de la API
- `GET /api/docs` - Documentación de endpoints

### Comentarios

- `GET /api/comments` - Obtener todos los comentarios
- `POST /api/comments` - Crear un nuevo comentario
- `GET /api/comments/{id}` - Obtener un comentario específico
- `DELETE /api/comments/{id}` - Eliminar un comentario

### Ejemplo de uso

```bash
# Crear un comentario
curl -X POST https://tu-app.vercel.app/api/comments \
  -H "Content-Type: application/json" \
  -d '{"author": "Juan Pérez", "content": "Este es mi comentario"}'

# Obtener todos los comentarios
curl https://tu-app.vercel.app/api/comments

# Obtener un comentario específico
curl https://tu-app.vercel.app/api/comments/1

# Eliminar un comentario
curl -X DELETE https://tu-app.vercel.app/api/comments/1
```

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

1. Clonar el repositorio:

```bash
git clone <tu-repositorio>
cd comments-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la aplicación:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`

### Scripts disponibles

```bash
npm start          # Iniciar servidor
npm run dev        # Modo desarrollo con nodemon
npm test           # Ejecutar tests
npm run lint       # Linting con ESLint
```

### Ejecutar tests

```bash
# Tests unitarios
npm test

# Tests con coverage
npm test -- --coverage

# Tests en modo watch
npm test -- --watch

# Tests de integración
npm start
# En otra terminal:
./test_api.bat  # Windows
./test_api.sh   # Linux/Mac
```

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Automático (Recomendado)

1. **Conectar a Vercel**:
    - Ve a [vercel.com](https://vercel.com)
    - Conecta tu cuenta de GitHub
    - Import el repositorio
    - ¡Deploy automático! 🎉

2. **URL disponible**: `https://tu-proyecto.vercel.app`

### Opción 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración de CI/CD

Ver archivo `.github/workflows/vercel-deploy.yml` para pipeline completo con:

- Testing automático
- Deploy previews en PRs
- Deploy a producción en main
- Tests de integración post-deploy

## 📁 Estructura del Proyecto

```
comments-api/
├── index.js                 # Aplicación principal Express
├── package.json             # Dependencias y scripts
├── vercel.json             # Configuración de Vercel
├── jest.config.js          # Configuración de tests
├── .eslintrc.js           # Configuración de linting
├── tests/
│   ├── api.test.js        # Tests unitarios
│   └── setup.js           # Setup de tests
├── .github/workflows/
│   └── deploy.yml         # CI/CD pipeline
├── test_api.bat           # Script testing Windows
├── test_api.sh            # Script testing Unix
└── docs/
    ├── SETUP_GUIDE.md
    ├── API_DOCS.md
    └── FINAL_REPORT.md
```

## 🧪 Testing

### Testing Local

```bash
# Iniciar servidor
npm start

# Probar endpoints
./test_api_node.bat  # Windows
./test_api_node.sh   # Linux/Mac
```

### Testing en Producción

```bash
# Probar con URL de Vercel
./test_api.bat https://tu-app.vercel.app
```

## 📊 Monitoreo

- **Vercel Dashboard**: Métricas y logs en tiempo real
- **Health check**: `/health` endpoint
- **Function analytics**: Performance por endpoint
- **Speed Insights**: Core Web Vitals

## 🔧 Configuración Avanzada

### Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

- `NODE_ENV=production`
- `DATABASE_URL=<tu-db-url>` (para DB externa)

### Base de Datos Persistente

Para producción, migrar a:

- **Vercel Postgres** (recomendado)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)

## 📚 Documentación

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Guía completa de setup
- **[API_DOCS.md](API_DOCS.md)** - Documentación de la API
- **[FINAL_REPORT.md](FINAL_REPORT.md)** - Reporte del proyecto

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 🆚 Stack Tecnológico

- **🟢 Node.js + Express + Vercel** - Stack moderno y eficiente
- **📱 API RESTful** - Endpoints completos para gestión de comentarios
- **� CI/CD Automático** - GitHub Actions + Vercel

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start

# 3. Probar API
curl http://localhost:3000/health

# 4. Desplegar a Vercel
# Ve a vercel.com y conecta tu repo!
```

**🎉 ¡Tu API estará live en menos de 5 minutos!**
