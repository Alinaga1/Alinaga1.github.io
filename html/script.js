document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    container.addEventListener('click', () => {
        // Генерация случайного цвета в формате rgba
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, 
                                  ${Math.floor(Math.random() * 256)}, 
                                  ${Math.floor(Math.random() * 256)}, 
                                  0.26)`;
        container.style.backgroundColor = randomColor;
    });
});
