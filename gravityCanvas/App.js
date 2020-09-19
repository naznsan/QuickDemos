const myCanvas = document.getElementById("myCanvas");
let context = myCanvas.getContext("2d");
let shapes = [];

function getColor() {
    const colors = ["#f79256", "#fbd1a2", "#7dcfb6", "#00b2ca", "#1d4e89"];
    return colors[Math.floor(Math.random() * 5)]
}

function Shape(shape, posX, posY, color, falling) {
    this.shape = shape;
    this.x = posX;
    this.y = posY;
    this.color = color;
    this.falling = true;
}

function gravitate(shape) {
    const gravity = 5;
    if (shape.y >= myCanvas.height - 30) {
        shape.falling = false;
    } else if (shape.y + gravity > myCanvas.height - 30) {
        shape.y += (myCanvas.height - 30 - shape.y);
    } else {
        shape.y += gravity;
    }
}

function drawShape(shape) {
    context.fillStyle = shape.color;
    if (shape.shape == "rect") {
        context.fillRect(shape.x, shape.y, 30, 30);
    }
    if (shape.falling) {
        gravitate(shape);
    }
}

function loop() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    shapes.forEach(shape => drawShape(shape));
    requestAnimationFrame(loop);
}

myCanvas.addEventListener("click", event => {
    var rect = myCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    shapes.push(new Shape("rect", x, y, getColor()));
});

requestAnimationFrame(loop);