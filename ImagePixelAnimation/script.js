const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particleArray = []

//mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x 
    mouse.y = e.y
})

function drawImage() {
    let imageWidth = png.width
    let imageHeight = png.height
    let imageX = canvas.width / 2 - imageWidth / 2
    let imageY = canvas.height / 2 - imageHeight / 2
    const data = ctx.getImageData(imageX, imageY, imageX + imageWidth,imageY + imageHeight)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    class Particle {
        constructor(x, y, color, size) {
                this.x = x + imageX,
                this.y = y + imageY,
                this.color = color,
                this.size = 2,
                this.baseX = x + imageX,
                this.baseY = y + imageY,
                this.density = (Math.random() * 10) + 2
        }
        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath()
            ctx.fill()
        }
        update() {
            ctx.fillStyle = this.color
            //collision direction
            let dx = mouse.x - this.x
            let dy = mouse.y - this.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            let forceX = dx / distance
            let forceY = dy / distance
            //max distance where the force will be 0
            let maxDistance = 100
            let force = (maxDistance - distance) / maxDistance
            if (force < 0) force = 0
            let directionX = (forceX * force * this.density * 0.6)
            let directionY = (forceY * force * this.density * 0.6)
            if (distance < mouse.radius + this.size) {
                this.x -= directionX
                this.y -= directionY
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX
                    this.x -= dx / 20
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseX
                    this.x -= dy / 20
                }
            }
            this.draw()

        }


    }
    function init() {
        particleArray = []
        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x
                    let positionY = y
                    let interval = (y * 4) + (x * 4)
                    let color = `rgb(${data.data[interval]}, ${data.data[interval + 1]}, ${data.data[interval + 2]})`
                    particleArray.push(new Particle(positionX, positionY, color))
                }
            }
        }
    }
    function animate() {
        requestAnimationFrame(animate)
        ctx.fillStyle = "rgba(0,0,0,0.05)"
        ctx.fillRect(0, 0, innerWidth, innerHeight)
        for (i in particleArray) {
            particleArray[i].update()
        }
    }
    init()
    animate()

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        init()
    })
}
let png = new Image()
png.src = "http://127.0.0.1:5500/clouthacker.jpg"

window.addEventListener('load', e => {
    let imageWidth = png.width
    let imageHeight = png.height
    let imageX = canvas.width / 2 - imageWidth / 2
    let imageY = canvas.height / 2 - imageHeight / 2
    ctx.drawImage(png, imageX, imageY, imageWidth, imageHeight)
    drawImage()
})