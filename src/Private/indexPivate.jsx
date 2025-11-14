import { lazy } from 'react';

// Importaciones diferidas (lazy)
    //Pagina de estudiantes
    const Estudents = lazy(() => import('./review/student/students')); // Página de Estudiantes
    // Fin estudiantes

    //Pagina de profesores
    const Teachers = lazy(() => import('./review/teacher/teachers')); // Página de Profesores
        
        // Métodos del profesor
        const Foro = lazy(() => import('./review/teacher/methods/foro/foro')); // Gestión de foros
        const AulaVirtual = lazy(() => import('./review/teacher/AulaVirtual')); // Gestión de aulas virtuales
        const Config = lazy(() => import('./review/teacher/methods/config/configT')); // Gestión de configuración
        //fin metodos del profesor

     // Fin profesor

    // Componentes compartidos
    const Activity = lazy(() => import('./review/shared/Activity')); // Actividad
    const Convocatorias = lazy(() => import('./review/shared/Convocatorias')); // Convocatorias
    const NewCourse = lazy(() => import('./review/shared/NewCourse')); // Nuevo Curso
    const GestionCursos = lazy(() => import('./review/teacher/GestionCursos')); // Gestión de cursos (profesor)
    const DetalleCurso = lazy(() => import('./review/shared/DetalleCurso')); // Detalle del curso

// Exportaciones
export {
    Estudents,
    Teachers,
    Foro,
    AulaVirtual,
    Config,
    Activity,
    Convocatorias,
    NewCourse,
    GestionCursos,
    DetalleCurso
};




