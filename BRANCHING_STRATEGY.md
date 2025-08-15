# 🌿 Branching Strategy y Workflow de Desarrollo

## 📋 **Estructura de Ramas Simplificada**

### **🔄 Flujo de Ramas:**

```
main ──────────────→ production
  ↓                      ↓
[Development]        [Producción]
[Testing]            [Stable Release]
[Preview]
```

### **🎯 Propósito de Cada Rama:**

| Rama         | Propósito                    | Deployment      | Auto-Deploy   |
| ------------ | ---------------------------- | --------------- | ------------- |
| `main`       | Desarrollo activo y testing  | Preview/Staging | ✅ Automático |
| `production` | Código estable en producción | Production      | ✅ Automático |

## 🚀 **Workflows por Rama**

### **🔹 Push a `main`:**

1. ✅ Security scan
2. ✅ Full testing suite
3. ✅ Deploy to staging/preview
4. ✅ Integration tests
5. ✅ Performance validation

### **🔹 Push a `production`:**

1. ✅ Security scan
2. ✅ Full testing suite
3. ✅ Deploy to production
4. ✅ Smoke tests en producción
5. ✅ Performance monitoring
6. ✅ Post-deployment validation

### **🔹 Pull Request a `production`:**

1. ✅ Security scan
2. ✅ Full testing suite
3. ✅ Preview deployment
4. ✅ Code quality checks

## 📝 **Flujo de Desarrollo Simplificado**

### **1. Para Desarrollo Diario (Recomendado):**

```bash
# 1. Asegurar que main está actualizado
git checkout main
git pull origin main

# 2. Desarrollar directamente en main
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push a main para testing automático
git push origin main

# 4. Verificar que tests pasen en GitHub Actions
# 5. Si todo está bien, promover a production
```

### **2. Para Release a Producción:**

```bash
# 1. Verificar que main está estable
git checkout main
git pull origin main

# 2. Crear Pull Request de main → production en GitHub
# 3. El PR ejecuta todos los tests y validaciones
# 4. Después del merge, se despliega automáticamente a producción
```

### **3. Para Hotfixes Urgentes:**

```bash
# 1. Trabajar directamente en main
git checkout main
git pull origin main

# 2. Hacer el fix
git add .
git commit -m "fix: solución urgente"

# 3. Push a main para testing
git push origin main

# 4. Si es urgente, promover inmediatamente a production
```

## 🎛️ **Comandos Útiles**

### **Sincronizar ramas:**

```bash
# Actualizar main desde remoto
git checkout main
git pull origin main

# Actualizar production desde remoto
git checkout production
git pull origin production

# Ver estado de ambas ramas
git log --oneline --graph main production
```

### **Ver diferencias entre ramas:**

```bash
# Ver commits en main que no están en production
git log production..main --oneline

# Ver archivos modificados entre ramas
git diff production...main --name-only
```

## 🔄 **Environments y Deployments**

### **Development Environment (main branch):**

- **URL**: Preview URLs de Vercel (cambian con cada push)
- **Propósito**: Testing, desarrollo e integración
- **Acceso**: Solo para desarrollo y testing

### **Production Environment (production branch):**

- **URL**: https://flask-comments-api.vercel.app
- **Propósito**: Usuarios finales
- **Acceso**: Público

## 🛡️ **Branch Protection Rules (Simplificadas)**

### **Para `main`:**

- ✅ Permitir push directo (para desarrollo ágil)
- ✅ Require status checks to pass
- ✅ Auto-deploy to preview

### **Para `production`:**

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require up-to-date branches
- ✅ Include administrators

## 📊 **Monitoring y Alertas**

### **Main Branch:**

- Tests automáticos en cada push
- Preview deployments para validation
- Performance baselines
- Development notifications

### **Production Branch:**

- Smoke tests post-deployment
- Performance monitoring
- Error tracking y alertas
- Production health checks

## 🎯 **Best Practices Simplificadas**

1. **Push frecuente a main** - Para testing continuo
2. **Commits semánticos** - `feat:`, `fix:`, `docs:`, etc.
3. **Test antes de promover** - Main debe estar siempre estable antes de ir a production
4. **PRs solo para production** - De main → production
5. **Monitor production** - Verificar que todo funcione después del deploy

## 🚨 **Emergency Procedures**

### **Rollback en Production:**

```bash
# 1. Identificar último commit bueno en production
git checkout production
git log --oneline

# 2. Resetear main a ese punto
git checkout main
git reset --hard <commit-hash-bueno>
git push origin main --force

# 3. Promover inmediatamente a production
```

### **Hotfix Crítico:**

```bash
# 1. Fix directo en main
git checkout main
git add .
git commit -m "fix: hotfix crítico"
git push origin main

# 2. Verificar tests en GitHub Actions
# 3. Promover a production inmediatamente si es crítico
```

## 🔄 **Flujo de Trabajo Típico**

### **Día a día:**

1. **Desarrollar en main** → Automáticamente se testea y despliega a preview
2. **Verificar en preview** → Que todo funcione correctamente
3. **Promover a production** → Crear PR de main → production cuando esté listo

### **Para releases:**

1. **Acumular features en main** → Varias funcionalidades probadas
2. **Testing completo** → Verificar que todo funcione en preview
3. **Release a production** → PR de main → production con todas las features

---

**🎉 ¡Flujo simplificado y eficiente para desarrollo individual o equipos pequeños!**
