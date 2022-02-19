const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.font = "30px Arial";
context.fillText("Use AWDS controls", 10, 50);

console.log(context)