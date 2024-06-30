document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentHiddenIndices = new Array(thumbnails.length).fill(0);

    thumbnails.forEach((thumbnail, index) => {
        const thumbnailImage = thumbnail.querySelector('img');
        const hiddenImages = thumbnail.querySelectorAll('.hidden-images img');

        // Клик по миниатюре
        thumbnailImage.addEventListener('click', function() {
            mainImage.src = thumbnailImage.src;
        });

        // Прокрутка колесика мыши
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

        // Клик по скрытым изображениям
        hiddenImages.forEach(hiddenImage => {
            hiddenImage.addEventListener('click', function() {
                mainImage.src = hiddenImage.src;
            });
        });
    });
});
