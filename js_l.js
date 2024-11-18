class TouchDown extends MouseTracker{

    constructor() {
                super();
                this.__handleTouch = this.__handleTouch.bind(this);
                this.works = false
        }


    __handleTouch(event) {
        const touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;
        console.log(`this.mouseX ${this.mouseX}, ${this.mouseY}`)
    }



    startEvents() {
                
                this.works = true
                document.addEventListener('touchmove', this.__handleTouch, { passive: false });                
                console.log('startEvents() Запущен')
        }

        // Останавливаем отслеживание событий
    stopEvents() {

                this.works = false
                document.removeEventListener('touchmove', this.__handleTouch, { passive: false });                
                this.mouseX = null;
                this.mouseY = null;
        }

    getPos(){
        return [this.mouseX, this.mouseY, this.works]
    }



}

elem = document.querySelector('.pad-block')

let x = new TouchDown()

let boundStartEvents = (elem) => {
    x.startEvents(elem)
    console.log('Вошли в elem')
}

elem.addEventListener('touchstart', boundStartEvents, { passive: false })





document.addEventListener('touchend', (event) => {

            console.log('Отпустили палец')
            console.log(`if x.getPos[2] == true ${x.getPos()[2]}`)
            if (x.getPos()[2] == true) {
                console.log('x.getPos[2] == true')
                elem.removeEventListener('touchstart', boundStartEvents)
                x.stopEvents()

            }
        

        }   
    )

