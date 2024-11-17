// Обработчик смещения мыши

class Events{
	constructor(){

	}

	startEvents(){

	}

	stopEvents() {

		}
}



class MouseTracker extends Events{
		constructor() {
				super()
				this.mouseX = null;
				this.mouseY = null;

				this.__handleMouse = this.__handleMouse.bind(this);
				
		}

		startEvents() {
				document.addEventListener('mousemove', this.__handleMouse);
		}

		// Останавливаем отслеживание событий
		stopEvents() {
				document.removeEventListener('mousemove', this.__handleMouse);
		}

		// Обработчик события мыши
		__handleMouse(event) {
				this.mouseX = event.clientX; // Координата X мыши
				this.mouseY = event.clientY; // Координата Y мыши

				//console.log(this.getMousePosition());
		}

		// Функция для получения текущих координат мыши
		getMousePosition() {
				return { x: this.mouseX, y: this.mouseY };
		}
}



class MouseDown extends MouseTracker{

	constructor() {
				super();
				this.mouseXNew = null;
				this.mouseYNew = null;
				this.intervalId = null;
				this.myMouseTracker

				
		}

	getMousePosition() {
				console.log('Пошла жара')
				console.log(super.getMousePosition())
		}

	startEvents() {

				document.addEventListener('mousedown', () => {
					this.myMouseTracker = new MouseTracker()
					this.myMouseTracker.startEvents()
					this.intervalId = setInterval(() => {
						let {x, y} = this.myMouseTracker.getMousePosition()
						//console.log('mousedown')
						//console.log(`getMousePosition(): ${x}, ${y}`)

						if (x != null){
							if (this.mouseX == null){
								this.mouseX = x;
								this.mouseY = y;

							}
							else if (this.mouseXNew == null){
								this.mouseXNew = x;
								this.mouseYNew = y;
							}

							else {
								let differenceY = this.mouseYNew - this.mouseY
								let differenceX = this.mouseXNew - this.mouseX
								this.mouseX = this.mouseXNew
								this.mouseY = this.mouseYNew
								this.mouseXNew = x;
								this.mouseYNew = y;
								console.log(`Позиционирование по пиксельно x ${differenceX}, y ${differenceY}, `)
								console.log(`x ${this.mouseY }, y ${this.mouseX}, x ${this.mouseYNew }, y ${this.mouseXNew}, `)
							}
						}

					},100)

				});

				document.addEventListener('mouseup', () => {
					console.log('mouseup')
					this.myMouseTracker.stopEvents()
					this.myMouseTracker = null
					clearInterval(this.intervalId);
				});
		}

		// Останавливаем отслеживание событий
	stopEvents() {
				document.removeEventListener('mousedown', () => {
					this.__handleMouse
					this.getMousePosition
				});
		}




}


class Slider{

		constructor(content, nested) {
				this.content = content;
				this.nested = nested;

				this.LeftMost = 5
				this.bias = 40 // Отклонение для правого края


				this.mymouseTracker = new MouseTracker();
				

		}


		//Меняет style.left '.nested' на `${pixels}px`
		absolutePosition(pixels){
				//console.log('absolutePosition')
				this.nested.style.left = `${pixels}px`;
		}


		//Найти текущее style.left элемента nested
		__findCurrentLeft(){
				//console.log('__findCurrentLeft()')
				return parseInt(window.getComputedStyle(this.nested).left, 10) || 0;
		}


		//Найти максимальное style.left элемента nested 
		__findMaxLeft(){
				//console.log('__findMaxLeft()')
				let innerWidth = parseFloat(window.getComputedStyle(this.content).width)
				let barWidth = parseFloat(window.getComputedStyle(this.nested).width)

				return -1*(barWidth - innerWidth) - this.bias
		}

		//Найти к чему ближе текущая точка
		__closestNumber(n, x, y) {
				//console.log('__closestNumber')
				// Проверяем, что x меньше y, иначе меняем их местами

				if (x > y) {
								[x, y] = [y, x]; // Делаем перестановку значений
				}

				// Если n не в пределах от x до y, находим ближайшее к n
				if (n < x) {
								return x; // Если n меньше x, возвращаем x
				} else if (n > y) {
								return y; // Если n больше y, возвращаем y
				}
				return null; // Или можно вернуть n, если хотите, чтобы n оставалось в пределах диапазона
		}

		//Ответит (true/false), будет ли pixels + currentLeft в диапазоне от [min, max]
		__checkInRange(pixels){
				//console.log('__checkInRange')
				const currentLeft = this.__findCurrentLeft()

				let r = this.__findMaxLeft()
				if (currentLeft+pixels < this.LeftMost + 1 && currentLeft+pixels > r){return true}

				else {return false}
		}

		//Возвращает в позиции от и до, Вернуть в позицию? [да, к ближайщему числу] / [Нет, undefined]
		__returnInRange(pixels){
				//console.log('__returnInRange')
				if (this.__checkInRange(pixels) == false){
						return [true, this.__closestNumber(this.__findCurrentLeft() + pixels, this.LeftMost ,this.__findMaxLeft())]

				}

				else{
						return [false, undefined]
				}

		}

		//Меняет позицию, добавить при изменениях scale
		returnInRange(pixels = 0){
				//console.log('returnInRange')
				let result = this.__returnInRange(pixels);
				if (result[0]){this.absolutePosition(result[1])}
		}

		//Получить позицию мыши используя класс mouseTracker и переменную this.mymouseTracker
		getMousePosition() {
				//console.log('getMousePosition()')
				return this.mymouseTracker.getMousePosition()
		}


		// Требует пересмотра
		addToLeft(pixelsToAdd) {
		//console.log('addToLeft')
		// Получаем текущее значение left через getComputedStyle
		const currentLeft = parseInt(window.getComputedStyle(nested).left, 10) || 0;

		// Прибавляем нужное количество пикселей
		const newLeft = currentLeft + pixelsToAdd;


		if (this.__checkInRange(pixelsToAdd)){this.nested.style.left = `${newLeft}px`;}
		else {this.returnInRange(pixelsToAdd)}

		
		}

		mousemove() {
				this.content.addEventListener('mouseenter', (event) => {
								this.mymouseTracker.startEvents()
								let intervalMainId = setInterval(() => { 
												let {x, y} = this.getMousePosition()
												let contentWidth = this.content.offsetWidth;
												// Получаем текущую позицию мыши относительно начала элемента
												let mouseX = x - this.content.getBoundingClientRect().left;
												// Объявляем переменную intervalId за пределами условий, чтобы она была доступна для clearInterval()
												let width = window.innerWidth * 0.05;

												//Если мышь в 0-10% от ширины
												if (mouseX < contentWidth * 0.1) {
																this.addToLeft(1*width);
																																														} 

												//Если мышь в 90-100% от ширины
												else if (mouseX > contentWidth * 0.9) {
																this.addToLeft(-1*width);
																																																				}

								}, 100);


				this.content.addEventListener('mouseleave', () => {

								this.mymouseTracker.stopEvents()
								clearInterval(intervalMainId);  // Останавливаем setInterval
				});

		});
		}



}


const content = document.querySelector('.content');
const nested = document.querySelector('.nested');



MenuSlider = new Slider(content, nested)


MenuSlider.mousemove()


x = new MouseDown()
x.startEvents()
