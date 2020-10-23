const myCanvas = document.getElementById("myCanvas");
const rectBtn = document.getElementById("rectBtn");
const circleBtn = document.getElementById("circleBtn");
const clearBtn = document.getElementById("clearCanvas");
let context = myCanvas.getContext("2d");
let shapes = [];
let selectedShape = "rect";

function getColor() {
    const colors = ["#f79256", "#fbd1a2", "#7dcfb6", "#00b2ca", "#1d4e89"];
    return colors[Math.floor(Math.random() * 5)]
}

function Shape(shape, posX, posY, width, height, color, falling) {
    this.shape = shape;
    this.x = posX;
    this.y = posY;
    this.color = color;
    this.width = width;
    this.height = height;
    this.falling = true;
}

function gravitate(shape) {
    const gravity = 5;
    if (shape.y >= myCanvas.height - 15) {
        shape.falling = false;
    } else if (shape.y + gravity > myCanvas.height - 15) {
        shape.y += (myCanvas.height - 15 - shape.y);
    } else {
        shape.y += gravity;
    }
}

function drawShape(shape) {
    context.fillStyle = shape.color;
    if (shape.shape == "rect") {
        context.fillRect(shape.x - 15, shape.y - 15, shape.width, shape.height);
    } else if (shape.shape == "circle") {
        context.beginPath();
        // context.arc(shape.x, shape.y, 15, 0, 2 * Math.PI);
        context.ellipse(shape.x, shape.y, shape.width / 2, shape.height / 2, 0, 0, 2 * Math.PI);
        context.fill();
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

rectBtn.disabled = true;
circleBtn.disabled = false;

// myCanvas.addEventListener("click", event => {
//     var rect = myCanvas.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     shapes.push(new Shape(selectedShape, x, y, getColor()));
// });
let startX, startY;

myCanvas.addEventListener("mousedown", event => {
    var rect = myCanvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
});

myCanvas.addEventListener("mouseup", event => {
    var rect = myCanvas.getBoundingClientRect();
    var endX = event.clientX - rect.left;
    var endY = event.clientY - rect.top;
    shapes.push(new Shape(selectedShape, startX, startY, endX - startX, endY - startY, getColor()));
})

rectBtn.addEventListener("click", event => {
    selectedShape = "rect";
    rectBtn.disabled = true;
    circleBtn.disabled = false;
});

circleBtn.addEventListener("click", event => {
    selectedShape = "circle";
    rectBtn.disabled = false;
    circleBtn.disabled = true;
});

clearBtn.addEventListener("click", event => {
    shapes = [];
});

requestAnimationFrame(loop);