# 📚 Manual de Usuario - Nexus Platform

## Guía Completa de Uso de la Plataforma Educativa

---

## 📋 Tabla de Contenidos

1. [Página de Inicio (Landing Page)](#1-página-de-inicio-landing-page)
2. [Sistema de Autenticación](#2-sistema-de-autenticación)
3. [Selección de Rol](#3-selección-de-rol)
4. [Vista de Estudiante](#4-vista-de-estudiante)
5. [Vista de Profesor](#5-vista-de-profesor)
6. [Configuración de Perfil](#6-configuración-de-perfil)
7. [Sistema de Convocatorias](#7-sistema-de-convocatorias)
8. [Gestión de Cursos](#8-gestión-de-cursos)
9. [Foros de Discusión](#9-foros-de-discusión)
10. [Aula Virtual](#10-aula-virtual)
11. [Dashboard de Actividad](#11-dashboard-de-actividad)

---

## 1. Página de Inicio (Landing Page)

### 🎯 Ubicación
**Ruta:** `/` (página principal)

### 📸 Descripción Visual

#### **Header (Barra Superior)**
- **Posición:** Fijo en la parte superior de la página
- **Logo:** "Nexus" en la esquina superior izquierda (clickable, te devuelve al inicio)
- **Navegación:** 5 enlaces principales
  - **Típicos:** Desplaza a la sección de características
  - **Cómo Funciona:** Desplaza a la guía paso a paso
  - **Testimonios:** Muestra opiniones de usuarios
  - **Equipo:** Información sobre los desarrolladores
  - **Contacto:** Enlace al portafolio de contacto
- **Botones de Acción:**
  - **"Registrarse"** (botón con gradiente turquesa) → Te lleva a `/register-form`
  - **"Iniciar sesión"** (botón con gradiente turquesa) → Te lleva a `/login-form`

#### **Sección Hero (Principal)**
- **Fondo:** Imagen de fondo oscura con overlay
- **Título Principal:** "Innovación y Conexión en la Educación"
- **Subtítulo:** Descripción breve de la plataforma
- **Botón:** "Descubre Más" → Desplaza hacia abajo a la sección "¿Qué es Nexus?"

#### **Sección Equipo (Desarrolladores)**
- **Ubicación:** Justo debajo del Hero
- **Contenido:** 
  - **Desarrollador 1:** J.S SALAZAR (Backend & Frontend)
    - Avatar circular con gradiente
    - Descripción de especialización
  - **Desarrollador 2:** D.S MONTAÑO (Frontend & Backend)
    - Avatar circular con gradiente invertido
    - Descripción de especialización

#### **Sección "¿Qué es Nexus?"**
- **ID:** `#learn_more`
- **Fondo:** Gris medio (#282828)
- **Contenido:**
  - Título: "¿Qué es Nexus?"
  - Descripción de la plataforma
  - **3 Tarjetas de Características:**
    1. **Tiempo Real:** Acceso a clases y recursos
    2. **Asistencia Inteligente:** IA para apoyar el aprendizaje
    3. **Recursos Exclusivos:** Biblioteca digital personalizada

#### **Sección "Características Principales"**
- **ID:** `#features`
- **Fondo:** Gris medio (#282828)
- **Contenido:** 4 tarjetas con iconos SVG animados (aparecen con scroll)
  1. **Comunidad Activa:** Conecta con estudiantes y profesores
  2. **Cursos Certificados:** Obtén certificados reconocidos
  3. **Aprende a tu Ritmo:** Acceso 24/7
  4. **Contenido Premium:** Material exclusivo

#### **Sección "¿Cómo Funciona?"**
- **ID:** `#how-it-works`
- **Fondo:** Negro oscuro (#1c1c1e)
- **Contenido:** 4 pasos numerados
  1. **Regístrate:** Crea cuenta en 2 minutos
  2. **Elige tu Rol:** Estudiante o profesor
  3. **Explora Cursos:** Busca cursos por categorías
  4. **Comienza a Aprender:** Accede al contenido

#### **Sección "Testimonios"**
- **ID:** `#testimonials`
- **Fondo:** Gris medio (#282828)
- **Contenido:** 3 tarjetas de testimonios
  - María García (Profesora de Matemáticas)
  - Carlos Rodríguez (Estudiante de Programación)
  - Ana López (Profesora de Diseño)

#### **Sección Call-to-Action (CTA)**
- **Fondo:** Negro oscuro (#1c1c1e)
- **Contenido:**
  - Título: "¿Listo para Comenzar?"
  - Subtítulo motivacional
  - **2 Botones:**
    - "Comenzar Gratis" (turquesa brillante) → `/register-form`
    - "Iniciar Sesión" (borde turquesa) → `/login-form`

#### **Footer (Pie de Página)**
- **Fondo:** Gris oscuro (#1c1c1e)
- **Contenido:** Copyright © 2024 Nexus

---

## 2. Sistema de Autenticación

### 🔐 Inicio de Sesión

#### **Ubicación**
**Ruta:** `/login-form`

#### **Descripción Visual**

**Panel Izquierdo (Formulario):**
- **Título:** "Sign in"
- **Campos de Entrada:**
  1. **Correo Electrónico**
     - Placeholder: "juanitoFree@gmail.com"
     - Tipo: text
     - Requerido: Sí
  2. **Contraseña**
     - Placeholder: "*********************"
     - Tipo: password
     - Requerido: Sí
- **Botón:** "Login" (envía el formulario)

**Panel Derecho (Overlay):**
- **Fondo:** Gradiente turquesa
- **Contenido:**
  - Título: "¡Bienvenido de nuevo!"
  - Subtítulo: Mensaje de bienvenida
  - Sección inferior:
    - "¿No tienes una cuenta?"
    - **Botón:** "Registrarse" → `/register-form`

#### **Funcionamiento:**
1. Usuario ingresa correo y contraseña
2. Click en "Login"
3. Sistema valida credenciales con Firebase Authentication
4. **Si es exitoso:**
   - Muestra alerta de bienvenida con SweetAlert2
   - Guarda datos en localStorage (userId, correo, nombre)
   - Verifica si tiene rol asignado:
     - **Sin rol:** Redirige a `/view-rol`
     - **Con rol profesor:** Redirige a `/view-teachers`
     - **Con rol estudiante:** Redirige a `/view-students`
5. **Si falla:**
   - Muestra alerta de error con SweetAlert2

---

### 📝 Registro de Usuario

#### **Ubicación**
**Ruta:** `/register-form`

#### **Descripción Visual**

**Panel Izquierdo (Overlay):**
- **Fondo:** Gradiente turquesa
- **Contenido:**
  - Título: "¡Hola, amigo!"
  - Mensaje: "Ingresa tus datos personales y comienza tu viaje con nosotros"
  - Sección inferior:
    - "¿Ya tienes una cuenta?"
    - **Botón:** "Iniciar Sesión" → `/login-form`

**Panel Derecho (Formulario):**
- **Título:** "Crear Cuenta"
- **Campos de Entrada:**
  1. **Nombre Completo**
     - Placeholder: "Juanito Pérez"
     - Tipo: text
     - Requerido: Sí
  2. **Correo Electrónico**
     - Placeholder: "juanito@gmail.com"
     - Tipo: email
     - Requerido: Sí
  3. **Contraseña**
     - Placeholder: "*********************"
     - Tipo: password
     - Requerido: Sí (mínimo 6 caracteres)
  4. **Confirmar Contraseña**
     - Placeholder: "*********************"
     - Tipo: password
     - Requerido: Sí
- **Botón:** "Sign Up" (envía el formulario)

#### **Funcionamiento:**
1. Usuario llena todos los campos
2. Sistema valida que las contraseñas coincidan
3. Click en "Sign Up"
4. Firebase crea la cuenta de autenticación
5. Firestore guarda datos adicionales en la colección `usuarios`:
   - nombre, correo, fechaRegistro
   - rol: null (se asigna después)
   - profileCompleted: false
6. **Si es exitoso:**
   - Muestra alerta de éxito
   - Redirige automáticamente a `/login-form`
7. **Si falla:**
   - Muestra alerta de error (correo ya existe, contraseña débil, etc.)

---

## 3. Selección de Rol

#### **Ubicación**
**Ruta:** `/view-rol`

#### **Acceso**
- Solo usuarios autenticados **sin rol asignado**
- Redirige automáticamente si ya tienes rol

#### **Descripción Visual**

**Pantalla Central:**
- **Título:** "Elige tu rol [Nombre del Usuario]"
- **Fondo:** Oscuro con efecto de radio buttons personalizados

**Opciones de Rol:**

1. **Profesor**
   - **Imagen:** Ilustración de profesor (RolT.png)
   - **Radio button:** Circular con efecto hover
   - **Icono SVG:** Graduación/enseñanza
   - **Etiqueta:** "Profesor"
   - **Texto descriptivo:** "Rol profesor para impartir clases"

2. **Estudiante**
   - **Imagen:** Ilustración de estudiante (RolE.png)
   - **Radio button:** Circular con efecto hover
   - **Icono SVG:** Libro/aprendizaje
   - **Etiqueta:** "Estudiante"
   - **Texto descriptivo:** "Rol estudiante para acceder a cursos"

**Botón de Confirmación:**
- **Texto:** "Confirmar Rol"
- **Estilo:** Botón grande, destacado
- **Posición:** Parte inferior central

#### **Funcionamiento:**
1. Usuario hace click en una de las opciones (Profesor o Estudiante)
2. La tarjeta seleccionada se resalta visualmente
3. Click en "Confirmar Rol"
4. Sistema guarda el rol en Firestore:
   - Actualiza campo `rol` en documento del usuario
   - Valores posibles: "profesor" o "student"
5. **Alerta de confirmación** con SweetAlert2
6. **Redirección automática:**
   - **Profesor:** → `/view-teachers`
   - **Estudiante:** → `/view-students`

---

## 4. Vista de Estudiante

#### **Ubicación**
**Ruta:** `/view-students`

#### **Acceso**
- Solo usuarios con rol **"student"**
- Requiere autenticación

### 📐 Estructura de la Interfaz

#### **Barra Lateral Izquierda (Sidebar)**

**Sección Superior:**
- **Avatar del Usuario:**
  - Icono circular con gradiente
  - Nombre del usuario debajo
  - Email del usuario

**Menú de Navegación:**
1. **🏠 Dashboard** → `/view-students`
2. **📚 Nuevo Curso** → `/view-new-course`
3. **📊 Actividad** → `/view-activity`
4. **📢 Convocatorias** → `/view-convocatorias`
5. **💬 Foro** → `/view-foro`
6. **⚙️ Configuración** → `/view-config`

**Sección Inferior:**
- **Botón "Cerrar Sesión"**
  - Click: Limpia localStorage y redirige a `/`

#### **Contenido Principal (Dashboard)**

**Tarjeta de Bienvenida:**
- **Título:** "¡Bienvenido de nuevo, [Nombre]!"
- **Subtítulo:** Mensaje motivacional
- **Fondo:** Gradiente turquesa

**Sección "Mis Cursos Activos":**
- **Grid de Tarjetas** (3 columnas responsive)
- Cada tarjeta de curso muestra:
  - **Título del curso**
  - **Nombre del profesor**
  - **Descripción breve**
  - **Progreso visual:** Barra de progreso porcentual
  - **Estado:** Badge con color (Activo, En progreso, Completado)
  - **Botón:** "Ver Detalles" → `/detalle-curso/[cursoId]`

**Estadísticas Rápidas:**
- **Tarjetas de métricas:**
  1. **Cursos Activos:** Número total
  2. **Tareas Pendientes:** Contador
  3. **Progreso Promedio:** Porcentaje

**Sección "Actividad Reciente":**
- Lista de últimas acciones:
  - Tareas entregadas
  - Comentarios en foros
  - Nuevos materiales disponibles
- Cada item con:
  - Icono descriptivo
  - Fecha y hora
  - Link al recurso

---

## 5. Vista de Profesor

#### **Ubicación**
**Ruta:** `/view-teachers`

#### **Acceso**
- Solo usuarios con rol **"profesor"**
- Requiere autenticación

### 📐 Estructura de la Interfaz

#### **Barra Lateral Izquierda (Sidebar)**

**Sección Superior:**
- **Avatar del Usuario:**
  - Icono circular con gradiente
  - Nombre del profesor
  - Email

**Menú de Navegación:**
1. **🏠 Dashboard** → `/view-teachers`
2. **📚 Mis Cursos** → `/view-cursos`
3. **🎓 Aula Virtual** → `/aula-virtual`
4. **📊 Actividad** → `/view-activity`
5. **📢 Convocatorias** → `/view-convocatorias`
6. **💬 Foro** → `/view-foro`
7. **⚙️ Configuración** → `/view-config`

**Sección Inferior:**
- **Botón "Cerrar Sesión"**

#### **Contenido Principal (Dashboard)**

**Tarjeta de Bienvenida:**
- **Título:** "Panel de Control - Profesor"
- **Nombre:** [Nombre del Profesor]
- **Estadísticas resumen**

**Sección "Mis Cursos":**
- **Botón:** "Crear Nueva Convocatoria" (destacado)
- **Grid de Tarjetas de Cursos:**
  Cada tarjeta muestra:
  - **Título del curso**
  - **Número de estudiantes inscritos**
  - **Estado:** Activo, Finalizado, En borrador
  - **Fecha de creación**
  - **Botones de Acción:**
    - "Ver Detalles" → `/detalle-curso/[cursoId]`
    - "Editar Curso"
    - "Ver Estudiantes"

**Estadísticas del Profesor:**
1. **Total de Estudiantes:** Suma de todos los cursos
2. **Cursos Activos:** Cursos en progreso
3. **Tareas por Revisar:** Contador de entregas pendientes
4. **Convocatorias Abiertas:** Número de convocatorias activas

**Sección "Actividad Reciente":**
- Últimas entregas de estudiantes
- Nuevas postulaciones a convocatorias
- Comentarios en foros
- Cada item clickable para acción rápida

---

## 6. Configuración de Perfil

#### **Ubicación**
**Ruta:** `/view-config`

#### **Acceso**
- Cualquier usuario autenticado
- Disponible para estudiantes y profesores

### 📋 Estructura del Formulario

#### **Sección Superior**
- **Título:** "Configuración de Perfil"
- **Avatar:** Imagen de perfil (circular)
- **Botón:** "Cambiar Foto" (funcionalidad de subir imagen)

#### **Formulario de Datos Personales**

**Campos Editables:**

1. **Nombre Completo** *
   - Tipo: text
   - Placeholder: "Juan Pérez"
   - Requerido: Sí
   - Validación: Mínimo 3 caracteres

2. **Email**
   - Tipo: email
   - **Deshabilitado** (no editable)
   - Se muestra el email registrado

3. **Teléfono** *
   - Tipo: tel
   - Placeholder: "+57 300 123 4567"
   - Requerido: Sí
   - Validación: Formato de número

4. **Biografía / Descripción** *
   - Tipo: textarea
   - Placeholder: "Cuéntanos sobre ti..."
   - Requerido: Sí
   - Límite: 500 caracteres
   - Contador de caracteres visible

5. **Fecha de Nacimiento**
   - Tipo: date
   - Opcional

6. **Género**
   - Tipo: select
   - Opciones: Masculino, Femenino, Otro, Prefiero no decir

7. **País**
   - Tipo: select
   - Lista de países

8. **Institución Educativa**
   - Tipo: text
   - Placeholder: "Universidad/Colegio"

**Campos Marcados con * son OBLIGATORIOS**

#### **Notificación de Perfil Incompleto**

Si faltan campos obligatorios (nombre, teléfono, bio):

**Banner Superior (Fijo):**
- **Fondo:** Gradiente morado
- **Icono:** Alerta circular animado
- **Mensaje:** "¡Completa tu perfil!"
- **Detalle:** "Te faltan X datos importantes: [lista de campos]"
- **Botones:**
  - "Completar ahora" → Scroll automático al formulario
  - "Más tarde" → Oculta banner por esta sesión

#### **Botones de Acción**

**Parte Inferior del Formulario:**
1. **"Guardar Cambios"** (botón principal turquesa)
   - Valida campos requeridos
   - Muestra spinner mientras guarda
   - Alerta de éxito/error
   - Actualiza datos en Firestore

2. **"Cancelar"** (botón secundario)
   - Restaura valores originales
   - No guarda cambios

#### **Funcionamiento:**
1. Al cargar: Trae datos actuales de Firestore
2. Usuario modifica campos
3. Click en "Guardar Cambios"
4. **Validaciones:**
   - Nombre: No vacío
   - Teléfono: Formato válido
   - Biografía: Mínimo 10 caracteres
5. **Si falta algún campo obligatorio:**
   - Alerta WARNING con lista de campos faltantes
6. **Si todo está completo:**
   - Guarda en Firestore
   - Marca `profileCompleted: true`
   - Limpia sessionStorage de notificación
   - Alerta de éxito
7. **Si hay error:**
   - Alerta de error con detalles

---

## 7. Sistema de Convocatorias

#### **Ubicación**
**Ruta:** `/view-convocatorias`

#### **Acceso**
- Disponible para **profesores** y **estudiantes**
- Funcionalidad diferente según el rol

### 👨‍🏫 Vista de Profesor (Crear Convocatorias)

#### **Sección Superior**
- **Título:** "Mis Convocatorias"
- **Botón destacado:** "+ Nueva Convocatoria"

#### **Modal "Crear Convocatoria"**

**Formulario:**
1. **Título del Curso**
   - Tipo: text
   - Placeholder: "Introducción a React"
   - Requerido: Sí

2. **Descripción**
   - Tipo: textarea
   - Placeholder: "Describe el contenido del curso..."
   - Requerido: Sí

3. **Categoría**
   - Tipo: select
   - Opciones: Programación, Matemáticas, Ciencias, Arte, Idiomas, etc.

4. **Nivel**
   - Tipo: select
   - Opciones: Principiante, Intermedio, Avanzado

5. **Duración Estimada**
   - Tipo: number
   - Unidad: Semanas
   - Placeholder: "8"

6. **Cupos Máximos**
   - Tipo: number
   - Placeholder: "30"
   - Requerido: Sí

7. **Fecha de Cierre**
   - Tipo: date
   - Selección de fecha límite para postulaciones

8. **Requisitos**
   - Tipo: textarea
   - Placeholder: "Conocimientos básicos de..."

**Botones:**
- "Publicar Convocatoria" (verde)
- "Cancelar" (gris)

#### **Lista de Convocatorias Creadas**

**Tarjetas de Convocatorias:**
Cada una muestra:
- **Título del curso**
- **Fecha de creación**
- **Estado:** Badge de color
  - 🟢 Abierta (aceptando postulaciones)
  - 🟡 En revisión (cupos llenos)
  - 🔴 Cerrada (curso iniciado)
- **Postulantes:** Número actual / Cupos máximos
- **Botones:**
  - "Ver Postulantes" → Abre modal de gestión
  - "Cerrar Convocatoria"
  - "Editar"
  - "Eliminar"

#### **Modal "Gestión de Postulantes"**

**Lista de Estudiantes Postulados:**
Cada item muestra:
- **Foto de perfil** (avatar)
- **Nombre del estudiante**
- **Email**
- **Fecha de postulación**
- **Estado:** Badge
  - ⏳ Pendiente
  - ✅ Aceptado
  - ❌ Rechazado
- **Botones de Acción:**
  - "Aceptar" (verde) → Cambia estado a "aceptado"
  - "Rechazar" (rojo) → Cambia estado a "rechazado"

**Sección Inferior del Modal:**
- **Contador:** "X de Y postulantes aceptados"
- **Botón:** "Cerrar Convocatoria y Crear Curso" (solo si hay aceptados)
  - Crea curso automáticamente
  - Inscribe a estudiantes aceptados
  - Cierra la convocatoria

---

### 👨‍🎓 Vista de Estudiante (Postularse)

#### **Sección Superior**
- **Título:** "Convocatorias Disponibles"
- **Barra de Búsqueda:**
  - Filtrar por título o categoría
- **Filtros:**
  - Por categoría (dropdown)
  - Por nivel (dropdown)
  - Por estado (Abiertas, Todas)

#### **Grid de Convocatorias**

**Tarjetas de Convocatorias:**
Cada una muestra:
- **Título del curso**
- **Nombre del profesor** (con avatar pequeño)
- **Categoría:** Badge con color
- **Nivel:** Badge (Principiante/Intermedio/Avanzado)
- **Descripción breve:** Primeras 2 líneas
- **Duración:** "X semanas"
- **Cupos:** "Y disponibles de Z"
- **Fecha de cierre:** Con cuenta regresiva
- **Estado de postulación:**
  - Sin postular: Botón "Postularme"
  - Postulado: Badge "Postulado ⏳"
  - Aceptado: Badge "Aceptado ✅"
  - Rechazado: Badge "Rechazado ❌"

#### **Modal "Postulación"**

Al hacer click en "Postularme":

**Contenido:**
- **Título:** Nombre del curso
- **Información detallada:**
  - Descripción completa
  - Requisitos
  - Duración
  - Profesor
- **Mensaje de Motivación:**
  - Textarea para que el estudiante escriba por qué quiere el curso
  - Opcional pero recomendado
- **Botones:**
  - "Confirmar Postulación" (turquesa)
  - "Cancelar" (gris)

#### **Funcionamiento:**
1. Estudiante busca/filtra convocatorias
2. Click en "Postularme"
3. Lee información y escribe motivación (opcional)
4. Confirma postulación
5. Sistema guarda en Firestore:
   - Colección: `convocatorias/[id]/postulantes`
   - Datos: userId, nombre, email, fecha, estado: "pendiente"
6. Badge cambia a "Postulado ⏳"
7. Espera a que profesor acepte/rechace

---

## 8. Gestión de Cursos

### 📚 Vista de Profesor - Mis Cursos

#### **Ubicación**
**Ruta:** `/view-cursos`

#### **Acceso**
- Solo profesores

#### **Sección Superior**
- **Título:** "Gestión de Cursos"
- **Botón:** "+ Crear Curso Manual" (si quiere crear sin convocatoria)

#### **Grid de Cursos**

**Tarjetas de Curso:**
Cada una muestra:
- **Miniatura/Banner del curso**
- **Título**
- **Estudiantes inscritos:** Número con icono
- **Estado:** Badge
  - 🟢 Activo
  - 🟡 En borrador
  - 🔵 Finalizado
- **Progreso general:** Barra de progreso promedio de estudiantes
- **Fecha de inicio/fin**
- **Botones:**
  - "Ver Detalles" → `/detalle-curso/[id]`
  - "Gestionar Contenido"
  - "Ver Estadísticas"
  - "Configuración"

---

### 📖 Detalle de Curso (Profesor y Estudiante)

#### **Ubicación**
**Ruta:** `/detalle-curso/[cursoId]`

#### **Acceso**
- Profesores: Pueden ver todos sus cursos
- Estudiantes: Solo cursos en los que están inscritos

### 👨‍🏫 Vista de Profesor

#### **Encabezado del Curso**
- **Banner grande** del curso
- **Título del curso**
- **Descripción**
- **Estadísticas:**
  - Total de estudiantes
  - Progreso promedio
  - Tareas pendientes de revisar

#### **Tabs de Navegación**

**1. Contenido del Curso**

**Estructura de Módulos:**
- **Lista de Módulos** (acordeón)
  - Módulo 1: [Nombre]
    - **Lecciones:**
      - Lección 1.1: Título
        - Tipo: Video/PDF/Artículo
        - Duración: 15 min
        - **Botón:** "Editar"
      - Lección 1.2: Título
    - **Tareas/Actividades:**
      - Tarea 1: Título
        - Fecha límite
        - Entregas: X de Y
        - **Botón:** "Ver Entregas"

**Botón flotante:** "+ Agregar Módulo/Lección/Tarea"

**Modal "Crear Contenido":**

**Opciones:**
1. **Nuevo Módulo**
   - Título
   - Descripción
   - Orden

2. **Nueva Lección**
   - Título
   - Tipo: Video, PDF, Artículo, Enlace
   - Contenido/URL
   - Duración estimada
   - Módulo padre

3. **Nueva Tarea**
   - Título
   - Descripción/Instrucciones
   - Fecha límite
   - Puntos/Calificación máxima
   - Módulo padre
   - Tipo de entrega: Archivo, Texto, Enlace

**2. Estudiantes Inscritos**

**Lista de Estudiantes:**
Tabla con:
- **Avatar**
- **Nombre**
- **Email**
- **Progreso:** Barra visual (% de lecciones completadas)
- **Tareas entregadas:** X de Y
- **Promedio de calificaciones**
- **Última actividad:** Fecha
- **Acciones:**
  - Ver perfil
  - Enviar mensaje
  - Descargar reporte

**3. Entregas de Tareas**

**Lista de Tareas:**
Cada tarea con:
- **Título de la tarea**
- **Fecha límite**
- **Entregas:** Contador con badge
  - 🟢 Revisadas
  - 🟡 Pendientes
  - 🔴 Atrasadas

**Click en tarea** → Modal "Revisar Entregas"

**Modal "Revisar Entregas":**

**Lista de Entregas:**
Cada item:
- **Estudiante:** Nombre y avatar
- **Fecha de entrega**
- **Estado:** A tiempo / Tarde
- **Archivo/Enlace adjunto:** Botón "Descargar/Ver"
- **Comentario del estudiante:** Texto
- **Sección de Revisión:**
  - **Calificación:** Input numérico (0 a 100)
  - **Comentarios del profesor:** Textarea
  - **Botón:** "Guardar Calificación"
  - **Estado:** Sin revisar / Revisado

**4. Foro del Curso**
- Discusiones específicas del curso
- Estudiantes pueden hacer preguntas
- Profesor y otros estudiantes responden

---

### 👨‍🎓 Vista de Estudiante

#### **Encabezado del Curso**
- **Banner del curso**
- **Título**
- **Nombre del profesor**
- **Tu progreso:** Barra de progreso personal

#### **Tabs de Navegación**

**1. Contenido/Lecciones**

**Lista de Módulos:**
- **Módulo 1:** [Nombre]
  - **Lecciones:**
    - ✅ Lección 1.1 (Completada)
      - Click → Reproduce video/muestra contenido
    - ⏳ Lección 1.2 (En progreso)
    - 🔒 Lección 1.3 (Bloqueada - completar anteriores)
  - **Tareas:**
    - Tarea 1: "Ejercicio práctico"
      - Estado: ⏳ Pendiente / ✅ Entregada / ✔️ Calificada
      - Fecha límite: DD/MM/AAAA
      - **Botón:** "Entregar Tarea"

**Modal "Entregar Tarea":**
- **Título de la tarea**
- **Instrucciones:** Descripción completa
- **Tipo de entrega:**
  - Subir archivo: Botón "Seleccionar archivo"
  - Escribir texto: Textarea
  - Enlace: Input URL
- **Comentarios adicionales:** Textarea opcional
- **Botones:**
  - "Enviar Tarea" (verde)
  - "Guardar Borrador" (amarillo)
  - "Cancelar"

**2. Mis Entregas**

**Lista de Tareas:**
- **Título de la tarea**
- **Módulo:** Nombre del módulo
- **Fecha de entrega:** Tu fecha
- **Estado:** Badge
  - ⏳ Sin entregar
  - 📤 Entregada (esperando revisión)
  - ✅ Calificada
- **Calificación:** Número/100 (si ya está calificada)
- **Feedback del profesor:** Comentarios
- **Botón:** "Ver Detalles"

**3. Progreso**

**Dashboard Personal:**
- **Gráfico circular:** % de lecciones completadas
- **Estadísticas:**
  - Lecciones completadas: X de Y
  - Tareas entregadas: X de Y
  - Promedio de calificaciones: Z
- **Última actividad:** Fecha y hora
- **Tiempo total invertido:** Horas estimadas

**4. Foro del Curso**
- Ver preguntas de otros estudiantes
- Hacer preguntas al profesor
- Responder a compañeros

---

## 9. Foros de Discusión

#### **Ubicación**
**Ruta:** `/view-foro`

#### **Acceso**
- Disponible para profesores y estudiantes

### 📐 Estructura del Foro

#### **Sección Superior**
- **Título:** "Foros de Discusión"
- **Tabs:**
  - **Todos los Foros:** Ver todos los temas
  - **Mis Publicaciones:** Solo tus posts
  - **Guardados:** Posts marcados como favoritos
- **Botón:** "+ Nuevo Tema" (destacado, turquesa)

#### **Barra de Búsqueda y Filtros**
- **Búsqueda:** Por título o contenido
- **Filtros:**
  - Por curso (dropdown)
  - Por categoría: Duda, Discusión, Anuncio, Recurso
  - Ordenar por: Más reciente, Más popular, Más respondidos

#### **Grid de Temas**

**Tarjetas de Tema:**
Cada una muestra:
- **Avatar del autor** (circular, pequeño)
- **Nombre del autor** y **rol** (badge Estudiante/Profesor)
- **Título del tema** (clickable)
- **Categoría:** Badge de color
  - 🟣 Duda
  - 🔵 Discusión
  - 🟢 Anuncio
  - 🟡 Recurso
- **Curso relacionado:** Si aplica
- **Preview del contenido:** Primeras 2 líneas
- **Estadísticas:**
  - 👁️ Vistas: Número
  - 💬 Respuestas: Número
  - ⭐ Me gusta: Número
- **Última actividad:** "hace 2 horas" / fecha
- **Botón:** "Ver Discusión"

---

### 💬 Vista de Tema Individual

Click en un tema → Página completa

#### **Estructura**

**Post Principal:**
- **Encabezado:**
  - Avatar grande del autor
  - Nombre del autor
  - Rol (badge)
  - Fecha de publicación
  - Curso relacionado (si aplica)
- **Título del tema** (grande)
- **Categoría:** Badge
- **Contenido completo:**
  - Texto formateado (Markdown)
  - Imágenes (si hay)
  - Links (si hay)
  - Archivos adjuntos (si hay)
- **Acciones:**
  - ⭐ Me gusta (contador)
  - 🔖 Guardar
  - 🚩 Reportar
  - ✏️ Editar (solo autor)
  - 🗑️ Eliminar (solo autor)

**Sección de Respuestas:**

**Caja de Respuesta Rápida:**
- **Avatar** del usuario actual
- **Textarea:** "Escribe tu respuesta..."
- **Toolbar:**
  - Negrita
  - Cursiva
  - Lista
  - Link
  - Imagen
- **Botón:** "Publicar Respuesta"

**Lista de Respuestas:**
Cada respuesta muestra:
- **Avatar del respondedor**
- **Nombre y rol**
- **Fecha/hora**
- **Contenido de la respuesta**
- **Acciones:**
  - ⭐ Me gusta
  - 💬 Responder (anidado)
  - ✏️ Editar (solo autor)
  - 🗑️ Eliminar (solo autor)

**Respuestas Anidadas:**
- Sangría visual
- Máximo 2 niveles de anidación
- Línea vertical conectora

---

### ➕ Crear Nuevo Tema

**Modal "Nuevo Tema":**

**Formulario:**
1. **Título**
   - Tipo: text
   - Placeholder: "Título descriptivo de tu pregunta o tema"
   - Requerido: Sí
   - Max: 100 caracteres

2. **Categoría**
   - Tipo: select
   - Opciones:
     - 🟣 Duda (pregunta técnica)
     - 🔵 Discusión (debate/opinión)
     - 🟢 Anuncio (información importante)
     - 🟡 Recurso (compartir material)
   - Requerido: Sí

3. **Curso Relacionado**
   - Tipo: select
   - Lista de cursos en los que estás inscrito
   - Opcional

4. **Contenido**
   - Tipo: Editor de texto enriquecido
   - Placeholder: "Describe tu pregunta o tema en detalle..."
   - Requerido: Sí
   - **Toolbar:**
     - Formato: H1, H2, H3, Párrafo
     - Estilos: **Negrita**, *Cursiva*, ~Tachado~
     - Listas: Numeradas, Viñetas
     - Links: Insertar URL
     - Imágenes: Subir/URL
     - Código: Bloque de código

5. **Archivos Adjuntos**
   - Botón "Adjuntar archivo"
   - Formatos: PDF, DOC, ZIP, imágenes
   - Max: 10MB

**Vista Previa:**
- Tab "Previsualizar" para ver cómo se verá

**Botones:**
- "Publicar Tema" (turquesa)
- "Guardar Borrador" (gris)
- "Cancelar"

---

## 10. Aula Virtual

#### **Ubicación**
**Ruta:** `/aula-virtual`

#### **Acceso**
- Solo **profesores**
- Funcionalidad en desarrollo/experimental

### 🎓 Descripción

**Propósito:**
Espacio para clases en vivo y gestión de recursos en tiempo real

#### **Funcionalidades Planificadas:**

1. **Videoconferencia Integrada**
   - Sala virtual para clases en vivo
   - Compartir pantalla
   - Chat en tiempo real
   - Levantar mano
   - Pizarra virtual

2. **Grabación de Clases**
   - Grabar sesiones en vivo
   - Almacenar en biblioteca del curso
   - Acceso posterior para estudiantes

3. **Presentaciones**
   - Subir y presentar slides
   - Anotaciones en tiempo real
   - Descarga de material

4. **Ejercicios en Vivo**
   - Crear quizzes rápidos
   - Ver resultados en tiempo real
   - Estadísticas instantáneas

_(Nota: Esta sección está en desarrollo activo)_

---

## 11. Dashboard de Actividad

#### **Ubicación**
**Ruta:** `/view-activity`

#### **Acceso**
- Disponible para profesores y estudiantes
- Contenido personalizado según rol

### 👨‍🎓 Vista de Estudiante

#### **Panel de Control Personal**

**Sección Superior - Resumen:**
- **Tarjetas de Estadísticas:**
  1. **Cursos Activos**
     - Número total
     - Icono: 📚
  2. **Tareas Pendientes**
     - Contador con badge rojo
     - Icono: 📝
  3. **Progreso Global**
     - Porcentaje promedio de todos los cursos
     - Icono: 📊
  4. **Tiempo Invertido**
     - Horas totales esta semana
     - Icono: ⏱️

**Gráficos:**

1. **Progreso Semanal**
   - Gráfico de líneas
   - Muestra lecciones completadas por día
   - Últimos 7 días

2. **Distribución de Tiempo**
   - Gráfico de dona
   - Tiempo por curso
   - Colores diferentes por curso

3. **Calificaciones**
   - Gráfico de barras
   - Promedio por curso
   - Comparación con promedio general

**Actividad Reciente:**
Lista cronológica de últimas acciones:
- ✅ Lección completada: "[Nombre]" en [Curso] - hace 2 horas
- 📤 Tarea entregada: "[Nombre]" en [Curso] - ayer
- 💬 Comentario en foro: "[Título]" - hace 3 días
- ⭐ Calificación recibida: [Nota] en "[Tarea]" - hace 5 días

**Próximos Vencimientos:**
- **Tareas próximas:**
  - Tarea X - Vence en 2 días 🔴
  - Tarea Y - Vence en 1 semana 🟡
- **Lecciones programadas:**
  - Clase en vivo - Mañana 10:00 AM

---

### 👨‍🏫 Vista de Profesor

#### **Panel de Control del Profesor**

**Sección Superior - Resumen:**
- **Tarjetas de Estadísticas:**
  1. **Total de Estudiantes**
     - Suma de todos los cursos
     - Icono: 👥
  2. **Cursos Activos**
     - Número de cursos en progreso
     - Icono: 📚
  3. **Entregas por Revisar**
     - Contador con badge
     - Icono: 📋
  4. **Convocatorias Abiertas**
     - Número de convocatorias activas
     - Icono: 📢

**Gráficos:**

1. **Progreso de Estudiantes por Curso**
   - Gráfico de barras agrupadas
   - Muestra progreso promedio por curso
   - Comparación entre cursos

2. **Entregas Semanales**
   - Gráfico de líneas
   - Tareas entregadas vs. esperadas
   - Últimas 4 semanas

3. **Participación en Foros**
   - Gráfico circular
   - Posts por curso
   - Engagement de estudiantes

**Actividad Reciente:**
- 📤 Nueva entrega: [Estudiante] en "[Tarea]" - hace 30 min
- 📝 Nueva postulación: [Estudiante] en "[Convocatoria]" - hace 1 hora
- 💬 Nuevo post en foro: "[Título]" por [Estudiante] - hace 2 horas
- ⭐ Estudiante completó curso: [Estudiante] en "[Curso]" - ayer

**Acciones Pendientes:**
- **Entregas sin revisar:** Lista con links directos
- **Postulantes por revisar:** Lista de convocatorias
- **Preguntas en foro:** Posts sin respuesta del profesor

**Estadísticas de Cursos:**
Tabla con:
- **Curso:** Nombre
- **Estudiantes:** Número activos
- **Progreso Promedio:** Barra %
- **Última Actividad:** Fecha
- **Acción:** Botón "Ver Detalles"

---

## 🔔 Sistema de Notificaciones

### Notificación de Perfil Incompleto

**Ubicación:** Banner fijo superior (aparece en todas las vistas privadas)

**Cuándo aparece:**
- Al iniciar sesión si faltan datos obligatorios
- En rutas protegidas (NO en páginas públicas ni de error)

**Rutas excluidas:**
- `/` (inicio)
- `/login-form`
- `/register-form`
- `/view-rol`
- Página 404

**Campos obligatorios verificados:**
1. Nombre completo
2. Teléfono
3. Biografía

**Funcionamiento:**
1. Al cargar vista protegida: Verifica en Firestore
2. Si `profileCompleted: false` o faltan campos:
   - Muestra banner superior con gradiente morado
   - Lista campos faltantes en color dorado
3. **Botón "Completar ahora":**
   - Navega a `/view-config`
   - Scroll automático al formulario
4. **Botón "Más tarde":**
   - Oculta banner
   - Guarda en `sessionStorage`
   - No vuelve a aparecer en esta sesión
5. Al completar perfil:
   - Banner desaparece permanentemente
   - Marca `profileCompleted: true` en Firestore

---

## 🔒 Sistema de Rutas Protegidas

### Funcionamiento General

**Componente:** `<ProtectedRoute>`

**Validaciones:**
1. **Usuario autenticado:**
   - Verifica `localStorage.userId`
   - Si NO existe → Redirige a `/login-form`

2. **Rol requerido:**
   - Verifica `localStorage.userRole`
   - Si no coincide → Redirige a vista apropiada
   - Excepciones: `/view-rol` permite sin rol

3. **Redirecciones automáticas:**
   - Sin autenticación → `/login-form`
   - Sin rol → `/view-rol`
   - Rol incorrecto → Vista de su rol

### Matriz de Acceso

| Ruta | Público | Autenticado | Estudiante | Profesor |
|------|---------|-------------|------------|----------|
| `/` | ✅ | ✅ | ✅ | ✅ |
| `/login-form` | ✅ | ✅ | ✅ | ✅ |
| `/register-form` | ✅ | ✅ | ✅ | ✅ |
| `/view-rol` | ❌ | ✅ (sin rol) | ✅ | ✅ |
| `/view-students` | ❌ | ❌ | ✅ | ❌ |
| `/view-teachers` | ❌ | ❌ | ❌ | ✅ |
| `/view-new-course` | ❌ | ❌ | ✅ | ❌ |
| `/view-cursos` | ❌ | ❌ | ❌ | ✅ |
| `/aula-virtual` | ❌ | ❌ | ❌ | ✅ |
| `/view-config` | ❌ | ✅ | ✅ | ✅ |
| `/view-activity` | ❌ | ✅ | ✅ | ✅ |
| `/view-convocatorias` | ❌ | ✅ | ✅ | ✅ |
| `/view-foro` | ❌ | ✅ | ✅ | ✅ |
| `/detalle-curso/:id` | ❌ | ✅ | ✅ (inscrito) | ✅ (creador) |

---

## 🎨 Paleta de Colores del Sistema

### Colores Principales
- **Turquesa Principal:** `#36c2b3`
- **Turquesa Oscuro:** `#2aa595`
- **Negro Oscuro:** `#1c1c1e`
- **Gris Medio:** `#282828`
- **Texto Claro:** `#ffffff`
- **Texto Gris:** `#d3d3d3`

### Estados y Badges
- 🟢 **Activo/Aceptado:** `#10b981`
- 🟡 **Pendiente/Advertencia:** `#f59e0b`
- 🔴 **Rechazado/Error:** `#ef4444`
- 🔵 **Información:** `#3b82f6`
- 🟣 **Duda/Especial:** `#8b5cf6`

---

## 📱 Responsive Design

Toda la aplicación es **totalmente responsive** con breakpoints:

- **Desktop:** > 1024px (vista completa)
- **Tablet:** 768px - 1024px (sidebar colapsable)
- **Mobile:** < 768px (menú hamburguesa)

**Adaptaciones Mobile:**
- Sidebar se convierte en menú lateral deslizable
- Tarjetas en columna única
- Botones de tamaño completo
- Formularios apilados verticalmente
- Tablas con scroll horizontal

---

## ⌨️ Atajos de Teclado

_(Funcionalidad planificada)_

- `Ctrl + K`: Búsqueda global
- `Ctrl + N`: Nuevo tema en foro
- `Escape`: Cerrar modal
- `/`: Focus en búsqueda

---

## 🔧 Solución de Problemas Comunes

### No puedo iniciar sesión
1. Verifica tu correo y contraseña
2. Asegúrate de estar registrado
3. Revisa tu conexión a internet
4. Limpia caché del navegador

### No veo mis cursos
1. Verifica que estés inscrito
2. Revisa que el curso esté activo
3. Confirma tu rol (estudiante/profesor)
4. Actualiza la página (F5)

### Error al subir archivos
1. Verifica el tamaño (máx 10MB)
2. Formatos permitidos: PDF, DOC, ZIP, imágenes
3. Revisa tu conexión
4. Intenta con otro navegador

### La notificación de perfil no desaparece
1. Ve a Configuración (`/view-config`)
2. Completa los 3 campos obligatorios:
   - Nombre completo
   - Teléfono
   - Biografía
3. Click en "Guardar Cambios"
4. Espera confirmación de éxito

---

## 📞 Soporte

Para ayuda adicional, contacta a los desarrolladores:
- **Email:** (disponible en sección Contacto)
- **Portafolio:** https://danielsteve18.github.io/Portafolio/

---

**Última actualización:** 13 de noviembre de 2025
**Versión:** 1.0.0

