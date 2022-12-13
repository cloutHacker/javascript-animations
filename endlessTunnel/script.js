const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let last;
let first;
let polArr = [];
let hue = 0;
class Polygon {

    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed
        this.color = color
    }
    draw() {
        const recWidth = canvas.width / this.x
        const recHeight = canvas.height / this.y
        const codX = (canvas.width / 2) - (recWidth / 2)
        const codY = (canvas.height / 2) - (recHeight / 2)
        ctx.strokeStyle = this.color
        ctx.fillStyle = 'goldenrod'
        ctx.strokeRect(codX, codY, recWidth, recHeight)
        ctx.font = "20px Arial"
        let textX = canvas.width / 2 - 20
        let textY = canvas.height / 2 + 5
        ctx.fillText('END', textX, textY)
    }
    update() {
        if (this.x <= 0) {
            this.x = last.x
        } else {
            this.x -= this.speed
        }
        if (this.y <= 0) {
            this.y = last.y
        } else {
            this.y -= this.speed
        }
    }
    
}
class Effect {
    constructor() {
        this.fillPol()
    }
    fillPol() {
        let y = 10;
        for (let i = 1; i <= y; i += 1) {
            let colorArr = ['aqua']
            let color = colorArr[Math.floor(Math.random() * colorArr.length)]
            let polygon = new Polygon(i, i, 0.05 * 1.2, color);
            if (i === 1) first = {
                x: polygon.x,
                y: polygon.y
            }
            polArr.push(polygon)
            if (i === y) last = {
                x: polygon.x,
                y: polygon.y
            };
        }
    }
    drawPol() {
        for (let pol of polArr) {
            pol.draw()
            pol.update()
        }
    }
}
let effect = new Effect()
window.addEventListener('resize', e => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.01)'
    ctx.lineWidth = 2
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    effect.drawPol();
    requestAnimationFrame(animate)
}
animate()