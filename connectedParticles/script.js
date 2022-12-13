const canvas = document.getElementById("canvas1");
const particlesArray = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const ctx = canvas.getContext('2d')
const rad = (angle) => {
    return (angle / 180) * Math.PI
}
const mouse = {
    x: undefined,
    y: undefined
}
function drawParticles() {
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
}
window.addEventListener('click', e => {
    mouse.x = e.x;
    mouse.y = e.y
    drawParticles()
})
canvas.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
    drawParticles()
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.colour = `hsl(${hue}, 100%, 50%)`;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.05;
    }
    draw() {
        ctx.fillStyle = this.colour;
        ctx.strokeStyle = "blue"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, rad(360));
        ctx.fill()
    }
}


function handleParticles() {
    for (i in particlesArray) {
        particlesArray[i].update()
        particlesArray[i].draw()
        for (j in particlesArray) {
            const dx = particlesArray[i].x - particlesArray[j].x
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].colour
                ctx.lineWidth = particlesArray[i].size / 10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'blue'
  
    ctx.font = "120px Arial"
    ctx.textSpacing = "5px"
    ctx.fillText("CLOUT HACKER", canvas.width / 2 - 450, canvas.height / 2)
    ctx.strokeText("CLOUT HACKER", canvas.width / 2 - 460, canvas.height / 2)
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    handleParticles()
    hue += 5;
    requestAnimationFrame(animate)
}
animate()