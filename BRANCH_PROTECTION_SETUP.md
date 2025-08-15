# 🛡️ Configuración de Branch Protection Rules

## ⚙️ **Pasos para Configurar Branch Protection en GitHub:**

### **1. Ir a Settings del Repositorio**
1. Ve a tu repositorio: `https://github.com/Aaron408/flask-comments-api`
2. Haz clic en **"Settings"** (pestaña del repositorio)
3. En el menú lateral, haz clic en **"Branches"**

### **2. Configurar Protección para `main` (Desarrollo Ágil)**

Haz clic en **"Add rule"** y configura:

#### **Branch name pattern:** `main`

#### **✅ Configuraciones Simplificadas:**
- ❌ **NO requerir pull requests** (para desarrollo ágil)
- ✅ **Require status checks to pass before merging**
  - ✅ Status checks required: 
    - `Security Vulnerability Scan`
    - `Unit Tests`
    - `Integration Tests`

- ✅ **Allow force pushes** (para casos de emergencia)
- ❌ **NO incluir administrators** (más flexibilidad)

### **3. Configurar Protección para `production`**

Haz clic en **"Add rule"** nuevamente:

#### **Branch name pattern:** `production`

#### **✅ Configuraciones Recomendadas (MÁS ESTRICTAS):**
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `2` (más estricto)
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require review from code owners

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - ✅ Status checks required:
    - `Security Vulnerability Scan`
    - `Unit Tests` 
    - `Integration Tests`
    - `Performance Tests`
    - `Pre-deployment Security and Quality Checks`

- ✅ **Require conversation resolution before merging**
- ✅ **Restrict pushes that create files**
- ✅ **Include administrators**

### **4. Configurar Default Branch**

1. En la misma página "Branches"
2. En la sección **"Default branch"**
3. Cambiar de `production` a `main`
4. Haz clic en el ícono de lápiz y selecciona `main`
5. Confirma el cambio

## 🎯 **Resultado Esperado:**

Después de esta configuración:

### **Para `main` branch:**
- ✅ Se puede hacer push directo (desarrollo ágil)
- ✅ Tests automáticos en cada push
- ✅ Deploy automático a preview/staging
- ✅ Protección básica con status checks

### **Para `production` branch:**
- ❌ No se puede hacer push directo  
- ✅ Requiere PR con 1-2 aprobaciones
- ✅ Todos los tests + security + performance deben pasar
- ✅ Deploy automático a producción solo después de validación completa

## 📱 **Probar la Configuración:**

### **Probar el flujo simplificado:**
```bash
# 1. Desarrollar directamente en main
git checkout main
git pull origin main

# 2. Hacer cambios
echo "# Test de flujo simplificado" >> README.md
git add README.md
git commit -m "feat: test simplified workflow"

# 3. Push directo a main
git push origin main
```

**Resultado esperado:**
- ✅ Los workflows se ejecutan automáticamente
- ✅ Se despliega a preview/staging automáticamente
- ✅ No necesitas PR para main (desarrollo ágil)

### **Promover a production:**
```bash
# Después de verificar que main funciona bien:
# Ve a GitHub y crea un PR de main → production
```

## 🚨 **Troubleshooting**

### **Si no aparecen los status checks:**
1. Asegúrate de que los workflows se hayan ejecutado al menos una vez
2. Los nombres de los checks deben coincidir con los nombres de los jobs en tus workflows
3. Puede tomar unos minutos en aparecer después del primer run

### **Si necesitas hacer un bypass de emergencia:**
1. Ve a Settings → Branches
2. Desmarca temporalmente "Include administrators"
3. Haz el push de emergencia
4. Vuelve a activar las protecciones

---

**🎉 Una vez configurado esto, tendrás un flujo de desarrollo súper profesional!**
