// Módulo para cambio de contraseña
// Este archivo maneja el cambio de contraseña del profesor

export function initPasswordChange() {
    console.log('Módulo de cambio de contraseña inicializado');
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initPasswordChange();
    });
}
