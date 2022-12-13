const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let radius = 200
ctx.strokeStyle = "brown"
function drawClock() {
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.stroke();
}
drawClock()

function drawNumerals() {
    ctx.font = "15px Arial"
    let numerals = (Array.from(Array(13).keys())), angle = 0, numeralWidth = 0, fontHeight = 15;
    numerals.shift();
    for (let num of numerals) {
        angle = Math.PI / 6 * (num - 3)
        numeralWidth = ctx.measureText(num).width
        let startX = canvas.width / 2
        let startY = canvas.height / 2
        let endX = (radius + numeralWidth) * Math.cos(angle) + startX
        let endY = (radius + fontHeight ) * Math.sin(angle) + startY
        ctx.fillStyle = "brown"
        ctx.fillText(num, endX, endY)
    }

}
drawNumerals()