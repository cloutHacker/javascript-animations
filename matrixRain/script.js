const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const text = "CLOUT HACKER"
canvas.width = window.innerWidth
canvas.height = window.innerHeight


let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, "red")
gradient.addColorStop(0.2, "yellow")
gradient.addColorStop(0.4, "green")
gradient.addColorStop(0.6, "cyan")
gradient.addColorStop(0.8, "blue")
gradient.addColorStop(1, "magenta")
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {

        this.characters = '0123456789!@#$%^&*()":<>?/[;],.{}+=~-_ABCDEFGHIJKLMNOPQRSTUVWXYZ^©®€';
        this.x = x
        this.y = y
        this.fontSize = fontSize;
        this.text = ''
        this.canvasHeight = canvasHeight
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillStyle = gradient
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.87) {
            this.y = 0
        } else {
            this.y++;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontSize = 25
        this.colums = this.canvasWidth / this.fontSize
        this.symbols = [];
        this.initialize();
    }
    initialize() {
        for (let i = 0; i < this.colums; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
        }

    }
    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.colums = this.canvasWidth / this.fontSize
        this.symbols = []
        this.initialize()
    }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0
const fps = 160
const nextFrame = 1000 / fps
let timer = 0

function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp

    if (timer > nextFrame) {
        ctx.font = "120px Arial"
        ctx.textSpacing = "5px"
        ctx.textAlign = "center"
        ctx.fillText(text, canvas.width / 2 , canvas.height / 2)
        ctx.strokeText(text, canvas.width / 2 - 5, canvas.height / 2)
        ctx.alignText = "center"
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = effect.fontSize + 'px monospace'
        effect.symbols.forEach(symbol => symbol.draw(ctx))
    } else {
        timer += deltaTime
    }
    
    requestAnimationFrame(animate)
}

animate(0)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    effect.resize(canvas.width, canvas.height)
})
