// Módulo para edición de información del perfil
// Este archivo maneja la edición de nombre y datos del profesor

export function initNameEditor() {
    console.log('Módulo de edición de nombre inicializado');
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initNameEditor();
    });
}
