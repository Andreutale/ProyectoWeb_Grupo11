const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('activo');
});


// Cerrar el menú si se hace clic en un enlace
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('activo');
    });
});

// Cerrar el menú si la pantalla se agranda (ej. de móvil a escritorio)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('activo');
    }
});
