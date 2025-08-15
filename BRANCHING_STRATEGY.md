# 🌿 Branching Strategy y Workflow de Desarrollo

## 📋 **Estructura de Ramas**

### **🔄 Flujo de Ramas:**

```
feature/nueva-funcionalidad ──→ main ──→ production
                                 ↓           ↓
                            [Staging]   [Producción]
```

### **🎯 Propósito de Cada Rama:**

| Rama | Propósito | Deployment | Auto-Deploy |
|------|-----------|------------|-------------|
| `main` | Desarrollo y staging | Preview/Staging | ✅ Automático |
| `production` | Código estable en producción | Production | ✅ Automático |
| `feature/*` | Desarrollo de nuevas funciones | Preview only | ✅ En PR |

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

### **🔹 Pull Request a `main` o `production`:**
1. ✅ Security scan
2. ✅ Full testing suite
3. ✅ Preview deployment
4. ✅ Code quality checks

## 📝 **Flujo de Desarrollo Recomendado**

### **1. Para Nuevas Funcionalidades:**
```bash
# 1. Partir desde main
git checkout main
git pull origin main

# 2. Crear feature branch
git checkout -b feature/nombre-funcionalidad

# 3. Desarrollar y hacer commits
git add .
git commit -m "Add: nueva funcionalidad"

# 4. Push de la feature branch
git push origin feature/nombre-funcionalidad

# 5. Crear Pull Request a main en GitHub
# 6. Después de review y merge, crear PR de main a production
```

### **2. Para Hotfixes Urgentes:**
```bash
# 1. Partir desde production
git checkout production
git pull origin production

# 2. Crear hotfix branch
git checkout -b hotfix/fix-critico

# 3. Hacer el fix
git add .
git commit -m "Fix: descripción del problema"

# 4. Push y PR directo a production
git push origin hotfix/fix-critico

# 5. Después del merge, mergear production a main
git checkout main
git merge production
git push origin main
```

### **3. Para Release (Main → Production):**
```bash
# 1. Asegurar que main está actualizado y probado
git checkout main
git pull origin main

# 2. Crear PR de main a production
# 3. Después del merge, production se despliega automáticamente
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

# Mergear cambios de production a main (después de hotfix)
git checkout main
git merge production
git push origin main
```

### **Ver diferencias entre ramas:**
```bash
# Ver commits en main que no están en production
git log production..main --oneline

# Ver commits en production que no están en main
git log main..production --oneline
```

## 🔄 **Environments y Deployments**

### **Staging Environment (main branch):**
- **URL**: Preview URLs de Vercel
- **Propósito**: Testing e integración
- **Acceso**: Team y QA

### **Production Environment (production branch):**
- **URL**: https://flask-comments-api.vercel.app
- **Propósito**: Usuarios finales
- **Acceso**: Público

## 🛡️ **Branch Protection Rules (Recomendado)**

Para configurar en GitHub → Settings → Branches:

### **Para `main`:**
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require up-to-date branches
- ✅ Include administrators

### **Para `production`:**  
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks to pass
- ✅ Require up-to-date branches
- ✅ Include administrators
- ✅ Restrict pushes to specific people/teams

## 📊 **Monitoring y Alertas**

### **Main Branch:**
- Tests deben pasar antes de merge
- Preview deployments para validation
- Performance baselines

### **Production Branch:**
- Smoke tests post-deployment
- Performance monitoring
- Error tracking y alertas
- Rollback automático si falla

## 🎯 **Best Practices**

1. **Never push directly to production** - Siempre usar PRs
2. **Keep main stable** - Solo mergear features completamente probadas
3. **Use semantic commit messages** - `feat:`, `fix:`, `docs:`, etc.
4. **Tag releases** - Para tracking de versiones
5. **Review before merge** - Especialmente para production

## 🚨 **Emergency Procedures**

### **Rollback en Production:**
```bash
# 1. Identificar último commit bueno
git log --oneline

# 2. Crear hotfix branch desde ese commit
git checkout -b hotfix/rollback <commit-hash>

# 3. Crear PR urgente a production
```

### **Hotfix Crítico:**
```bash
# 1. Fix directo en production branch
git checkout production
git checkout -b hotfix/critical-fix

# 2. Fix, commit, PR y merge inmediato
# 3. Mergear de vuelta a main
```

---

**🎉 ¡Con esta estructura tienes un workflow profesional y escalable!**
