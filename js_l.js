class MouseTouchDown2 extends MouseTracker{

    constructor() {
                super();

                this.__handleMouseDown = this.__handleMouseDown.bind(this);
                this.__handleMouseUp = this.__handleMouseUp.bind(this);
                this.__handleMouse = this.__handleMouse.bind(this);
                this.__handleTouchDown = this.__handleTouchDown.bind(this);
                this.__handleTouchUp = this.__handleTouchUp.bind(this);
                this.__handleTouch = this.__handleTouch.bind(this);
        }

    __handleMouseDown(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        document.addEventListener('mousemove', this.__handleMouse);
        
    }

    __handleMouseUp(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        document.removeEventListener('mousemove', this.__handleMouse);
        
    }

    __handleMouse(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }



    __handleTouchDown(event) {
        const touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;
        document.addEventListener('touchmove', this.__handleTouch, { passive: false });
        
    }

    __handleTouchUp(event) {
        const touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;
        document.removeEventListener('touchmove', this.__handleTouch, { passive: false });
        
    }

    __handleTouch(event) {
        const touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;
    }



    startEvents() {

                document.addEventListener('mousedown', this.__handleMouseDown);
                document.addEventListener('mouseup', this.__handleMouseUp);

                document.addEventListener('touchstart', this.__handleTouch, { passive: false });                
                document.addEventListener('touchend', this.__handleTouchEnd);
        }

        // Останавливаем отслеживание событий
    stopEvents() {
                document.removeEventListener('mousedown', this.__handleMouseDown);
                document.removeEventListener('mouseup', this.__handleMouseUp);

                document.removeEventListener('touchstart', this.__handleTouch, { passive: false });                
                document.removeEventListener('touchend', this.__handleTouchEnd);
                this.mouseX = null;
                this.mouseY = null;
        }

    getPos(){
        return (this.mouseX, this.mouseY)
    }



}

