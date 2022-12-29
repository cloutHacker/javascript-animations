const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let fireWorksArray = [];

class Particle {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.gen = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill()
    }
    update() {
        let interval = canvas.height / 2 + (Math.random() * (canvas.height / 2));
        let end = canvas.height * 0.3 - (Math.random() * (canvas.height * 0.1));
        if (this.y > end) {
            this.y -= interval / 100
        } else {
            this.genFireWorks();
            this.drawFireWorks();
            this.killArray();
            if (fireWorksArray.length === 0) {
                this.x = Math.random() * canvas.width
                this.y = canvas.height
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
            }
        }
    }
    drawFireWorks() {
        fireWorksArray.forEach(firework => {
            firework.draw()
            firework.update()
        })
    }
    genFireWorks() {
        if (!this.gen) {
            for (let i = 0; i < 10; i++) {
                let radius = Math.random() * 200
                fireWorksArray.push(new fireWorks(this.x, this.y, this.color, radius, 10))
            }
        }
        this.gen = true;
    }
    killArray() {
        for (let i = 0; i < fireWorksArray.length; i++) {
            if (fireWorksArray[i].radius <= 0) fireWorksArray.splice(i, 1);
        }
    }

}

class fireWorks {
    constructor(x, y, color, radius, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.size = size
        this.vectorX = (Math.random() * 3) - 1.5;
        this.vectorY = (Math.random() * 3) - 1.5;
        this.density = (Math.random() * 3) + 2;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        this.update()
    }
    update() {
        //making the fireworks go in a circular manner
        let angle = 0;
        this.x += (this.vectorX * this.density) / 10;
        this.y += (this.vectorY * this.density) / 10;
        // this.y = this.y + this.radius * Math.sin(angle);
        if (this.size >= 0) this.size -= 0.01
        angle+=0.2;
    }
}
//draws the all fireworks system

class AnimateFireWorks {
    constructor() {
        this.genParticles()
    }
    genParticles() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * canvas.width;
            let y = 100+(Math.random() * 600) + canvas.height;
            let color = `hsl(${Math.random() * 360},100%,50%)`
            particleArray.push(new Particle(x, y, color, 10))
        }
    }
    drawParticles() {
        particleArray.forEach(particle => {
            particle.draw()
            particle.update()
        });
    }

}


let fireWork = new AnimateFireWorks();
function animate() {
    ctx.fillStyle = `rgba(0,0,0,0.1)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    fireWork.drawParticles();
    requestAnimationFrame(animate);
}
animate()