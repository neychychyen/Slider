class IntervalManager {
  constructor() {
    this.intervals = [];  // Массив для хранения всех идентификаторов интервалов
  }

  // Метод для установки интервала
  setInterval(callback, delay) {
    const intervalId = window.setInterval(callback, delay);  // Создаем интервал
    this.intervals.push(intervalId);  // Добавляем его в массив
    return intervalId;  // Возвращаем идентификатор интервала
  }

  // Метод для очистки одного интервала
  clearSingleInterval(intervalId) {
    const index = this.intervals.indexOf(intervalId);  // Ищем идентификатор
    if (index !== -1) {
      window.clearInterval(intervalId);  // Очищаем интервал
      this.intervals.splice(index, 1);  // Удаляем идентификатор из списка
  }
    }

  // Метод для очистки всех интервалов
  clearIntervals() {
    while (this.intervals.length !== 0){
    for (let intervalId of this.intervals) {
      this.clearSingleInterval(intervalId);  // Очищаем каждый интервал
    }
  }
  }

  // Метод для получения всех текущих интервалов
  getAllIntervals() {
    return this.intervals;
  }
}

// Пример использования
const intervalManager = new IntervalManager();

// Создаем несколько интервалов
intervalManager.setInterval(() => { console.log('Interval 1'); }, 1000);
intervalManager.setInterval(() => { console.log('Interval 2'); }, 2000);
intervalManager.setInterval(() => { console.log('Interval 3'); }, 3000);
intervalManager.setInterval(() => { console.log('Interval 4'); }, 1000);
intervalManager.setInterval(() => { console.log('Interval 5'); }, 2000);
intervalManager.setInterval(() => { console.log('Interval 6'); }, 3000);

// Получаем список всех интервалов
console.log('All intervals:', intervalManager.getAllIntervals());  // Выводит [id1, id2, id3]

// Очищаем все интервалы
setTimeout(() => {
  intervalManager.clearIntervals();  // Очищаем все интервалы через 5 секунд
}, 5000);

// Проверяем список интервалов после их очистки
setTimeout(() => {
  console.log('Remaining intervals:', intervalManager.getAllIntervals());  // Выводит пустой массив []
}, 6000);
