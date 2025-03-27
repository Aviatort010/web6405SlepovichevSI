// Анимация броска костей
document.addEventListener('DOMContentLoaded', function()
{
    const rollButton = document.getElementById('rollButton');
    if (rollButton) {
        rollButton.addEventListener('click', () => {
            const dice = document.getElementById('dice');
            dice.style.animation = 'none';
            void dice.offsetWidth; // Триггер перезапуска анимации
            dice.style.animation = 'dice-roll 1s ease-out';
            
            // Очищаем предыдущие точки
            dice.innerHTML = '';
            
            setTimeout(() => {
                const randomValue = Math.floor(Math.random() * 6) + 1; // От 1 до 6
                createDiceDots(dice, randomValue);
            }, 1000);
        });
    }

    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const formMessage = document.getElementById('formMessage');
            
            try {
                // Используем JSONPlaceholder для имитации POST-запроса
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.textContent = 'Сообщение отправлено!';
                    formMessage.style.color = '#E7D147';
                    contactForm.reset();
                } else {
                    throw new Error('Ошибка отправки');
                }
            } catch (error) {
                formMessage.textContent = 'Ошибка: ' + error.message;
                formMessage.style.color = '#FF2E2E';
            }
        });
    }

    // Валидация email в реальном времени
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (!emailInput.checkValidity()) {
                emailInput.style.borderColor = '#FF2E2E';
            } else {
                emailInput.style.borderColor = '#E7D147';
            }
        });
    }

    // Загрузка данных для таблицы классов (пример асинхронного запроса)
    async function loadClassesData() {
        try {
            // Имитация запроса к API
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            
            const data = await response.json();
            console.log('Данные загружены:', data);
            
            // Здесь можно добавить логику заполнения таблицы
        } catch (error) {
            console.error('Ошибка:', error);
            const errorElement = document.createElement('div');
            errorElement.textContent = 'Не удалось загрузить данные';
            errorElement.style.color = '#FF2E2E';
            document.body.appendChild(errorElement);
        }
    }

    // Вызываем при загрузке страницы с классами
    if (document.querySelector('.classes-table')) {
        loadClassesData();
    }
});


// Подсветка активной страницы в навигации
function highlightCurrentPage() {
    // Получаем имя текущей страницы из URL
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.left-nav a');

    navLinks.forEach(link => {
        // Получаем имя страницы из href ссылки
        const linkPagePath = link.getAttribute('href');
        
        // Сравниваем имена страниц
        if (linkPagePath === currentPagePath || 
            (currentPagePath === 'index.html' && linkPagePath === '')) {
            link.style.backgroundColor = '#8b4513';
            link.style.color = '#ffffff';
        } else {
            link.style.backgroundColor = '';
            link.style.color = '';
        }
    });
}


// Вызываем при загрузке страницы
document.addEventListener('DOMContentLoaded', highlightCurrentPage);


// Функция для создания точек на кубике
function createDiceDots(diceElement, value) {
    diceElement.innerHTML = ''; // Очищаем кубик
    
    // Создаем контейнер для точек
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dice-dots';
    
    // Создаем точки в зависимости от значения
    for (let i = 0; i < value; i++) {
        const dot = document.createElement('div');
        dot.className = 'dice-dot';
        dotsContainer.appendChild(dot);
    }
    
    // Располагаем точки в зависимости от значения
    switch(value) {
        case 1:
            dotsContainer.classList.add('dice-one');
            break;
        case 2:
            dotsContainer.classList.add('dice-two');
            break;
        case 3:
            dotsContainer.classList.add('dice-three');
            break;
        case 4:
            dotsContainer.classList.add('dice-four');
            break;
        case 5:
            dotsContainer.classList.add('dice-five');
            break;
        case 6:
            dotsContainer.classList.add('dice-six');
            break;
    }
    
    diceElement.appendChild(dotsContainer);
}

