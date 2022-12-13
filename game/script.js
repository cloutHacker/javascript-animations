const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let noBlocks = window.prompt('How many enemies do you want')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
let blockArray = [];

class Score {
    constructor() {
        this.score = 0;
    }
    grade(grade) {
        ctx.fillStyle = 'white'
        ctx.font = "25px Arial"
        let score = "Score:" + grade
        ctx.textAlign = "start"
        ctx.fillText(score, canvas.width - 150, 20)
    }

}

class Character {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.time = 1;
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.update()
    }
    update() {
        window.addEventListener('keydown', e => {
            this.changeCord(e)
            this.time += 20;
        })
        this.time = 1;
    }
    changeCord(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            //up arrow
            if (this.y > this.height) {
                this.y -= this.height / this.time
            }
        }
        else if (e.keyCode == '40') {
            //down arrow
            if ((this.y + this.height) < canvas.height) {
                this.y += this.height / this.time
            }
        }
        else if (e.keyCode == '37') {
            //left arrow
            if (this.x > this.width) {
                this.x -= this.width / this.time
            }
        }
        else if (e.keyCode == '39') {
            //right arrow
            if ((this.x + this.width * 2) < canvas.width) {
                this.x += this.width / this.time
            }
        }

    }
    gameOver() {
        ctx.fillStyle = this.color
        ctx.textAlign = "center"
        ctx.font = canvas.width / 15 + "px Arial"
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
}
let charWidth = 50;
let charHeight = 100;
let charX = canvas.width / 2 - charWidth / 2
let charY = canvas.height - charHeight;
let color = `hsl(${Math.random() * 360}, 100%,50%)`
let character = new Character(charX, charY, charWidth, charHeight, color)

class Block {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.speed = 1
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.stroke()
    }
    update() {
        if (this.y >= canvas.height) {
            this.y = -this.height;
            this.x = Math.random() * canvas.width
            this.color = `hsl(${Math.random() * 360}, 100%,50%)`
            if (this.speed < 12) {
                this.speed += (Math.random() * 1.5);
            }
        } else {
            this.y += this.speed;
        }
    }
    detectHit() {
        if (
            this.x < character.x && (this.x + this.width) >= character.x && (this.y + this.height) >= character.y && (character.y + character.height) >= (this.y + this.height) ||
            this.x < character.x && (this.x + this.width) > (character.x + character.width) && (this.y + this.height) >= character.y && (character.y + character.height) >= (this.y + this.height) ||
            this.x > character.x && (character.x + character.width) > this.x && (this.y + this.height) >= character.y && (character.y + character.height) >= (this.y + this.height) ||
            // this.x <= character.x && (this.x + this.width) >= character.x &&  this.y >=  (character.y + character.height)||
            this.x === character.x && (this.x + this.width) === (character.x + character.width) && (this.y + this.height) >= character.y && (character.y + character.height) >= (this.y + this.height)
        ) {

            return true;
        }
        return false;
    }

}

class Game {
    constructor() {
        this.fillBlocks()
    }
    fillBlocks() {
        for (let i = 0; i < noBlocks; i++) {
            let x = Math.random() * canvas.width
            let y = Math.random() * (canvas.height / 1.5)
            let width = character.width * (Math.floor(Math.random() * 3) + 1);
            let height = character.height;
            let color = `hsl(${Math.random() * 360}, 100%, 50%)`
            blockArray.push(new Block(x, y, width, height, color))
        }

    }
    drawBlocks() {
        for (let block of blockArray) {
            block.draw()
            block.update()
        }
    }
}
let game = new Game()
let score = new Score()
let grade = 0;
function animate() {
    let color = 'rgba(0,0,0,1)'
    let over = false;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let block of blockArray) {
        if (block.detectHit() === true) {
            over = true;
            break;
        }
    }
    if (over === true) {
        character.gameOver()
        color = ''
        character.draw()
        game.drawBlocks()
        score.grade(Math.floor(grade))
    } else {
        score.grade(Math.floor(grade))
        character.draw()
        game.drawBlocks()
        grade += 0.05;
        requestAnimationFrame(animate)
    }
}
animate()