# 🛡️ Configuración de Branch Protection Rules

## ⚙️ **Pasos para Configurar Branch Protection en GitHub:**

### **1. Ir a Settings del Repositorio**
1. Ve a tu repositorio: `https://github.com/Aaron408/flask-comments-api`
2. Haz clic en **"Settings"** (pestaña del repositorio)
3. En el menú lateral, haz clic en **"Branches"**

### **2. Configurar Protección para `main`**

Haz clic en **"Add rule"** y configura:

#### **Branch name pattern:** `main`

#### **✅ Configuraciones Recomendadas:**
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: `1`
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require review from code owners

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - ✅ Status checks required: 
    - `Security Vulnerability Scan`
    - `Unit Tests`
    - `Integration Tests`
    - `Pre-deployment Security and Quality Checks`

- ✅ **Require conversation resolution before merging**
- ✅ **Include administrators**

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
- ❌ No se puede hacer push directo
- ✅ Requiere PR con 1 aprobación
- ✅ Todos los tests deben pasar
- ✅ Deploy automático a staging/preview

### **Para `production` branch:**
- ❌ No se puede hacer push directo  
- ✅ Requiere PR con 2 aprobaciones
- ✅ Todos los tests + security + performance deben pasar
- ✅ Deploy automático a producción solo después de validación completa

## 📱 **Probar la Configuración:**

### **Crear tu primer PR a main:**
```bash
# 1. Crear feature branch desde main
git checkout main
git checkout -b feature/test-branch-protection

# 2. Hacer un cambio pequeño
echo "# Test de branch protection" >> TEST.md
git add TEST.md
git commit -m "feat: add test file for branch protection"

# 3. Push y crear PR
git push origin feature/test-branch-protection
```

Luego ve a GitHub y crea un Pull Request a `main`. Deberías ver que:
- ✅ Los workflows se ejecutan automáticamente
- ✅ No puedes mergear hasta que pasen todos los checks
- ✅ Necesitas aprobación para mergear

### **Crear PR de main a production:**
```bash
# Después de mergear el PR anterior a main:
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
