let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let resetButton = document.getElementById('resetButton');
canvas.style.backgroundColor = 'black';

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
canvas.height = 400;
canvas.width = 400;

let FPS = 5;
let paused = true;
let canChangeDirection = true;
let highscore = localStorage.getItem("highscore") || 0;
let reset = 0;
let firstApple = false;
let appleCount = 1;
let ateFruit = false;
let growth = 1;
let amountGrown = 0;
let score = 0;
class Snake {
    constructor(fruit) {
        this.body = [{ x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 10 }];
        this.direction = "right";
        this.nextDirection = "right";
        this.length = 3;
        this.fruit = fruit;
    }

    update() {
        this.direction = this.nextDirection;
        let head = this.body[this.body.length - 1];
        let newHead;
        if (this.direction == "right") {
            if (head.x + 1 < 20) newHead = ({ x: head.x + 1, y: head.y });
            else newHead = ({ x: 0, y: head.y })
        } else if (this.direction == "left") {
            if (head.x - 1 >= 0) newHead = ({ x: head.x - 1, y: head.y });
            else newHead = ({ x: 19, y: head.y })
        } else if (this.direction == "down") {
            if (head.y + 1 < 20) newHead = ({ x: head.x, y: head.y + 1 });
            else newHead = ({ x: head.x, y: 0 })
        } else {
            if (head.y - 1 >= 0) newHead = ({ x: head.x, y: head.y - 1 });
            else newHead = ({ x: head.x, y: 19 })
        }
        this.body.push(newHead);
        for (let i = 0; i < this.fruit.locations.length; i++) {
            if (newHead.x == this.fruit.locations[i].x && newHead.y == this.fruit.locations[i].y) {
                ateFruit = true;
                amountGrown = growth;
                this.length += growth;
                if (firstApple == false) {
                    firstApple = true;
                    this.fruit.locations.shift();
                    for (let i = 0; i < appleCount; i++) {
                        this.fruit.locations.push({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
                    }
                }
                this.fruit.locations[i].x = Math.floor(Math.random() * 20);
                this.fruit.locations[i].y = Math.floor(Math.random() * 20);
                if (this.fruit.locations.length < 500) {
                    for (let i = 0; i < this.fruit.locations.length; i++) {
                        for (let j = 0; j < this.body.length; j++) {
                            while (this.body[j].x == this.fruit.locations[i].x && this.body[j].y == this.fruit.locations[i].y) {
                                this.fruit.locations[i].x = Math.floor(Math.random() * 20);
                                this.fruit.locations[i].y = Math.floor(Math.random() * 20);
                                console.log("fruit changed spots");
                            }
                        }
                    }
                    for (let i = 0; i < this.fruit.locations.length; i++) {
                        for (let j = i + 1; j < this.fruit.locations.length; j++) {
                            while (this.fruit.locations[i].x == this.fruit.locations[j].x && this.fruit.locations[i].y == this.fruit.locations[j].y) {
                                this.fruit.locations[j].x = Math.floor(Math.random() * 20);
                                this.fruit.locations[j].y = Math.floor(Math.random() * 20);
                                console.log("fruit changed spots (spawned on self)");
                            }
                        }
                    }
                }
                break;
            }
        }
        if (amountGrown > 0) {
            amountGrown--;
        } else this.body.shift();

        for (let i = 0; i < this.body.length - 1; i++) {
            if (newHead.x == this.body[i].x && newHead.y == this.body[i].y) {
                this.reset();
                drawText("You Died", "Arial", 50, "white", 200, 175);
                drawText("(Press any key to restart)", "Arial", 20, "white", 200, 225);
                firstApple = false;
                return;
            }
        }
        ateFruit = false;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; this.body.length > i; i++) {
            ctx.fillStyle = document.getElementById("snakeColor").value;
            ctx.fillRect(this.body[i].x * 20, this.body[i].y * 20, 20, 20);
        }
    }

    reset() {
        paused = true;
        this.body = [{ x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 10 }];
        this.direction = "right";
        this.nextDirection = "right";
        this.length = 3;
        this.fruit.locations = [{ x: 12, y: 10 }];
        clearInterval(gameLoopId);
        gameLoopId = setInterval(gameLoop, 1000 / FPS);
        reset = 1;
    }
}

class Fruit {
    constructor(xpos, ypos) {
        this.locations = [{ x: xpos, y: ypos }];
    }

    spawn() {
        ctx.fillStyle = document.getElementById("fruitColor").value;
        for (let i = 0; i < this.locations.length; i++) {
            ctx.fillRect(this.locations[i].x * 20, this.locations[i].y * 20, 20, 20);
        }
    }
}

let apple = new Fruit(12, 10);
let snake = new Snake(apple);
snake.draw();
apple.spawn();
drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");


document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            if (snake.direction != "down") {
                snake.nextDirection = "up";
            }
            break;
        case "ArrowDown":
        case "s":
            if (snake.direction != "up") {
                snake.nextDirection = "down";
            }
            break;
        case "ArrowRight":
        case "d":
            if (snake.direction != "left") {
                snake.nextDirection = "right";
            }
            break;
        case "ArrowLeft":
        case "a":
            if (snake.direction != "right") {
                snake.nextDirection = "left";
            }
            break;
    }
});

document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const isTyping = active.tagName === "INPUT" || active.tagName === "TEXTAREA";
    if (isTyping) return;
    if (reset == 1) {
        snake.draw();
        apple.spawn();
        drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
        drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");
        reset = 0;
    } else paused = false;
})

document.getElementById("snakeColor").addEventListener("change", () => {
    snake.draw();
    apple.spawn();
    drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
    drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");
});

document.getElementById("fruitColor").addEventListener("change", () => {
    snake.draw();
    apple.spawn();
    drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
    drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");

});

const darkButton = document.getElementById("darkModeToggle");
darkButton.addEventListener("click", () => {
    if (darkButton.textContent === "Dark Mode") {
        darkButton.textContent = "Light Mode";
    } else {
        darkButton.textContent = "Dark Mode";
    }
    document.body.classList.toggle("dark-mode");
    canvas.classList.toggle("dark-mode");
});

document.getElementById("pauseButton").addEventListener("click", () => {
    if (pauseButton.textContent === "Pause") {
        pauseButton.textContent = "Paused";
        paused = true;
    } else {
        pauseButton.textContent = "Pause";
        paused = false;
    }

});

document.getElementById("resetButton").addEventListener("click", () => {
    snake.reset();
    snake.draw();
    apple.spawn();
    drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
    drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");
    reset = 0;
    firstApple = false;
});

document.getElementById("FPS").addEventListener("change", () => {
    if (document.getElementById("FPS").value < 0) document.getElementById("FPS").value = 0;
    FPS = document.getElementById("FPS").value;
});

document.getElementById("apples").addEventListener("change", () => {
    appleCount = document.getElementById("apples").value;
});

document.getElementById("growth").addEventListener("change", () => {
    if (document.getElementById("growth").value < 0) document.getElementById("growth").value = 0;
    if (document.getElementById("growth").value > 100) document.getElementById("growth").value = 100;
    growth = parseInt(document.getElementById("growth").value);
})

function gameLoop() {
    if (!paused) {
        snake.update();
        if (!paused) {
            snake.draw();
            apple.spawn();
            score = snake.length - 3;
            if (score > highscore) {
                highscore = score;
                localStorage.setItem("highscore", highscore);
            }
            drawText(`Score: ${score}`, "Arial", 20, "white", 200, 20);
            drawText(`Highscore: ${highscore}`, "Arial", 15, "white", 5, 20, "left");

            pauseButton.textContent = "Pause";
        }
    } else pauseButton.textContent = "Paused";
}

function drawText(text, font, px, color, x, y, allignment) {
    ctx.textAlign = allignment || "center";
    ctx.textBaseline = "middle";
    ctx.font = `${px}px ${font}` || '20px Arial';
    ctx.fillStyle = color || 'white';
    ctx.fillText(text, x, y);
}

let gameLoopId = setInterval(gameLoop, 1000 / FPS);