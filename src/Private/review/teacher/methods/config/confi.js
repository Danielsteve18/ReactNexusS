// Módulo para configuración del perfil
// Este archivo maneja la lógica de configuración del profesor

export function initConfig() {
    console.log('Módulo de configuración inicializado');
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initConfig();
    });
}
