let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let resetButton = document.getElementById('resetButton');
canvas.style.backgroundColor = 'black';

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
canvas.height = windowHeight;
canvas.width = windowWidth;

class Circle {
    constructor(x, y, radius, solid, linewidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.solid = solid;
        this.linewidth = linewidth;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.linewidth || 1;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        if (this.solid) {
            ctx.fillStyle = 'blue';
            ctx.fill();
        } else {
            ctx.strokeStyle = 'blue';
            ctx.stroke();
        }
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    }
}



let circle = new Circle(200, 200, 50, true, 10);
circle.draw(ctx);

let rectangle = new Rectangle(300, 300, 100, 50);
rectangle.draw(ctx);

let triangle = new Triangle(400, 400, 450, 350, 500, 400);
triangle.draw(ctx);



let allCircles = [];

let writeText = function (text, font, px, color, x, y) {
    ctx.font = `${px}px ${font}` || '20px Arial';
    ctx.fillStyle = color || 'white';
    ctx.fillText(text, x, y);
} 

let createCircle = function (circle) {
    circle.draw(ctx);
}

for (let i = 0; i < 100; i++) {
    let x = Math.random() * windowWidth;
    let y = Math.random() * windowHeight;
    let myCircle = new Circle(x, y, 50, true, 1);
    allCircles.push(myCircle);
    createCircle(allCircles[i]);
}

resetButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allCircles = [];
    for (let i = 0; i < 100; i++) {
    let x = Math.random() * windowWidth;
    let y = Math.random() * windowHeight;
    let myCircle = new Circle(x, y, 50, true, 1);
    allCircles.push(myCircle);
    createCircle(allCircles[i]);
    }
    writeText('Sigmar Test', 'Impact',30, 'red', 50, 50);
});