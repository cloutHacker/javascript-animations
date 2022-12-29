const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', e => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
});

let x = canvas.width / 2;
let y = canvas.height / 2;
let number = 0;
let scale = 10;
function animate() {
    let angle = number * 10;
    let radius= scale * Math.sqrt(number)
    let posX = x + radius*Math.sin(angle)
    let posY = y + radius * Math.cos(angle) 
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`
    ctx.strokeStyle = 'brown'
    ctx.beginPath()
    ctx.arc(posX,posY, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke();
    number++;
    requestAnimationFrame(animate)
}
animate()