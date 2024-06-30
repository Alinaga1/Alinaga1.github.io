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
            let startX;
            let startY;
            let isSwiping = false;

            thumbnail.addEventListener('touchstart', function(event) {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                isSwiping = true;
            });

            thumbnail.addEventListener('touchmove', function(event) {
                if (!isSwiping) return;

                let endX = event.touches[0].clientX;
                let endY = event.touches[0].clientY;
                let diffX = startX - endX;
                let diffY = startY - endY;

                // Проверка, что свайп горизонтальный
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    event.preventDefault();
                    if (diffX > 50) {
                        // Свайп влево
                        currentHiddenIndices[index] = (currentHiddenIndices[index] + 1) % hiddenImages.length;
                        thumbnailImage.src = hiddenImages[currentHiddenIndices[index]].src;
                        isSwiping = false;
                    } else if (diffX < -50) {
                        // Свайп вправо
                        currentHiddenIndices[index] = (currentHiddenIndices[index] - 1 + hiddenImages.length) % hiddenImages.length;
                        thumbnailImage.src = hiddenImages[currentHiddenIndices[index]].src;
                        isSwiping = false;
                    }
                }
            });

            thumbnail.addEventListener('touchend', function() {
                isSwiping = false;
            });
        } else {
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
