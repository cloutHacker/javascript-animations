const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: null,
    y: null,
    radius: 200
}
window.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
})
let hueColor = 0;
let particleArray = []

class Particle {
    constructor(x,y,color, mul) {
        this.x = x
        this.y = y
        this.color = color
        this.radius = 5;
        this.vectorX = (Math.random() * 3) - 1.5;
        this.vectorY = (Math.random() * 3) - 1.5;
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update() {
        let no = 0;
        for (let particle of particleArray) {
            let dx = particle.x - this.x
            let dy = particle.y - this.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                this.#connectParticles(particle.x, particle.y)
            }
        }
        this.moveParticles()
    }
    #connectParticles(x, y) {
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(x, y)
        ctx.closePath()
        ctx.stroke();
    }
    moveParticles() {
        if (this.x < canvas.width && this.x > 0) {
            this.x -= this.vectorX / 10
        } else {
            this.x += this.vectorX /10
        }
        if (this.y < canvas.height && this.y > 0) {
            this.y -= this.vectorY / 10
        } else {
            this.y += this.vectorY / 10
        }
    }

}

class DrawParticle {
    constructor() {
        this.#fillParticleArr()
    }
    drawParticle() {
        for (let particle of particleArray) {
            particle.draw()
            particle.update()
        }
    }
    #fillParticleArr() {
        particleArray = []
        for (let i = 0; i < 100; i++) {
            let color = `hsl(255, 100%, 50%)`
            particleArray.push(new Particle((Math.cos(i * 100) * i + i) * 10,(Math.sin(i * 100) * i + i) * 10,color))
            hueColor++;
        }
    }
}

let draw = new DrawParticle()
function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    draw.drawParticle()
    requestAnimationFrame(animate)
}
animate()