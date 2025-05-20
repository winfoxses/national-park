// Фильтрация парков
document.addEventListener('DOMContentLoaded', () => {
    const regionFilter = document.getElementById('region-filter');
    const yearFilter = document.getElementById('year-filter');
    const yearValue = document.getElementById('year-value');
    const parks = document.querySelectorAll('.park-card');

    // Обновление значения года
    yearFilter.addEventListener('input', () => {
        yearValue.textContent = `1872-${yearFilter.value}`;
        filterParks();
    });

    // Фильтрация по региону
    regionFilter.addEventListener('change', filterParks);

   // В parks.js, обновленная функция filterParks
function filterParks() {
    const region = regionFilter.value;
    const year = yearFilter.value;
    const type = document.getElementById('type-filter').value;

    parks.forEach(park => {
        const parkRegion = park.getAttribute('data-region');
        const parkYear = parseInt(park.getAttribute('data-year'));
        const parkType = park.getAttribute('data-type');

        const regionMatch = region === 'all' || parkRegion === region;
        const yearMatch = parkYear <= year;
        const typeMatch = type === 'all' || parkType === type;

        if (regionMatch && yearMatch && typeMatch) {
            park.style.display = 'block';
        } else {
            park.style.display = 'none';
        }
    });
}
function generateParkId(name) {
    return name.toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-zа-яё0-9-]/g, '');
}

// Обработчики для кнопок "Открыть досье"
    const buttons = document.querySelectorAll('.archive-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parkCard = this.closest('.park-card');
            const parkName = parkCard.querySelector('h2').textContent;
            const parkId = generateParkId(parkName);
            
            // Переходим на страницу фото с параметром парка
            window.location.href = `photos.html?park=${parkId}`;
        });
    });

    // Инициализация карты (используем Leaflet.js)
    const map = L.map('park-map').setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; OpenTopoMap'
    }).addTo(map);

    // Добавляем маркеры для парков
    const parksData = [
        {name: "Йеллоустон", coords: [44.4280, -110.5885], year: 1872},
        {name: "Гранд-Каньон", coords: [36.1069, -112.1129], year: 1919}
        // Добавьте другие парки
    ];

    parksData.forEach(park => {
        const iconColor = park.year < 1900 ? '#c9a66b' : '#7a7a7a';
        const icon = L.divIcon({
            className: 'park-marker',
            html: `<div style="background:${iconColor}"></div>`,
            iconSize: [15, 15]
        });

        L.marker(park.coords, {icon: icon})
            .addTo(map)
            .bindPopup(`<b>${park.name}</b><br>Основан: ${park.year}`);
    });
});