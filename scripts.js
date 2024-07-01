document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentHiddenIndices = new Array(thumbnails.length).fill(0);
    let isTouchDevice = 'ontouchstart' in document.documentElement;

    thumbnails.forEach((thumbnail, index) => {
        const thumbnailImage = thumbnail.querySelector('img');
        const hiddenImages = thumbnail.querySelectorAll('.hidden-images img');

        // Клик по миниатюре
        thumbnailImage.addEventListener('click', function() {
            mainImage.src = thumbnailImage.src;
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
                    currentHiddenIndices[index] = (currentHiddenIndices[index] + 1) % hiddenImages.length;
                    thumbnailImage.src = hiddenImages[currentHiddenIndices[index]].src;
                } else if (endX - startX > 50) {
                    // Свайп вправо
                    currentHiddenIndices[index] = (currentHiddenIndices[index] - 1 + hiddenImages.length) % hiddenImages.length;
                    thumbnailImage.src = hiddenImages[currentHiddenIndices[index]].src;
                }
            });
        } else {
            // Прокрутка колесика мыши для десктопов
            thumbnail.addEventListener('wheel', function(event) {
                event.preventDefault();
                if (event.deltaY < 0) {
                    // Прокрутка вверх
                    currentHiddenIndices[index] = (currentHiddenIndices[index] - 1 + hiddenImages.length) % hiddenImages.length;
                } else {
                    // Прокрутка вниз
                    currentHiddenIndices[index] = (currentHiddenIndices[index] + 1) % hiddenImages.length;
                }
                thumbnailImage.src = hiddenImages[currentHiddenIndices[index]].src;
            });
        }

        // Клик по скрытым изображениям
        hiddenImages.forEach(hiddenImage => {
            hiddenImage.addEventListener('click', function() {
                mainImage.src = hiddenImage.src;
            });
        });
    });
});
