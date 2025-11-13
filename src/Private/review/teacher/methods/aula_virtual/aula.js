// Módulo para el aula virtual
// Este archivo maneja funcionalidades adicionales del aula virtual

export function initAula() {
    console.log('Módulo de aula virtual inicializado');
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initAula();
    });
}
