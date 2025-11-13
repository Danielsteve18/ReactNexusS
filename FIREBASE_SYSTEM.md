# Sistema Firebase - Nexus Platform

## 📁 Estructura de Firebase

### Colecciones en Firestore:

1. **users** - Usuarios del sistema
   - id (documento)
   - name: string
   - email: string
   - role: "profesor" | "student"
   - createdAt: timestamp

2. **convocatorias** - Anuncios y convocatorias
   - id (documento)
   - titulo: string
   - descripcion: string
   - tipo: "general" | "evento" | "tarea"
   - prioridad: "normal" | "media" | "alta"
   - fechaLimite: string (opcional)
   - profesorId: string
   - profesorNombre: string
   - views: number
   - active: boolean
   - createdAt: timestamp
   - updatedAt: timestamp

3. **cursos** - Cursos educativos
   - id (documento)
   - titulo: string
   - descripcion: string
   - objetivos: string (opcional)
   - categoria: "programacion" | "diseño" | "negocios" | "idiomas" | "ciencias"
   - duracion: string (opcional)
   - imagen: string (URL, opcional)
   - profesorId: string
   - profesorNombre: string
   - estudiantes: array[string] (IDs de estudiantes)
   - active: boolean
   - createdAt: timestamp
   - updatedAt: timestamp

4. **foros** - Foros de discusión
   - id (documento)
   - titulo: string
   - descripcion: string
   - categoria: string
   - creadorId: string
   - creadorNombre: string
   - mensajes: array[objeto]
     - id: string
     - userId: string
     - userName: string
     - texto: string
     - timestamp: timestamp
   - participantes: array[string]
   - active: boolean
   - createdAt: timestamp
   - updatedAt: timestamp

---

## 🔧 Servicios Firebase Implementados

### 📝 Convocatorias (`/src/firebase/services/convocatorias.js`)

**Funciones:**
- `createConvocatoria(data)` - Crear nueva convocatoria
- `getConvocatorias()` - Obtener todas las convocatorias
- `getConvocatoriasByProfesor(profesorId)` - Convocatorias de un profesor
- `updateConvocatoria(id, data)` - Actualizar convocatoria
- `deleteConvocatoria(id)` - Eliminar convocatoria
- `incrementViews(id)` - Incrementar contador de vistas

**Características:**
- Los profesores pueden crear, editar y eliminar convocatorias
- Los estudiantes pueden ver todas las convocatorias y se incrementa el contador de vistas
- Sistema de prioridades (alta, media, normal) con colores
- Tipos de convocatorias (general, evento, tarea) con iconos
- Fecha límite opcional

---

### 📚 Cursos (`/src/firebase/services/cursos.js`)

**Funciones:**
- `createCurso(data)` - Crear nuevo curso
- `getCursos()` - Obtener todos los cursos
- `getCursosByProfesor(profesorId)` - Cursos de un profesor
- `getCursosByEstudiante(estudianteId)` - Cursos en los que está inscrito
- `inscribirEstudiante(cursoId, estudianteId)` - Inscribir estudiante
- `desinscribirEstudiante(cursoId, estudianteId)` - Desinscribir estudiante
- `updateCurso(id, data)` - Actualizar curso
- `deleteCurso(id)` - Eliminar curso

**Características:**
- Los profesores pueden crear y gestionar sus cursos
- Los estudiantes pueden explorar cursos e inscribirse
- Sistema de categorías con colores distintos
- Tracking de estudiantes inscritos
- Imágenes opcionales para cursos

---

### 💬 Foros (`/src/firebase/services/foros.js`)

**Funciones:**
- `createForo(data)` - Crear nuevo foro
- `getForos()` - Obtener todos los foros
- `getForosByUsuario(userId)` - Foros del usuario
- `addMensaje(foroId, mensaje)` - Agregar mensaje al foro
- `deleteMensaje(foroId, mensajeId)` - Eliminar mensaje
- `updateForo(id, data)` - Actualizar foro
- `deleteForo(id)` - Eliminar foro

**Características:**
- Tanto profesores como estudiantes pueden crear foros
- Sistema de mensajes en tiempo real
- Tracking de participantes
- Historial de mensajes almacenado

---

## 🎯 Componentes Implementados

### 1. **Convocatorias** (`/src/Private/review/shared/Convocatorias.jsx`)

**Profesores:**
- ✅ Crear convocatorias con formulario modal
- ✅ Ver todas sus convocatorias
- ✅ Ver estadísticas (vistas, fecha de creación)
- ✅ Eliminar convocatorias
- ✅ Filtros por tipo y prioridad

**Estudiantes:**
- ✅ Ver todas las convocatorias activas
- ✅ Filtrar por búsqueda
- ✅ Ver detalles completos en modal
- ✅ Sistema de vistas automático

---

### 2. **Nuevo Curso (Estudiantes)** (`/src/Private/review/shared/NewCourse.jsx`)

**Funcionalidades:**
- ✅ Explorar todos los cursos disponibles
- ✅ Búsqueda por nombre, categoría o descripción
- ✅ Inscribirse en cursos
- ✅ Ver cursos en los que ya está inscrito
- ✅ Ver detalles completos (objetivos, profesor, duración)
- ✅ Ver número de estudiantes inscritos

---

### 3. **Gestión de Cursos (Profesores)** (`/src/Private/review/teacher/GestionCursos.jsx`)

**Funcionalidades:**
- ✅ Crear nuevos cursos con formulario completo
- ✅ Ver todos sus cursos
- ✅ Ver número de estudiantes inscritos
- ✅ Eliminar cursos
- ✅ Categorización con colores
- ✅ Opción de agregar imagen

---

## 🔄 Flujo de Datos

### Convocatorias:
```
Profesor crea convocatoria → Firebase Firestore (convocatorias)
                          ↓
            Estudiantes ven convocatoria
                          ↓
            Se incrementa contador de vistas
```

### Cursos:
```
Profesor crea curso → Firebase Firestore (cursos)
                   ↓
    Estudiante explora cursos disponibles
                   ↓
    Estudiante se inscribe → Array de estudiantes actualizado
                   ↓
    Profesor ve lista de inscritos
```

### Foros:
```
Usuario crea foro → Firebase Firestore (foros)
                 ↓
   Usuarios envían mensajes → Array de mensajes actualizado
                 ↓
   Tiempo real para todos los participantes
```

---

## 🚀 Rutas Configuradas

### Rutas de Profesores:
- `/view-teachers` - Dashboard principal
- `/view-convocatorias` - Gestión de convocatorias
- `/view-cursos` - Gestión de cursos
- `/view-foro` - Foros
- `/view-config` - Configuración
- `/view-activity` - Actividad
- `/view-aVirtual` - Aula virtual

### Rutas de Estudiantes:
- `/view-students` - Dashboard principal
- `/view-new-course` - Explorar cursos
- `/view-convocatorias` - Ver convocatorias
- `/view-foro` - Foros
- `/view-config` - Configuración
- `/view-activity` - Actividad

---

## 📱 Características del Sistema

### Diseño:
- ✅ Modales modernos y responsive
- ✅ Tarjetas con hover effects
- ✅ Sistema de colores por categoría/prioridad
- ✅ Iconos SVG personalizados
- ✅ Loading states y estados vacíos
- ✅ Animaciones suaves

### Funcionalidad:
- ✅ CRUD completo para convocatorias
- ✅ CRUD completo para cursos
- ✅ Sistema de inscripción de estudiantes
- ✅ Búsqueda y filtrado en tiempo real
- ✅ Contador de vistas/estudiantes
- ✅ Persistencia de datos en Firebase
- ✅ Validación de formularios
- ✅ Confirmaciones para acciones destructivas

### Seguridad:
- ✅ Rutas protegidas por rol
- ✅ Validación de usuario en cada acción
- ✅ IDs de usuario vinculados a cada acción

---

## 🔥 Firebase Config

Archivo centralizado: `/src/firebase/config.js`

```javascript
- Firestore Database
- Firebase Authentication
- Firebase Storage (preparado para futuro)
```

---

## 📊 Próximas Mejoras Sugeridas

1. **Notificaciones en tiempo real** usando Firebase Cloud Messaging
2. **Chat en tiempo real** en los foros usando listeners
3. **Upload de imágenes** para cursos usando Firebase Storage
4. **Sistema de calificaciones** para cursos
5. **Reportes y analytics** del profesor
6. **Calendario integrado** con convocatorias
7. **Sistema de tareas** con entregas
8. **Badges y logros** para estudiantes

---

## ✅ Estado Actual

**Completado:**
- ✅ Configuración de Firebase
- ✅ Servicios de Convocatorias (CRUD completo)
- ✅ Servicios de Cursos (CRUD completo)
- ✅ Servicios de Foros (CRUD completo)
- ✅ Componente Convocatorias (Profesor y Estudiante)
- ✅ Componente Nuevo Curso (Estudiante)
- ✅ Componente Gestión de Cursos (Profesor)
- ✅ Estilos CSS modulares y responsive
- ✅ Rutas configuradas
- ✅ Sistema de permisos por rol

**Todo funciona con datos reales de Firebase Firestore! 🎉**
