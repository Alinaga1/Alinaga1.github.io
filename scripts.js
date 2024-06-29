document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Удалить класс "active" у всех миниатюр
            thumbnails.forEach(th => th.classList.remove('active'));
            // Добавить класс "active" к текущей миниатюре
            this.classList.add('active');
            // Обновить главную картинку
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
});
