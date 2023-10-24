const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#8ADA55';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;


function draw(e){
    if(!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);

    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();

    [lastX, lastY] = [e.pageX, e.pageY];
    hue++;
    if(hue >= 360) hue = 0;

    if(ctx.lineWidth <= 50) ctx.lineWidth++;

    // if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
    // direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.lineWidth = 1;
});
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.lineWidth = 1;
});
window.addEventListener('touchmove', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // Get the list of touches
    let touches = e.touches;
    
    // Iterate through the touches
    for (let i = 0; i < touches.length; i++) {
        let touch = touches[i];
        draw(touch);
    }
});
window.addEventListener('touchend', () => {
    isDrawing = false;
    ctx.lineWidth = 1;
});