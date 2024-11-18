class EventManager {
    constructor() {
        this.eventListeners = []; // Массив для хранения всех добавленных обработчиков
    }

    // Метод для добавления события
    addEvent(element, eventType, callback, options) {
        element.addEventListener(eventType, callback, options);
        this.eventListeners.push({ element, eventType, callback, options });
    }

    // Метод для удаления всех событий
    removeAllEvents() {
    	console.log('Удаление всех элементов')
        this.eventListeners.forEach(listener => {
            listener.element.removeEventListener(listener.eventType, listener.callback, listener.options);
        });
        this.eventListeners = []; // Очищаем массив
    }
}

// Пример использования:
const manager = new EventManager();

// Добавляем события
const button = document.querySelector('.pad-block');
manager.addEvent(button, 'click', () => { console.log('Button clicked!') });
manager.addEvent(button, 'mouseenter', () => { console.log('Mouse entered button!') });

// Удаляем все события
let x = manager.removeAllEvents.bind(manager);



