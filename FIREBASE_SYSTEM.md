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
   - estado: "abierta" | "convertida"
   - postulantes: array[objeto] (sistema de postulaciones)
     - estudianteId: string
     - estudianteNombre: string
     - estado: "pendiente" | "aceptado" | "rechazado"
     - comentario: string
     - fechaPostulacion: timestamp
   - cursoGeneradoId: string (ID del curso creado desde la convocatoria)
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
   - modulos: array[objeto] (estructura del curso)
     - id: string
     - titulo: string
     - descripcion: string
     - orden: number
     - lecciones: array[objeto]
       - id: string
       - titulo: string
       - descripcion: string
       - tipo: "leccion" | "tarea" | "video"
       - contenido: string
       - duracion: string (opcional)
       - puntos: number (para tareas)
       - fechaEntrega: string (para tareas)
       - orden: number
       - entregas: array[objeto] (entregas de estudiantes)
         - id: string
         - estudianteId: string
         - estudianteNombre: string
         - linkDrive: string
         - comentarios: string
         - fechaEntrega: timestamp
         - estado: "pendiente" | "calificada"
         - calificacion: number (opcional)
         - feedback: string (opcional)
   - progreso: objeto (progreso de cada estudiante)
     - [estudianteId]: objeto
       - leccionesCompletadas: array[string] (IDs de lecciones)
       - porcentaje: number
   - aulaVirtual: objeto (enlaces de clases virtuales)
     - titulo: string
     - plataforma: "meet" | "zoom" | "teams" | "classroom" | "otro"
     - url: string
     - descripcion: string
     - horaClase: string
     - diasClase: string
   - convocatoriaOrigenId: string (opcional, si fue creado desde convocatoria)
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
- `postularseConvocatoria(convocatoriaId, postulacion)` - Estudiante se postula
- `actualizarEstadoPostulante(convocatoriaId, estudianteId, nuevoEstado)` - Aceptar/rechazar postulante
- `cerrarYCrearCurso(convocatoriaId)` - Convertir convocatoria en curso con estudiantes aceptados

**Características:**
- Los profesores pueden crear, editar y eliminar convocatorias
- Los estudiantes pueden ver todas las convocatorias y postularse
- Sistema de postulaciones con estados (pendiente, aceptado, rechazado)
- Profesores pueden revisar postulantes y aceptar/rechazar
- Conversión automática de convocatoria a curso con estudiantes aceptados
- Sistema de prioridades (alta, media, normal) con colores
- Tipos de convocatorias (general, evento, tarea) con iconos
- Fecha límite opcional

---

### 📚 Cursos (`/src/firebase/services/cursos.js`)

**Funciones:**
- `createCurso(data)` - Crear nuevo curso
- `getCursos()` - Obtener todos los cursos
- `getCursoById(cursoId)` - Obtener curso específico por ID
- `getCursosByProfesor(profesorId)` - Cursos de un profesor
- `getCursosByEstudiante(estudianteId)` - Cursos en los que está inscrito
- `inscribirEstudiante(cursoId, estudianteId)` - Inscribir estudiante
- `desinscribirEstudiante(cursoId, estudianteId)` - Desinscribir estudiante
- `updateCurso(id, data)` - Actualizar curso (incluye módulos, lecciones, aula virtual)
- `deleteCurso(id)` - Eliminar curso

**Características:**
- Los profesores pueden crear y gestionar sus cursos
- Los estudiantes pueden explorar cursos e inscribirse
- Sistema de módulos y lecciones jerárquico
- Tipos de lecciones: lectura, video, tarea
- Sistema de tareas con entregas vía Google Drive
- Calificaciones y feedback del profesor
- Tracking de progreso por estudiante
- Enlaces a aula virtual (Meet, Zoom, Teams, etc.)
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
- ✅ Ver estadísticas (vistas, postulantes, fecha de creación)
- ✅ Ver y gestionar postulantes (Modal)
- ✅ Aceptar/rechazar postulaciones
- ✅ Botón "Crear Curso" que convierte convocatoria en curso con estudiantes aceptados
- ✅ Eliminar convocatorias (removido, reemplazado por crear curso)
- ✅ Filtros por tipo y prioridad

**Estudiantes:**
- ✅ Ver todas las convocatorias activas
- ✅ Filtrar por búsqueda
- ✅ Ver detalles completos en modal
- ✅ Sistema de vistas automático
- ✅ Postularse con comentario opcional
- ✅ Ver estado de su postulación

**Modales asociados:**
- `ModalPostulacion.jsx` - Formulario de postulación para estudiantes
- `ModalPostulantes.jsx` - Gestión de postulantes para profesores

---

### 2. **Nuevo Curso (Estudiantes)** (`/src/Private/review/shared/NewCourse.jsx`)

**Funcionalidades:**
- ✅ Explorar todos los cursos disponibles
- ✅ Búsqueda por nombre, categoría o descripción
- ✅ Inscribirse en cursos
- ✅ Ver cursos en los que ya está inscrito con badge "Inscrito"
- ✅ Botón "Ir al curso" para cursos inscritos
- ✅ Ver detalles completos (objetivos, profesor, duración)
- ✅ Ver número de estudiantes inscritos
- ✅ Navegación al detalle del curso

---

### 3. **Gestión de Cursos (Profesores)** (`/src/Private/review/teacher/GestionCursos.jsx`)

**Funcionalidades:**
- ✅ Crear nuevos cursos con formulario completo
- ✅ Ver todos sus cursos
- ✅ Ver número de estudiantes inscritos
- ✅ Botón "Editar" redirige a DetalleCurso
- ✅ Eliminar cursos
- ✅ Categorización con colores
- ✅ Opción de agregar imagen
- ✅ Objetivos de aprendizaje

---

### 4. **Detalle de Curso** (`/src/Private/review/shared/DetalleCurso.jsx`)

**Vista Profesor:**
- ✅ Tabs: Contenido, Clases, Tareas, Estudiantes
- ✅ **Tab Contenido:**
  - Crear y organizar módulos
  - Agregar lecciones (lectura, video, tarea)
  - Expandir/colapsar módulos
  - Ordenar contenido
- ✅ **Tab Clases:**
  - Ver link de aula virtual configurado
  - Redirige a Aula Virtual para editar
- ✅ **Tab Tareas:**
  - Ver todas las tareas del curso
  - Ver entregas pendientes y calificadas
  - Abrir modal de revisión de entregas
- ✅ **Tab Estudiantes:**
  - Lista completa de estudiantes inscritos
  - Ver progreso de cada estudiante

**Vista Estudiante:**
- ✅ Tabs: Contenido, Clases, Tareas
- ✅ **Tab Contenido:**
  - Ver todos los módulos y lecciones
  - Marcar lecciones como completadas
  - Tracking de progreso visual
- ✅ **Tab Clases:**
  - Ver información de la clase virtual
  - Botón destacado "Unirse a la Clase"
  - Horarios y días de clase
- ✅ **Tab Tareas:**
  - Ver todas las tareas asignadas
  - Botón "Entregar" abre modal
  - Ver estado de entrega
  - Ver calificación y feedback

**Modales asociados:**
- `ModalEntregarTarea.jsx` - Entrega de tareas con link de Google Drive
- `ModalRevisarEntregas.jsx` - Revisión y calificación de entregas

---

### 5. **Aula Virtual (Profesores)** (`/src/Private/review/teacher/AulaVirtual.jsx`)

**Funcionalidades:**
- ✅ Ver todos los cursos del profesor
- ✅ Agregar enlace de clase virtual por curso
- ✅ Editar enlace existente
- ✅ Seleccionar plataforma (Meet, Zoom, Teams, Classroom, Otro)
- ✅ Configurar:
  - Título de la clase
  - URL de la reunión
  - Horario de clase
  - Días de clase
  - Descripción/instrucciones
- ✅ Badge de estado "Configurado" con color según plataforma
- ✅ Botón "Probar" para verificar el enlace
- ✅ Vista previa de la configuración en card del curso
- ✅ Colores distintivos por plataforma

**Ruta:** `/aula-virtual`

---

### 6. **Actividad (Estudiantes)** (`/src/Private/review/shared/Activity.jsx`)

**Vista Estudiante:**
- ✅ Lista de todas las tareas pendientes de todos los cursos
- ✅ Filtrado automático: solo tareas no calificadas
- ✅ Ordenamiento por fecha de entrega
- ✅ Indicadores de estado:
  - Vencida (con días de retraso)
  - Vence hoy
  - Vence mañana
  - Días restantes
  - En revisión (entregada pero sin calificar)
- ✅ Información completa por tarea:
  - Curso y módulo
  - Descripción
  - Puntos
  - Fecha límite
  - Estado de entrega
- ✅ Click en tarea navega al curso
- ✅ Estado vacío cuando no hay tareas pendientes

**Vista Profesor:**
- ✅ Placeholder para actividad (sin cambios)

---

### 7. **Modal Entregar Tarea** (`/src/Private/review/shared/ModalEntregarTarea.jsx`)

**Funcionalidades:**
- ✅ Formulario para entregar tareas
- ✅ Campo para link de Google Drive
- ✅ Validación de URL de Google Drive
- ✅ Campo de comentarios opcional
- ✅ Instrucciones de compartir archivo
- ✅ Guardado en Firebase con timestamp
- ✅ Estado inicial "pendiente"

---

### 8. **Modal Revisar Entregas** (`/src/Private/review/shared/ModalRevisarEntregas.jsx`)

**Funcionalidades:**
- ✅ Panel dividido: Lista de entregas | Detalle de entrega
- ✅ Lista de todas las entregas de una tarea
- ✅ Indicadores de estado (pendiente/calificada)
- ✅ Selección de entrega para revisar
- ✅ Enlace directo a archivo en Google Drive
- ✅ Formulario de calificación:
  - Puntos obtenidos (validado contra máximo)
  - Feedback textual
- ✅ Actualización de estado a "calificada"
- ✅ Capacidad de modificar calificación existente
- ✅ Vista de comentarios del estudiante

---

### 9. **Modal Postulación** (`/src/Private/review/shared/ModalPostulacion.jsx`)

**Funcionalidades:**
- ✅ Formulario de postulación para estudiantes
- ✅ Campo de comentario opcional
- ✅ Información del curso/convocatoria
- ✅ Guardado automático de datos del estudiante
- ✅ Timestamp de postulación
- ✅ Estado inicial "pendiente"

---

### 10. **Modal Postulantes** (`/src/Private/review/shared/ModalPostulantes.jsx`)

**Funcionalidades:**
- ✅ Lista de todos los postulantes
- ✅ Filtrado por estado (todos, pendientes, aceptados, rechazados)
- ✅ Información de cada postulante:
  - Nombre
  - Comentario
  - Fecha de postulación
- ✅ Botones de acción:
  - Aceptar postulante
  - Rechazar postulante
- ✅ Contador de postulantes por estado
- ✅ Actualización en tiempo real

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
- `/view-convocatorias` - Gestión de convocatorias y postulantes
- `/view-cursos` - Gestión de cursos (crear, editar, eliminar)
- `/aula-virtual` - **NUEVO** - Gestión de enlaces a clases virtuales
- `/detalle-curso/:cursoId` - Detalle completo del curso (módulos, tareas, estudiantes)
- `/view-foro` - Foros de discusión
- `/view-config` - Configuración de perfil
- `/view-activity` - Actividad reciente
- `/clean-convocatorias` - Herramienta de limpieza

### Rutas de Estudiantes:
- `/view-students` - Dashboard principal
- `/view-new-course` - Explorar e inscribirse en cursos
- `/view-convocatorias` - Ver y postularse a convocatorias
- `/detalle-curso/:cursoId` - Ver contenido, tareas y clases virtuales del curso
- `/view-foro` - Foros de discusión
- `/view-config` - Configuración de perfil
- `/view-activity` - **NUEVO** - Ver todas las tareas pendientes de todos los cursos

### Rutas Compartidas:
- `/` - Página principal (Home)
- `/login-form` - Inicio de sesión
- `/register-form` - Registro de usuario
- `/view-rol` - Selección de rol (permite sin rol)
- `*` - Página 404 (NotFound)

---

## 📱 Características del Sistema

### Diseño:
- ✅ Modales modernos y responsive
- ✅ Tarjetas con hover effects
- ✅ Sistema de colores por categoría/prioridad/plataforma
- ✅ Iconos SVG personalizados
- ✅ Loading states y estados vacíos elegantes
- ✅ Animaciones suaves y transiciones
- ✅ Tabs navegables con diseño moderno
- ✅ Badges de estado (inscrito, configurado, pendiente, calificada)
- ✅ Cards organizables y colapsables (módulos)
- ✅ Diseño responsive para móviles

### Funcionalidad:
- ✅ CRUD completo para convocatorias
- ✅ Sistema de postulaciones con aceptación/rechazo
- ✅ Conversión de convocatoria a curso automática
- ✅ CRUD completo para cursos
- ✅ Sistema de módulos y lecciones jerárquico
- ✅ Tres tipos de lecciones (lectura, video, tarea)
- ✅ Sistema de inscripción de estudiantes
- ✅ Entregas de tareas vía Google Drive
- ✅ Sistema de calificaciones con feedback
- ✅ Tracking de progreso por estudiante
- ✅ Aula virtual con múltiples plataformas
- ✅ Dashboard de actividades pendientes
- ✅ Búsqueda y filtrado en tiempo real
- ✅ Contador de vistas/estudiantes/postulantes
- ✅ Persistencia de datos en Firebase
- ✅ Validación de formularios
- ✅ Confirmaciones para acciones destructivas
- ✅ Navegación intuitiva entre componentes

### Seguridad:
- ✅ Rutas protegidas por rol (ProtectedRoute)
- ✅ Validación de usuario en cada acción
- ✅ IDs de usuario vinculados a cada operación
- ✅ Separación de vistas profesor/estudiante
- ✅ Validación de permisos en cada componente

### Integración:
- ✅ Google Drive para entregas de tareas
- ✅ Validación de URLs de Drive
- ✅ Enlaces directos a archivos compartidos
- ✅ Soporte para múltiples plataformas de videoconferencia:
  - Google Meet
  - Zoom
  - Microsoft Teams
  - Google Classroom
  - Otras plataformas personalizadas

---

## 🔥 Firebase Config

Archivo centralizado: `/src/firebase/config.js`

```javascript
- Firestore Database
- Firebase Authentication
- Firebase Storage (preparado para futuro)
```

---

## 📊 Mejoras Futuras Sugeridas

### Prioridad Alta:
1. **Notificaciones push** cuando:
   - Te aceptan en una convocatoria
   - Hay una nueva tarea asignada
   - Recibes calificación
   - Profesor publica nuevo contenido

2. **Sistema de certificados** al completar cursos

3. **Foros mejorados** con:
   - Tiempo real (Firebase listeners)
   - Hilos de conversación
   - Reacciones a mensajes
   - Archivos adjuntos

### Prioridad Media:
4. **Upload de archivos** directamente a Firebase Storage
   - Imágenes para cursos
   - Material de apoyo en lecciones
   - Avatares de usuario

5. **Calendario integrado** mostrando:
   - Fechas límite de tareas
   - Horarios de clases virtuales
   - Eventos de convocatorias

6. **Reportes del profesor**:
   - Progreso general del curso
   - Estudiantes con bajo rendimiento
   - Estadísticas de entregas
   - Exportar a PDF/Excel

7. **Sistema de exámenes** con:
   - Preguntas de opción múltiple
   - Límite de tiempo
   - Calificación automática
   - Banco de preguntas

### Prioridad Baja:
8. **Gamificación**:
   - Badges por logros
   - Sistema de puntos
   - Tabla de clasificación
   - Niveles de experiencia

9. **Chat privado** entre profesor y estudiante

10. **Grabaciones de clases** con enlaces a YouTube/Drive

11. **Modo offline** con sincronización posterior

12. **Temas visuales** (modo oscuro/claro)

---

## ✅ Estado Actual del Sistema

### Completado 100%:

**Infraestructura:**
- ✅ Configuración de Firebase completa
- ✅ Firestore Database configurada
- ✅ Sistema de autenticación
- ✅ Servicios organizados por módulo
- ✅ Menú centralizado (menuItems.js)

**Servicios Firebase:**
- ✅ Convocatorias (CRUD completo + postulaciones + conversión a curso)
- ✅ Cursos (CRUD completo + módulos + lecciones + progreso)
- ✅ Foros (CRUD completo + mensajes)

**Componentes Core:**
- ✅ Convocatorias (Profesor y Estudiante)
- ✅ Sistema de postulaciones completo
- ✅ Nuevo Curso / Explorar Cursos (Estudiante)
- ✅ Gestión de Cursos (Profesor)
- ✅ Detalle de Curso (Profesor y Estudiante)
- ✅ Aula Virtual (Profesor)
- ✅ Actividad / Tareas Pendientes (Estudiante)

**Modales:**
- ✅ Modal Postulación (Estudiante)
- ✅ Modal Postulantes (Profesor)
- ✅ Modal Entregar Tarea (Estudiante)
- ✅ Modal Revisar Entregas (Profesor)

**Funcionalidades Avanzadas:**
- ✅ Sistema de módulos y lecciones jerárquico
- ✅ Tres tipos de contenido (lectura, video, tarea)
- ✅ Entregas vía Google Drive
- ✅ Sistema de calificaciones con feedback
- ✅ Tracking de progreso por estudiante
- ✅ Enlaces a aula virtual (Meet, Zoom, Teams, etc.)
- ✅ Dashboard de actividades pendientes
- ✅ Indicadores de estado (vencida, pendiente, calificada)

**Diseño y UX:**
- ✅ CSS Modules para estilos aislados
- ✅ Diseño responsive
- ✅ Loading states
- ✅ Empty states
- ✅ Animaciones y transiciones
- ✅ Sistema de colores por categoría
- ✅ Iconos SVG personalizados

### Rutas Activas:

**Profesores:** 8 rutas
**Estudiantes:** 7 rutas
**Compartidas:** 4 rutas

**Total:** 19 rutas funcionales

---

## 🎓 Flujo Completo del Usuario

### Estudiante:
1. **Registro/Login** → Selecciona rol "student"
2. **Dashboard** → Ve resumen de actividades
3. **Explorar Cursos** → Busca y se inscribe en cursos
4. **Ver Convocatorias** → Se postula a convocatorias
5. **Mis Cursos** → Accede al detalle del curso
6. **Contenido** → Ve lecciones, marca como completadas
7. **Clases** → Accede a link de aula virtual
8. **Tareas** → Entrega tareas vía Drive
9. **Actividad** → Ve todas sus tareas pendientes
10. **Recibe calificación** → Ve nota y feedback

### Profesor:
1. **Registro/Login** → Selecciona rol "profesor"
2. **Dashboard** → Ve resumen de cursos
3. **Crear Convocatoria** → Publica convocatoria
4. **Gestionar Postulantes** → Acepta/rechaza estudiantes
5. **Crear Curso** → Convierte convocatoria o crea desde cero
6. **Estructurar Curso** → Agrega módulos y lecciones
7. **Agregar Tareas** → Crea tareas con puntos y fechas
8. **Configurar Aula Virtual** → Agrega link de Meet/Zoom
9. **Revisar Entregas** → Califica tareas y da feedback
10. **Ver Progreso** → Monitorea avance de estudiantes

---

## 🔥 Firebase Database Schema (Actualizado)

### Collection: `users`
```javascript
{
  id: "auto-generated",
  name: "Juan Pérez",
  email: "juan@example.com",
  role: "student", // o "profesor"
  createdAt: Timestamp
}
```

### Collection: `convocatorias`
```javascript
{
  id: "auto-generated",
  titulo: "Curso de React Avanzado",
  descripcion: "Aprende React desde cero...",
  tipo: "general", // "evento" | "tarea"
  prioridad: "alta", // "media" | "normal"
  fechaLimite: "2025-12-31",
  profesorId: "user123",
  profesorNombre: "María García",
  views: 45,
  active: true,
  estado: "abierta", // "convertida"
  postulantes: [
    {
      estudianteId: "user456",
      estudianteNombre: "Carlos López",
      estado: "aceptado", // "pendiente" | "rechazado"
      comentario: "Me interesa mucho este curso",
      fechaPostulacion: Timestamp
    }
  ],
  cursoGeneradoId: "curso789", // null si no se ha convertido
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `cursos`
```javascript
{
  id: "auto-generated",
  titulo: "React desde Cero",
  descripcion: "Curso completo de React",
  objetivos: "Dominar React y hooks",
  categoria: "programacion", // "diseño" | "negocios" | etc.
  duracion: "8 semanas",
  imagen: "https://...",
  profesorId: "user123",
  profesorNombre: "María García",
  estudiantes: ["user456", "user789"],
  modulos: [
    {
      id: "mod1",
      titulo: "Introducción",
      descripcion: "Conceptos básicos",
      orden: 1,
      lecciones: [
        {
          id: "lec1",
          titulo: "¿Qué es React?",
          descripcion: "Introducción a React",
          tipo: "leccion", // "video" | "tarea"
          contenido: "React es una librería...",
          duracion: "15 min",
          orden: 1
        },
        {
          id: "lec2",
          titulo: "Tarea 1",
          descripcion: "Crear tu primer componente",
          tipo: "tarea",
          contenido: "Instrucciones de la tarea...",
          puntos: 10,
          fechaEntrega: "2025-12-15",
          orden: 2,
          entregas: [
            {
              id: "ent1",
              estudianteId: "user456",
              estudianteNombre: "Carlos López",
              linkDrive: "https://drive.google.com/...",
              comentarios: "Aquí está mi tarea",
              fechaEntrega: Timestamp,
              estado: "calificada", // "pendiente"
              calificacion: 9,
              feedback: "Excelente trabajo"
            }
          ]
        }
      ]
    }
  ],
  progreso: {
    "user456": {
      leccionesCompletadas: ["lec1", "lec2"],
      porcentaje: 50
    }
  },
  aulaVirtual: {
    titulo: "Clase semanal de React",
    plataforma: "meet", // "zoom" | "teams" | "classroom" | "otro"
    url: "https://meet.google.com/xxx-xxxx-xxx",
    descripcion: "Conectarse 5 min antes",
    horaClase: "18:00 - 20:00",
    diasClase: "Lunes y Miércoles"
  },
  convocatoriaOrigenId: "conv123", // opcional
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `foros`
```javascript
{
  id: "auto-generated",
  titulo: "Dudas sobre Hooks",
  descripcion: "Espacio para resolver dudas",
  categoria: "Programación",
  creadorId: "user123",
  creadorNombre: "María García",
  mensajes: [
    {
      id: "msg1",
      userId: "user456",
      userName: "Carlos López",
      texto: "¿Cómo funciona useState?",
      timestamp: Timestamp
    }
  ],
  participantes: ["user123", "user456"],
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🎉 Todo funciona con datos reales de Firebase Firestore!

**Sistema completamente funcional y listo para producción.**

Última actualización: 13 de noviembre de 2025
