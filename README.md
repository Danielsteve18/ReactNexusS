# 🎓 Nexus Platform

Plataforma educativa completa desarrollada con React + Firebase que conecta profesores y estudiantes.

## 🚀 Características

- ✅ Sistema de convocatorias y postulaciones
- ✅ Gestión completa de cursos con módulos y lecciones
- ✅ Entregas de tareas vía Google Drive
- ✅ Calificaciones con feedback del profesor
- ✅ Aula Virtual (Meet, Zoom, Teams)
- ✅ Tracking de progreso por estudiante
- ✅ Dashboard de actividades pendientes
- ✅ Notificaciones de perfil
- ✅ Sistema de roles (Profesor/Estudiante)

## 🛠️ Tecnologías

- **Frontend:** React 18.2 + Vite 5
- **Router:** React Router DOM 6
- **Backend:** Firebase Firestore
- **Autenticación:** Firebase Auth
- **Estilos:** CSS Modules
- **Animaciones:** AOS
- **Alertas:** SweetAlert2

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Danielsteve18/ReactNexusS.git
cd ReactNexusS

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🔥 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa Firestore Database
3. Activa Authentication (Email/Password)
4. Copia tus credenciales de Firebase
5. Actualiza `/src/firebase/config.js` con tus credenciales

## 🌐 Despliegue en Vercel

### Opción 1: Automático desde GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa este repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. Haz clic en "Deploy"

### Opción 2: Desde la línea de comandos

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

### Variables de Entorno en Vercel

Si usas variables de entorno, agrégalas en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega tus variables (ej: VITE_FIREBASE_API_KEY)

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Revisar código con ESLint
npm run format       # Formatear con Prettier
npm test            # Ejecutar tests
```

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── Private/           # Páginas privadas (requieren auth)
│   ├── review/
│   │   ├── teacher/   # Vistas de profesor
│   │   ├── student/   # Vistas de estudiante
│   │   └── shared/    # Componentes compartidos
├── view/              # Páginas públicas
├── firebase/          # Configuración y servicios de Firebase
│   └── services/      # Servicios por módulo
├── utils/             # Utilidades y helpers
└── assets/           # Recursos estáticos
```

## 🔒 Rutas

### Públicas
- `/` - Home
- `/login-form` - Login
- `/register-form` - Registro
- `/view-rol` - Selección de rol

### Privadas (Profesor)
- `/view-teachers` - Dashboard
- `/view-cursos` - Mis cursos
- `/view-convocatorias` - Convocatorias
- `/aula-virtual` - Aula virtual
- `/detalle-curso/:id` - Detalle del curso

### Privadas (Estudiante)
- `/view-students` - Dashboard
- `/view-new-course` - Explorar cursos
- `/view-activity` - Actividades pendientes
- `/detalle-curso/:id` - Detalle del curso

## 📖 Documentación

- [FIREBASE_SYSTEM.md](./FIREBASE_SYSTEM.md) - Arquitectura completa de Firebase
- [TODO.md](./TODO.md) - Funcionalidades pendientes
- [RESUMEN.md](./RESUMEN.md) - Resumen ejecutivo del proyecto

## 👥 Roles de Usuario

### Profesor
- Crear convocatorias
- Gestionar postulantes
- Crear y organizar cursos
- Calificar tareas
- Configurar aula virtual
- Ver progreso de estudiantes

### Estudiante
- Explorar cursos
- Postularse a convocatorias
- Inscribirse en cursos
- Entregar tareas
- Ver calificaciones
- Unirse a clases virtuales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está en desarrollo.

## 👨‍💻 Autor

**DevDaniel**
- GitHub: [@Danielsteve18](https://github.com/Danielsteve18)

## 🆘 Soporte

Para problemas o preguntas, abre un issue en GitHub.

---

**Estado:** 🟢 Production Ready

**Última actualización:** 13 de noviembre de 2025

