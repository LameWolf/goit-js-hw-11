const refs = {
startBtn: document.querySelector('button[data-start]'),
stopBtn: document.querySelector('button[data-stop]'),
}

const changeColor = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const color = this.getRandomHexColor();
            document.body.style.backgroundColor = color;
        }, 1000);
    
    },
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    },

    getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
},
}

refs.startBtn.addEventListener('click', () => {
    changeColor.start();
})
refs.stopBtn.addEventListener('click', () => {
    changeColor.stop();
})


