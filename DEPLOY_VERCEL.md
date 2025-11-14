# 🚀 Guía de Despliegue en Vercel

## Preparación del Proyecto ✅

Tu proyecto ya está configurado con:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `vite.config.js` - Optimizado para producción
- ✅ `.gitignore` - Archivos excluidos correctamente
- ✅ `package.json` - Script `vercel-build` añadido

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir código a GitHub

```bash
# Si ya tienes el repositorio configurado
git add .
git commit -m "Configuración para Vercel"
git push origin Update
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Login"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel para acceder a tus repositorios

### Paso 3: Importar Proyecto

1. Click en **"Add New Project"** o **"New Project"**
2. Busca tu repositorio: `ReactNexusS`
3. Click en **"Import"**

### Paso 4: Configurar Build

Vercel detectará automáticamente:
- **Framework Preset:** Vite
- **Build Command:** `vite build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

> 💡 No necesitas cambiar nada, Vercel lo detecta automáticamente

### Paso 5: Variables de Entorno (Opcional)

Si usas variables de entorno en `.env`:

1. En la página de configuración, expande **"Environment Variables"**
2. Agrega cada variable:
   ```
   VITE_FIREBASE_API_KEY = tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN = tu_auth_domain
   VITE_FIREBASE_PROJECT_ID = tu_project_id
   ```
3. Selecciona en qué entornos: **Production**, **Preview**, **Development**

### Paso 6: Desplegar

1. Click en **"Deploy"**
2. Espera 1-2 minutos mientras Vercel:
   - Clona el repositorio
   - Instala dependencias
   - Ejecuta `vite build`
   - Despliega el sitio

### Paso 7: ¡Listo! 🎉

Tu sitio estará disponible en:
```
https://react-nexus-s.vercel.app
```
o
```
https://tu-proyecto-nombre.vercel.app
```

## Opción 2: Despliegue desde CLI

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login

```bash
vercel login
```

Selecciona tu método de autenticación (GitHub, Email, etc.)

### Paso 3: Desplegar

Desde la raíz del proyecto:

```bash
# Despliegue de prueba
vercel

# O directamente a producción
vercel --prod
```

Sigue las preguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta
- **Link to existing project?** → No
- **What's your project's name?** → nexus-platform (o el que prefieras)
- **In which directory is your code located?** → ./
- **Want to override settings?** → No

### Paso 4: Ver el resultado

```bash
✅ Production: https://nexus-platform.vercel.app [copied]
```

## 🔄 Despliegues Automáticos

### Configuración automática:

Una vez conectado con GitHub, Vercel desplegará automáticamente:

- **Main/Master branch** → Producción
- **Otras ramas** → Preview deployments
- **Pull Requests** → Preview automático

### Cada vez que hagas:

```bash
git push origin Update
```

Vercel automáticamente:
1. ✅ Detecta el push
2. ✅ Inicia build
3. ✅ Despliega nueva versión
4. ✅ Te notifica por email

## 🌐 Dominios Personalizados

### Agregar tu propio dominio:

1. Ve a tu proyecto en Vercel
2. Settings → **Domains**
3. Click **"Add"**
4. Ingresa tu dominio: `nexusplatform.com`
5. Sigue las instrucciones para configurar DNS

Vercel provee:
- ✅ HTTPS automático (SSL gratis)
- ✅ CDN global
- ✅ Compresión automática
- ✅ Invalidación de caché

## 📊 Monitoreo

### Dashboard de Vercel:

- **Deployments:** Historial de todos los despliegues
- **Analytics:** Visitas, performance, países
- **Speed Insights:** Core Web Vitals
- **Logs:** Errores y logs en tiempo real

## 🔧 Configuración Avanzada

### vercel.json ya configurado:

```json
{
  "version": 2,
  "builds": [...],
  "routes": [...],
  "rewrites": [...]
}
```

Esto asegura:
- ✅ SPA routing funciona correctamente
- ✅ Todas las rutas apuntan a index.html
- ✅ Assets optimizados

## 🐛 Solución de Problemas

### Build falla:

1. **Error: Cannot find module**
   ```bash
   # Localmente
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Firebase no conecta:**
   - Verifica variables de entorno en Vercel
   - Deben empezar con `VITE_`
   - Valores entre comillas si tienen espacios

3. **404 en rutas:**
   - Ya configurado en `vercel.json`
   - Verifica que exista el archivo

### Preview no actualiza:

```bash
# Forzar re-deploy
vercel --force
```

## 📱 Testing en Producción

Antes de compartir:

1. ✅ Prueba todas las rutas
2. ✅ Verifica login/registro
3. ✅ Prueba Firebase (si funciona local, debe funcionar en Vercel)
4. ✅ Revisa en móvil
5. ✅ Verifica Analytics en Vercel

## 🎯 Checklist Final

- [ ] Código pusheado a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas (si aplica)
- [ ] Primer despliegue exitoso
- [ ] Dominio funcionando
- [ ] Firebase conectado
- [ ] Todas las rutas funcionan
- [ ] Responsive verificado
- [ ] Analytics activado

## 🆘 Soporte

- **Documentación Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Status Page:** [vercel-status.com](https://www.vercel-status.com/)
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**¡Tu proyecto Nexus Platform está listo para el mundo! 🚀**
