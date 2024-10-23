if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registrado', reg))
            .catch(err => console.warn('Error al registrar Service Worker', err));
    });
}