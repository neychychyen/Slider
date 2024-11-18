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
				this.differenceY
				this.differenceX

				this.__eventFunctionDown = this.__eventFunctionDown.bind(this);
				this.__eventFunctionUp = this.__eventFunctionUp.bind(this);
				
		}

	getMousePosition() {
				console.log('Пошла жара')
				console.log(super.getMousePosition())
		}

	__eventFunctionDown(event){
					this.myMouseTracker = new MouseTracker()
					this.myMouseTracker.startEvents()
					console.log('mousedown')
					this.intervalId = setInterval(() => {
						if (this.myMouseTracker == null) {
				            clearInterval(this.intervalId); // Остановка таймера, если myMouseTracker больше не существует
				            return;
				        }



						let {x, y} = this.myMouseTracker.getMousePosition()
						console.log(`============================================================================`)
						console.log(`getMousePosition(): ${x}, ${y}`)

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
								this.differenceY = this.mouseYNew - this.mouseY
								this.differenceX = this.mouseXNew - this.mouseX
								console.log(` {this.differenceX}, {this.differenceY} ${this.differenceX}, y ${this.differenceY}, `)
								console.log(`При x ${this.mouseX }, y ${this.mouseY}, x ${this.mouseXNew }, y ${this.mouseYNew}, `)

								this.mouseX = this.mouseXNew
								this.mouseY = this.mouseYNew
								this.mouseXNew = x;
								this.mouseYNew = y;
															}
						}

					},200)

	}

	__eventFunctionUp(event){
				setTimeout(() => {
					console.log('mouseup')
					this.myMouseTracker.stopEvents()
					this.myMouseTracker = null
					clearInterval(this.intervalId);


				}, 250
					)
					

	}

	startEvents() {

				document.addEventListener('mousedown', this.__eventFunctionDown);

				document.addEventListener('mouseup', this.__eventFunctionUp);
		}

		// Останавливаем отслеживание событий
	stopEvents() {
				document.removeEventListener('mousedown', this.__eventFunctionDown);

				document.removeEventListener('mouseup', this.__eventFunctionUp);
		}

	difference(){
		let work
		if (this.myMouseTracker == null || this.mouseXNew == null){
			work = false
		}
		else {
			work = true
		}

		return [this.differenceX, this.differenceY, work];
	}



}


class Slider{

		constructor(content, nested) {
				this.content = content;
				this.nested = nested;

				this.LeftMost = 5
				this.bias = 40 // Отклонение для правого края


				this.mymouseTracker = new MouseTracker();
				this.mouseDown = null;
				

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

								this.mouseDown = new MouseDown()
								this.mouseDown.startEvents()

								this.mymouseTracker.startEvents()
								let intervalMainId = setInterval(() => { 

												let {x, y} = this.getMousePosition()
												let contentWidth = this.content.offsetWidth;
												// Получаем текущую позицию мыши относительно начала элемента
												let mouseX = x - this.content.getBoundingClientRect().left;
												// Объявляем переменную intervalId за пределами условий, чтобы она была доступна для clearInterval()
												let width = window.innerWidth * 0.05;

												let mouseDownRes = this.mouseDown.difference()
												if (mouseDownRes[2] == true) {
													this.addToLeft(mouseDownRes[0])
												}
					

												//Если мышь в 0-1% от ширины
												else if (mouseX < contentWidth * 0.01) {
																this.addToLeft(1*width);
																																														} 

												//Если мышь в 99-100% от ширины
												else if (mouseX > contentWidth * 0.98) {
																this.addToLeft(-1*width);

												
												//this.addToLeft(x)
																																																				}

								}, 1);


				this.content.addEventListener('mouseleave', () => {

								if (this.mouseDown != null) {
									this.mouseDown.stopEvents()
									this.mymouseTracker.stopEvents()
									this.mouseDown = null;
								}
								
								
								clearInterval(intervalMainId);  // Останавливаем setInterval
								
				});

		});
		}



}


const content = document.querySelector('.content');
const nested = document.querySelector('.nested');



MenuSlider = new Slider(content, nested)


MenuSlider.mousemove()





