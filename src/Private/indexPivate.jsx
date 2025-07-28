import { lazy } from 'react';

// Importaciones diferidas (lazy)
    //Pagina de estudiantes
    const Estudents = lazy(() => import('./review/student/students')); // Página de Estudiantes
    // Fin estudiantes

    //Pagina de profesores
    const Teachers = lazy(() => import('./review/teacher/teachers')); // Página de Profesores
        
        // Métodos del profesor
        const Foro = lazy(() => import('./review/teacher/methods/foro/foro')); // Gestión de foros
        const A_virtual = lazy(() => import('./review/teacher/methods/aula_virtual/aula')); // Gestión de aulas
        const Config = lazy(() => import('./review/teacher/methods/config/configT')); // Gestión de configuración
        //fin metodos del profesor

     // Fin profesor

// Exportaciones
export {
    Estudents,
    Teachers,
    Foro,
    A_virtual,
    Config
};




