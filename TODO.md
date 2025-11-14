# TODO - Nexus Platform

## 📋 Funcionalidades Faltantes

### 🔴 Prioridad Alta

#### 1. Notificaciones
- [ ] Sistema de notificaciones en tiempo real
- [ ] Badge de contador en menú lateral
- [ ] Notificar cuando:
  - Te aceptan en convocatoria
  - Nueva tarea asignada
  - Tarea calificada
  - Nuevo contenido en curso
  - Clase virtual próxima

#### 2. Perfil de Usuario
- [ ] Página de perfil completa
- [ ] Editar nombre, email
- [ ] Subir avatar/foto
- [ ] Cambiar contraseña
- [ ] Ver historial de actividad

#### 3. Foros Mejorados
- [ ] Tiempo real con listeners de Firebase
- [ ] Hilos de conversación
- [ ] Reacciones a mensajes (like, útil)
- [ ] Búsqueda en mensajes
- [ ] Notificaciones de nuevos mensajes
- [ ] Archivos adjuntos

### 🟡 Prioridad Media

#### 4. Certificados
- [ ] Generar certificado al completar curso 100%
- [ ] PDF descargable
- [ ] Código QR de verificación
- [ ] Galería de certificados en perfil

#### 5. Calendario
- [ ] Vista de calendario mensual
- [ ] Mostrar fechas límite de tareas
- [ ] Horarios de clases virtuales
- [ ] Eventos de convocatorias
- [ ] Recordatorios

#### 6. Reportes del Profesor
- [ ] Dashboard con estadísticas
- [ ] Gráficos de progreso del curso
- [ ] Lista de estudiantes con bajo rendimiento
- [ ] Estadísticas de entregas
- [ ] Exportar a PDF/Excel
- [ ] Comparativa entre cursos

#### 7. Sistema de Exámenes
- [ ] Crear exámenes con preguntas
- [ ] Tipos: opción múltiple, verdadero/falso, respuesta corta
- [ ] Límite de tiempo
- [ ] Calificación automática
- [ ] Banco de preguntas reutilizables
- [ ] Ver intentos del estudiante

#### 8. Upload de Archivos
- [ ] Firebase Storage configuración
- [ ] Subir imágenes para cursos
- [ ] Material de apoyo en lecciones
- [ ] Avatares de usuario
- [ ] Límite de tamaño y tipos permitidos

### 🟢 Prioridad Baja

#### 9. Gamificación
- [ ] Sistema de puntos XP
- [ ] Badges por logros:
  - Primera tarea entregada
  - 5 tareas perfectas
  - Curso completado
  - Participación en foros
- [ ] Niveles de experiencia
- [ ] Tabla de clasificación por curso
- [ ] Recompensas por racha de estudio

#### 10. Chat Privado
- [ ] Chat 1:1 profesor-estudiante
- [ ] Tiempo real con Firebase
- [ ] Indicador de "escribiendo..."
- [ ] Historial de conversaciones
- [ ] Notificaciones de mensajes nuevos

#### 11. Grabaciones de Clases
- [ ] Enlaces a videos en YouTube
- [ ] Enlaces a grabaciones en Drive
- [ ] Organizar por fecha
- [ ] Marcar como visto
- [ ] Tiempo de reproducción

#### 12. Modo Offline
- [ ] Service Worker
- [ ] Cache de contenido
- [ ] Sincronización posterior
- [ ] Indicador de estado offline

#### 13. Temas Visuales
- [ ] Modo oscuro
- [ ] Modo claro
- [ ] Selector en configuración
- [ ] Persistencia de preferencia

---

## 🔧 Mejoras Técnicas

### Performance
- [ ] Lazy loading de imágenes
- [ ] Paginación en listas largas
- [ ] Optimización de queries de Firebase
- [ ] Caché de datos frecuentes
- [ ] Compresión de imágenes

### Seguridad
- [ ] Validación de datos en backend
- [ ] Reglas de seguridad de Firestore
- [ ] Rate limiting
- [ ] Sanitización de inputs
- [ ] Prevención de XSS

### Testing
- [ ] Tests unitarios (Jest)
- [ ] Tests de integración
- [ ] Tests E2E (Cypress)
- [ ] Coverage > 80%

### DevOps
- [ ] CI/CD con GitHub Actions
- [ ] Deploy automático
- [ ] Monitoreo de errores (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Backup automático de Firestore

---

## 🐛 Bugs Conocidos

- [ ] Revisar comportamiento en móviles pequeños
- [ ] Validar URLs de Google Drive más estricto
- [ ] Mejorar mensajes de error
- [ ] Manejar sesión expirada
- [ ] Loading infinito si falla petición

---

## 📱 Responsive

- [ ] Probar en tablets
- [ ] Probar en móviles iOS
- [ ] Probar en móviles Android
- [ ] Menú hamburguesa en móvil
- [ ] Modales responsive

---

## 📚 Documentación

- [x] FIREBASE_SYSTEM.md actualizado
- [ ] README.md con instrucciones de instalación
- [ ] Documentación de API
- [ ] Guía de contribución
- [ ] Changelog

---

## ✅ Completado Recientemente

- [x] Sistema de postulaciones
- [x] Conversión de convocatoria a curso
- [x] Módulos y lecciones
- [x] Entregas vía Google Drive
- [x] Sistema de calificaciones
- [x] Aula Virtual
- [x] Dashboard de actividades pendientes
- [x] Tracking de progreso

---

**Última actualización:** 13 de noviembre de 2025
