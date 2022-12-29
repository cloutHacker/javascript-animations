const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
//adjusting the canvas width and height on resize of the window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

let mouse = {
    x: undefined,
    y: undefined
}
let particleArray = [];

class Particle{
    constructor(color) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = 10;
        this.vX = (Math.random() * 3) - 1.5;
        this.vY = (Math.random() * 3) - 1.5;
        this.density = (Math.random() * 20) + 10;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update() {
        let forceX = this.vX * this.density;
        let forceY = this.vY * this.density;
        this.x += forceX / 5;
        this.y += forceY / 5;
        this.size = this.size > 0.04 ? this.size - 0.04 : 0;
    }
}

let fillParticle = () => {
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`
    for (let i = 0; i< 10; i++) {
        particleArray.push(new Particle(color))
    }
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
    fillParticle()
})
window.addEventListener('click', e => {
    mouse.x = e.x
    mouse.y = e.y
    fillParticle()
})

function drawParticles() {
    particleArray.forEach(particle => {
        particle.draw()
        particle.update()
    })
}
function killParticles() {
    //remove particles with size equal to zero
    particleArray.forEach((particle, index) => {
        if (particle.size === 0) particleArray.splice(index, 1)
    })
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0, 0.2)'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    drawParticles()
    killParticles()
    requestAnimationFrame(animate)
}
animate()