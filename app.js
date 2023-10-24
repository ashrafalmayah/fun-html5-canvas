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

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    [lastX, lastY] = [e.clientX, e.clientY];
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

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    const touch = e.touches[0];
    draw(touch);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    draw(touch);
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
    ctx.lineWidth = 1;
});