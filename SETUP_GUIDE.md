# 📋 Guía Completa: Configuración de Google Cloud para Flask Comments API

## 1. 🔧 Configuración de Google Cloud Platform

### Paso 1: Crear proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en "Seleccionar proyecto" → "Nuevo proyecto"
3. Nombra tu proyecto: `flask-comments-api-[tu-nombre]`
4. Anota el **Project ID** (lo necesitarás después)

### Paso 2: Habilitar APIs necesarias

Ejecuta estos comandos en Cloud Shell o con gcloud CLI:

```bash
# Habilitar las APIs necesarias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Paso 3: Crear Artifact Registry

```bash
# Crear repositorio de contenedores
gcloud artifacts repositories create uteq-repositorio \
    --repository-format=docker \
    --location=us-central1 \
    --description="Repositorio para Flask Comments API"
```

### Paso 4: Crear cuenta de servicio

```bash
# Crear cuenta de servicio
gcloud iam service-accounts create flask-comments-sa \
    --description="Service Account para Flask Comments API" \
    --display-name="Flask Comments Service Account"

# Asignar roles necesarios
gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding [TU-PROJECT-ID] \
    --member="serviceAccount:flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Crear y descargar clave JSON
gcloud iam service-accounts keys create sa-key.json \
    --iam-account=flask-comments-sa@[TU-PROJECT-ID].iam.gserviceaccount.com
```

## 2. 🔐 Configuración de GitHub Secrets

### Paso 1: Ir a tu repositorio en GitHub
1. Ve a tu repositorio: `https://github.com/[tu-usuario]/flask-comments-api`
2. Click en "Settings" → "Secrets and variables" → "Actions"

### Paso 2: Agregar secrets
Click en "New repository secret" y agrega:

1. **GCP_PROJECT_ID**
   - Name: `GCP_PROJECT_ID`
   - Secret: `[TU-PROJECT-ID]` (el ID del proyecto de Google Cloud)

2. **GCP_SA_KEY**
   - Name: `GCP_SA_KEY`
   - Secret: Todo el contenido del archivo `sa-key.json` (incluye las llaves {})

## 3. 🚀 Comandos para desarrollo local

### Probar localmente (Windows PowerShell)

```powershell
# Crear entorno virtual
python -m venv venv
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar aplicación
python app.py

# En otra terminal, probar la API
.\test_api.bat
```

### Probar con Docker localmente

```powershell
# Construir imagen
docker build -t flask-comments-api .

# Ejecutar contenedor
docker run -p 8080:8080 flask-comments-api

# Probar API
.\test_api.bat
```

## 4. 📦 Despliegue manual en Google Cloud

Si quieres probar el despliegue manual antes del CI/CD:

```bash
# Autenticarse
gcloud auth login

# Configurar proyecto
gcloud config set project [TU-PROJECT-ID]

# Construir y subir imagen
gcloud builds submit --tag us-central1-docker.pkg.dev/[TU-PROJECT-ID]/uteq-repositorio/flask-comments-api .

# Desplegar en Cloud Run
gcloud run deploy flask-comments-api \
    --image us-central1-docker.pkg.dev/[TU-PROJECT-ID]/uteq-repositorio/flask-comments-api \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080
```

## 5. 🔄 Proceso de CI/CD

### ¿Cómo funciona?

1. **Push a main**: Cuando haces push a la rama `main`, se activa el pipeline
2. **Testing**: Se ejecutan los tests automáticamente
3. **Build**: Se construye la imagen Docker
4. **Deploy**: Se despliega en Google Cloud Run
5. **Verification**: Se verifica que el servicio esté funcionando

### Monitorear el despliegue

1. Ve a [GitHub Actions](https://github.com/[tu-usuario]/flask-comments-api/actions)
2. Ve a [Google Cloud Run](https://console.cloud.google.com/run)
3. Ve a [Google Cloud Build](https://console.cloud.google.com/cloud-build)

## 6. 🧪 Testing de la API desplegada

Una vez desplegada, obtén la URL del servicio:

```bash
gcloud run services describe flask-comments-api \
    --region=us-central1 \
    --format='value(status.url)'
```

Luego prueba con:

```powershell
# Windows
.\test_api.bat https://tu-url-de-cloud-run.com

# Linux/Mac
./test_api.sh https://tu-url-de-cloud-run.com
```

## 7. ⚡ Comandos rápidos de troubleshooting

```bash
# Ver logs de Cloud Run
gcloud logs read --service=flask-comments-api --region=us-central1

# Ver estado del servicio
gcloud run services describe flask-comments-api --region=us-central1

# Ver imágenes en Artifact Registry
gcloud artifacts docker images list us-central1-docker.pkg.dev/[TU-PROJECT-ID]/uteq-repositorio

# Redeploy manual si es necesario
gcloud run services replace service.yaml --region=us-central1
```

## 8. 💰 Estimación de costos

- **Cloud Run**: ~$0.40/millón de requests
- **Artifact Registry**: ~$0.10/GB por mes
- **Cloud Build**: 120 minutos gratis por día

Total estimado para desarrollo/testing: **< $5/mes**

---

¡Con esta configuración tendrás un pipeline completo de CI/CD funcionando! 🎉
