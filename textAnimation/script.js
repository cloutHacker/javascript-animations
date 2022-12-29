const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gradient =  ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0.4, 'aqua')
gradient.addColorStop(0.2, 'green')
gradient.addColorStop(0.6, 'aquamarine')
gradient.addColorStop(0.8, 'goldenrod')
gradient.addColorStop(1, 'gold')
//starting a particles array
let particleArray = []

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
})
let wallpaper = 'EPHANTUS'
let font = 25;
ctx.fillStyle = "white"
ctx.font = font + 'px Verdana'
ctx.textAlign = "start"
let textWidth = ctx.measureText(wallpaper).width
ctx.fillText(wallpaper, (canvas.width / 2 - textWidth / 2) / 60, 40)
const textCoordinates = ctx.getImageData(0, 0, textWidth * 1.5, font * 5)

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    connect() {
        for(i in particleArray) {
            let dx = particleArray[i].x - this.x
            let dy = particleArray[i].y - this.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 15) {
                ctx.strokeStyle = gradient
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(particleArray[i].x, particleArray[i].y)
                ctx.closePath()
                ctx.stroke()
            }
        }
    }
    update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let vectorX = dx / distance
        let vectorY = dy / distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance;
        let directionX = vectorX * force * this.density;
        let directionY = vectorY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        }
        else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX
                this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY
                this.y -= dy / 10
            }
        }
        this.connect()
    }
}

function init() {
    particleArray = []
    for (let y = 0, y2 = textCoordinates.width; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 8, positionY * 10))  
            }
        }
    }
}

init()

function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (i in particleArray) {
        particleArray[i].draw()
        particleArray[i].update()
    }
    requestAnimationFrame(animate)
}
animate()
