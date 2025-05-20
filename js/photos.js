document.addEventListener('DOMContentLoaded', () => {
    // Данные о парках и их фотографиях
    const parksData = {
        'Yellowstone': {
            name: 'Yellowstone',
            photos: [
                {url: 'images/photos/yellowstone3.jpg', caption: 'Yellowstone Entrance'},
                {url: 'images/photos/yellowstone4.jpg', caption: 'Yellowstone Geysers'},
                {url: 'images/photos/yellowstone.jpg', caption: 'Geyser Eruption'},
            ]
        },
        'Yosemite': {
            name: 'Yosemite',
            photos: [
                {url: 'images/photos/yosemite1.jpg', caption: 'Yosemite Valley'},
                {url: 'images/photos/yosemite.jpg', caption: 'Yosemite Valley Mountain'},
                {url: 'images/photos/yosemite2.jpg', caption: 'The Misty Valley'},
            ]
        },
        'The Grand Canyon': {
            name: 'The Grand Canyon',
            photos: [
                {url: 'images/photos/grand-canyon.jpg', caption: 'Canyon at dawn'},
                {url: 'images/photos/grand-canyon1.jpg', caption: 'Canyon view'},
                {url: 'images/photos/grand-canyon2.jpg', caption: 'Grand Canyon view from the cliffs'},
            ]
        },
        'Death Valley': {
            name: 'Death Valley',
            photos: [
                {url: 'images/photos/death.jpg', caption: 'Dawn in the valley'},
                {url: 'images/photos/death1.jpeg', caption: 'Moving stones'},
                {url: 'images/photos/death2.jpg', caption: 'Relief of the valley'},
            ]
        },
        'Rocky Mountain': {
            name: 'Rocky Mountain',
            photos: [
                {url: 'images/photos/rocky.jpg', caption: 'View of the mountain from the ground'},
                {url: 'images/photos/rocky1.jpg', caption: 'The mountain at sunset'},
                {url: 'images/photos/rocky2.jpg', caption: 'Aerial view of the mountain'},
            ]
        },
        'Glacier': {
            name: 'Glacier',
            photos: [
                {url: 'images/photos/glacer.jpg', caption: 'Iceberg shores'},
                {url: 'images/photos/glacer1.jpg', caption: 'The Vast Glacier Valley'},
                {url: 'images/photos/glacer2.jpg', caption: 'Snow caps of the mountains'},
            ]
        },
        'Zion': {
            name: 'Zion',
            photos: [
                {url: 'images/photos/zion.jpg', caption: 'Angelic Descent'},
                {url: 'images/photos/zion1.jpg', caption: 'Mount Troni'},
                {url: 'images/photos/zion2.jpg', caption: 'The overall landscape'},
            ]
        },
        'Arches': {
            name: 'Arches',
            photos: [
                {url: 'images/photos/arche.jpg', caption: 'Arch overlooking the plain'},
                {url: 'images/photos/arche1.jpg', caption: 'Landscape arch'},
                {url: 'images/photos/arche2.jpeg', caption: 'View of the park through the arch'},
            ]
        },
        'The Everglades': {
            name: 'The Everglades',
            photos: [
                {url: 'images/photos/ever.jpg', caption: 'River in the Everglades'},
                {url: 'images/photos/ever1.jpeg', caption: 'Local flora'},
                {url: 'images/photos/ever2.jpg', caption: 'Jungle Swamps'},
            ]
        },
        'Acadia': {
            name: 'Acadia',
            photos: [
                {url: 'images/photos/akad.jpeg', caption: 'View of the Gulf of St. Lawrence'},
                {url: 'images/photos/akad1.jpg', caption: 'Rocky shores'},
                {url: 'images/photos/akad2.jpg', caption: 'Wild forests of the park'},
            ]
        },
        'Denali': {
            name: 'Denali',
            photos: [
                {url: 'images/photos/den.jpg', caption: 'The road to the park'},
                {url: 'images/photos/den1.jpg', caption: 'The mountain in magnification'},
                {url: 'images/photos/den2.jpg', caption: 'A mountain in the distance'},
            ]
        },
        'New River Gorge': {
            name: 'New River Gorge',
            photos: [
                {url: 'images/photos/new.jpg', caption: 'New River Gorge Park Bridge'},
                {url: 'images/photos/new1.jpg', caption: 'Haze under the bridge'},
                {url: 'images/photos/new2.jpg', caption: 'Landscape above the park'},
            ]
        },
        // Добавьте другие парки по аналогии
    };

    const tabButtons = document.querySelector('.tab-buttons');
    const tabContent = document.querySelector('.tab-content');
    
    // Создаем кнопки для каждого парка
    Object.keys(parksData).forEach(parkId => {
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.textContent = parksData[parkId].name;
        button.dataset.park = parkId;
        
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            // Загружаем фотографии парка
            loadParkPhotos(parkId);
        });
        
        tabButtons.appendChild(button);
    });
    
    // Функция загрузки фотографий парка
    function loadParkPhotos(parkId) {
    const park = parksData[parkId];
    
    if (!park) {
        tabContent.innerHTML = '<div class="error-message">Фотографии для этого парка не найдены</div>';
        return;
    }
    
    const gallery = document.createElement('div');
    gallery.className = 'photo-gallery';
    
    park.photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.caption;
        img.loading = 'lazy';
        
        // Добавляем обработчик onload
        img.onload = function() {
            photoItem.classList.add('loaded');
        };
        
        // Обработчик ошибки загрузки
        img.onerror = function() {
            photoItem.innerHTML = `<div class="error-message">Не удалось загрузить: ${photo.url}</div>`;
            photoItem.style.backgroundColor = 'var(--archive-paper)';
            photoItem.style.display = 'flex';
            photoItem.style.alignItems = 'center';
            photoItem.style.justifyContent = 'center';
            photoItem.style.color = 'var(--accent-gold)';
        };
        
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = photo.caption;
        
        photoItem.appendChild(img);
        photoItem.appendChild(caption);
        gallery.appendChild(photoItem);
    });
    
    // Очищаем содержимое и добавляем новую галерею
    tabContent.innerHTML = '';
    tabContent.appendChild(gallery);
}
    
    // Проверяем параметры URL для автоматической загрузки парка
    const urlParams = new URLSearchParams(window.location.search);
    const parkParam = urlParams.get('park');
    
    if (parkParam) {
        // Находим кнопку нужного парка и имитируем клик
        const normalizedParkParam = parkParam.toLowerCase().replace(/-/g, ' ');
        const parkEntry = Object.entries(parksData).find(
            ([id, data]) => data.name.toLowerCase() === normalizedParkParam
        );
        
        if (parkEntry) {
            const [parkId, _] = parkEntry;
            const button = document.querySelector(`.tab-button[data-park="${parkId}"]`);
            if (button) {
                button.click();
            }
        } else {
            tabContent.innerHTML = '<div class="error-message">Парк не найден в базе данных</div>';
        }
    }
});
