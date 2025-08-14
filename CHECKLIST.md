# ✅ Checklist: Implementación Flask Comments API

## Fase 1: Configuración Local (15-20 min)

### 📋 Preparación del entorno

- [ ] **Python 3.11+** instalado
- [ ] **Git** configurado
- [ ] **Docker Desktop** instalado (opcional para testing local)
- [ ] **curl** disponible para testing

### 🚀 Setup inicial

```powershell
# 1. Navegar al directorio del proyecto
cd c:\Users\rerua\OneDrive\Escritorio\GitProjects\flask-comments-api

# 2. Ejecutar setup automático
.\setup.bat

# 3. Activar entorno virtual
venv\Scripts\activate

# 4. Verificar instalación
python app.py
```

- [ ] Entorno virtual creado y activado
- [ ] Dependencias instaladas correctamente
- [ ] Aplicación Flask ejecutándose en localhost:8080
- [ ] Tests pasando: `python -m pytest tests/ -v`

### 🧪 Testing local

- [ ] Health check funciona: `curl http://localhost:8080/health`
- [ ] API endpoints funcionan: `.\test_api.bat`
- [ ] Docker build exitoso: `docker build -t flask-comments-api .`
- [ ] Container funciona: `docker run -p 8080:8080 flask-comments-api`

---

## Fase 2: Configuración de Google Cloud (30-45 min)

### 🌩️ Setup GCP

- [ ] **Cuenta de Google Cloud** creada
- [ ] **Proyecto nuevo** creado: `flask-comments-api-[tu-nombre]`
- [ ] **Project ID** anotado para configuración
- [ ] **Billing** habilitado (requerido para APIs)

### 🔧 Configuración de servicios

```bash
# En Google Cloud Shell o gcloud CLI local:

# 1. Configurar proyecto
gcloud config set project [TU-PROJECT-ID]

# 2. Habilitar APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# 3. Crear repositorio de contenedores
gcloud artifacts repositories create uteq-repositorio \
    --repository-format=docker \
    --location=us-central1
```

- [ ] APIs habilitadas (Cloud Build, Cloud Run, Artifact Registry)
- [ ] Repositorio de Artifact Registry creado
- [ ] gcloud CLI configurado con el proyecto correcto

### 🔐 Configuración de Service Account

```bash
# 4. Crear Service Account
gcloud iam service-accounts create flask-comments-sa \
    --description="Service Account para Flask Comments API"

# 5. Asignar roles (reemplaza [TU-PROJECT-ID])
gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# 6. Crear clave JSON
gcloud iam service-accounts keys create sa-key.json \
    --iam-account=flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com
```

- [ ] Service Account creado
- [ ] Roles asignados correctamente
- [ ] Archivo `sa-key.json` descargado

---

## Fase 3: Configuración de GitHub (10-15 min)

### 🔒 GitHub Secrets

1. **Ir a tu repositorio**: `https://github.com/[tu-usuario]/flask-comments-api`
2. **Configurar secrets**: Settings → Secrets and variables → Actions

- [ ] **GCP_PROJECT_ID**: Tu Project ID de Google Cloud
- [ ] **GCP_SA_KEY**: Contenido completo del archivo `sa-key.json`

### 📤 Push inicial

```powershell
# Si no has hecho push inicial:
git add .
git commit -m "Initial Flask Comments API implementation"
git push origin main
```

- [ ] Código subido a GitHub
- [ ] GitHub Actions ejecutándose automáticamente
- [ ] Pipeline verde (sin errores)

---

## Fase 4: Despliegue y Testing (10-15 min)

### 🚀 Verificar despliegue

- [ ] **GitHub Actions** completado exitosamente
- [ ] **Cloud Run service** desplegado y funcionando
- [ ] **URL del servicio** obtenida desde Cloud Run Console

### 🧪 Testing en producción

```bash
# Obtener URL del servicio
gcloud run services describe flask-comments-api \
    --region=us-central1 \
    --format='value(status.url)'

# Probar con la URL real
.\test_api.bat https://tu-url-de-cloud-run.com
```

- [ ] Health check funciona en producción
- [ ] Todos los endpoints CRUD funcionan
- [ ] API responde correctamente

---

## Fase 5: Cumplimiento de Requisitos (5-10 min)

### 📊 Verificación final

- [ ] **API service**: ✅ Flask REST API implementada
- [ ] **Online services**: ✅ Desplegado en Google Cloud Run
- [ ] **CI/CD pipeline**: ✅ GitHub Actions funcionando
- [ ] **Containers**: ✅ Docker implementado
- [ ] **Security**: ✅ Credenciales seguras con GitHub Secrets
- [ ] **Testing**: ✅ Tests automatizados pasando

### 📝 Documentación

- [ ] **README.md**: Documentación del proyecto completa
- [ ] **API_DOCS.md**: Documentación de la API
- [ ] **SETUP_GUIDE.md**: Guía de configuración detallada
- [ ] **FINAL_REPORT.md**: Reporte final con análisis

### 🔄 Commits requeridos

- [ ] **Rama main**: 10+ commits realizados
- [ ] **Rama production**: 3+ commits realizados (crear si no existe)

```bash
# Crear rama production si no existe
git checkout -b production
git push origin production

# Hacer algunos commits adicionales si es necesario
git checkout main
# ... hacer cambios menores ...
git commit -m "Add additional documentation"
git push origin main
```

---

## 🎯 Entrega Final

### 📋 Archivos a entregar

- [ ] **Repositorio GitHub** público con todo el código
- [ ] **URL de la API** funcionando en Cloud Run
- [ ] **FINAL_REPORT.md** completado con:
  - [ ] Ventajas y desventajas del enfoque
  - [ ] Alternativas consideradas
  - [ ] Análisis de microservicios
- [ ] **Evidencias de funcionamiento** (screenshots, URLs)

### ⏱️ Tiempo total estimado: 90-120 minutos

---

## 🆘 Troubleshooting Común

### Error: "API not enabled"
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
```

### Error: "Permission denied"
- Verificar que el Service Account tenga los roles correctos
- Verificar que GitHub Secrets estén configurados correctamente

### Error: "Image not found"
- Verificar que el repositorio de Artifact Registry exista
- Verificar la configuración del PROJECT_ID

### Error: "Tests failing"
- Verificar que las dependencias estén instaladas: `pip install pytest flask-testing`
- Ejecutar tests individualmente: `python -m pytest tests/test_app.py -v`

---

## 📞 Recursos de Ayuda

- **Google Cloud Console**: https://console.cloud.google.com
- **GitHub Actions**: https://github.com/[tu-usuario]/flask-comments-api/actions
- **Documentation**: Ver archivos SETUP_GUIDE.md y API_DOCS.md
- **Testing**: Usar scripts `test_api.bat` o `test_api.sh`

¡Buena suerte con tu implementación! 🚀
