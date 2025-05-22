// Прелоадер
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Кастомный курсор
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Параллакс
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.parallax-layer');
    const x = e.clientX / window.innerWidth;
    const y = e.clientX / window.innerHeight;
    
    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const xMove = x * speed * 100;
        const yMove = y * speed * 100;
        layer.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Анимация меню при скролле
const navLinks = document.querySelectorAll('.vertical-nav a');
window.addEventListener('scroll', () => {
    let fromTop = window.scrollY;
    
    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
