let currentVisibleImage = "resized_images/1_02_resized.png"; // Текущий путь видимого изображения

document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentHiddenIndices = new Array(thumbnails.length).fill(0);
    let isTouchDevice = 'ontouchstart' in document.documentElement;

    thumbnails.forEach((thumbnail, index) => {
        const thumbnailImage = thumbnail.querySelector('img');
        const hiddenImages = thumbnail.querySelectorAll('.hidden-images img');

        // Функция для обновления выбранной миниатюры
        function updateSelectedThumbnail() {
            thumbnails.forEach(tn => tn.classList.remove('selected-thumbnail'));
            thumbnail.classList.add('selected-thumbnail');
        }

        // Функция для обновления изображения миниатюры и основного изображения
        function updateThumbnailImage(newIndex) {
            currentHiddenIndices[index] = newIndex;
            thumbnailImage.src = hiddenImages[newIndex].src;
            mainImage.src = hiddenImages[newIndex].src;
            currentVisibleImage = hiddenImages[newIndex].src;  // Обновляем путь текущего изображения
            updateSelectedThumbnail();
        }

        // Клик по миниатюре
        thumbnailImage.addEventListener('click', function() {
            mainImage.src = thumbnailImage.src;
            currentVisibleImage = thumbnailImage.src;  // Обновляем путь текущего изображения
            updateSelectedThumbnail();
        });

        if (isTouchDevice) {
            // Свайпы для мобильных устройств
            let startX;

            thumbnail.addEventListener('touchstart', function(event) {
                startX = event.touches[0].clientX;
            });

            thumbnail.addEventListener('touchmove', function(event) {
                event.preventDefault();
                let endX = event.touches[0].clientX;

                if (startX - endX > 50) {
                    // Свайп влево
                    let newIndex = (currentHiddenIndices[index] + 1) % hiddenImages.length;
                    updateThumbnailImage(newIndex);
                } else if (endX - startX > 50) {
                    // Свайп вправо
                    let newIndex = (currentHiddenIndices[index] - 1 + hiddenImages.length) % hiddenImages.length;
                    updateThumbnailImage(newIndex);
                }
            });
        } else {
            // Прокрутка колесика мыши для десктопов
            thumbnail.addEventListener('wheel', function(event) {
                event.preventDefault();
                if (event.deltaY < 0) {
                    // Прокрутка вверх
                    let newIndex = (currentHiddenIndices[index] - 1 + hiddenImages.length) % hiddenImages.length;
                    updateThumbnailImage(newIndex);
                } else {
                    // Прокрутка вниз
                    let newIndex = (currentHiddenIndices[index] + 1) % hiddenImages.length;
                    updateThumbnailImage(newIndex);
                }
            });
        }

        // Клик по скрытым изображениям
        hiddenImages.forEach(hiddenImage => {
            hiddenImage.addEventListener('click', function() {
                mainImage.src = hiddenImage.src;
                currentVisibleImage = hiddenImage.src;  // Обновляем путь текущего изображения
                updateSelectedThumbnail();
            });
        });
    });

    // Функция для открытия оригинала текущего видимого изображения
    window.openCurrentOriginal = function() {
        // Замена на оригинальный путь из папки "picture"
        let originalImage = currentVisibleImage.replace("resized_images", "picture").replace("_resized", "");
        window.open(originalImage, '_blank');
    };
});
