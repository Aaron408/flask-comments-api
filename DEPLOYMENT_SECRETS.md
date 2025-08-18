# Secrets and Environment Variables Documentation

## Required GitHub Secrets

Para que los pipelines de CI/CD funcionen correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

### Vercel Deployment Secrets

1. **VERCEL_TOKEN**
    - Descripción: Token de API de Vercel para deployment automático
    - Cómo obtenerlo:
        1. Ve a https://vercel.com/account/tokens
        2. Genera un nuevo token
        3. Cópialo y agrégalo como secret en GitHub

2. **VERCEL_ORG_ID**
    - Descripción: ID de la organización de Vercel
    - Cómo obtenerlo:
        1. Ejecuta `vercel link` en tu proyecto local
        2. El ID se encuentra en el archivo `.vercel/project.json`

3. **VERCEL_PROJECT_ID**
    - Descripción: ID del proyecto en Vercel
    - Cómo obtenerlo:
        1. Ejecuta `vercel link` en tu proyecto local
        2. El ID se encuentra en el archivo `.vercel/project.json`

## Configuración de Secrets en GitHub

Para agregar estos secrets:

1. Ve a tu repositorio en GitHub
2. Navega a `Settings` > `Secrets and variables` > `Actions`
3. Haz clic en `New repository secret`
4. Ingresa el nombre y valor del secret
5. Haz clic en `Add secret`

## Variables de Entorno en Producción

El pipeline automáticamente configura estas variables:

- `NODE_ENV=production`
- `CI=true`
- `NODE_VERSION=18`

## Mejores Prácticas de Seguridad

1. **Nunca hardcodees secrets en el código**
2. **Usa secrets específicos para cada entorno**
3. **Rota los tokens regularmente**
4. **Limita los permisos de los tokens al mínimo necesario**
5. **Monitorea el uso de los secrets**