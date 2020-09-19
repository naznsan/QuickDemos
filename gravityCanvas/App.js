const myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;

let context = myCanvas.getContext("2d");

function drawRect(x, y) {
    context.fillStyle = "green";
    context.fillRect(x, y, 10, 10);
}

myCanvas.addEventListener("click", event => {
    var rect = myCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    drawRect(x, y);
});