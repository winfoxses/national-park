document.addEventListener('DOMContentLoaded', () => {
    // Инициализация карты для New River Gorge
    if (document.getElementById('new-river-map')) {
        initNewRiverMap();
    }
// Плавное появление элементов
document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach((event, index) => {
        setTimeout(() => {
            event.style.opacity = '1';
            event.style.transform = 'translateX(0)';
        }, 200 * index);
    });

    // Имитация открытия документа
    const documents = document.querySelectorAll('.event-document');
    documents.forEach(doc => {
        doc.addEventListener('click', () => {
            const src = doc.getAttribute('data-document');
            window.open(`images/documents/${src}`, '_blank');
        });
    });
});
// Инициализация карты (используем Leaflet.js)
function initNewRiverMap() {
    const map = L.map('new-river-map').setView([38.07, -81.08], 10);
    
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; OpenTopoMap'
    }).addTo(map);

    L.marker([38.07, -81.08]).addTo(map)
        .bindPopup('New River Gorge National Park')
        .openPopup();
}

// Сравнение фото "до/после"
document.querySelectorAll('.comparison-slider').forEach(slider => {
    slider.addEventListener('mousemove', (e) => {
        const width = e.clientX - slider.getBoundingClientRect().left;
        slider.querySelector('.old-image').style.clipPath = `inset(0 ${slider.offsetWidth - width}px 0 0)`;
    });
});
});