let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let resetButton = document.getElementById('resetButton');
canvas.style.backgroundColor = 'black';

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
canvas.height = 512;
canvas.width = 288;


let zero = new Image();
let one = new Image();
let two = new Image();
let three = new Image();
let four = new Image();
let five = new Image();
let six = new Image();
let seven = new Image();
let eight = new Image();
let nine = new Image();
let backgroundDay = new Image();
let backgroundNight = new Image();
let base = new Image();
let blueBirdDownflap = new Image();
let blueBirdMidflap = new Image();
let blueBirdUpflap = new Image();
let redBirdDownflap = new Image();
let redBirdMidflap = new Image();
let redBirdUpflap = new Image();
let yellowBirdDownflap = new Image();
let yellowBirdMidflap = new Image();
let yellowBirdUpflap = new Image();
let gameOver = new Image();
let message = new Image();
let greenPipeBottom = new Image();
let greenPipeTop = new Image();
let redPipeBottom = new Image();
let redPipeTop = new Image();


zero.src = 'sprites/0.png';
one.src = 'sprites/1.png';
two.src = 'sprites/2.png';
three.src = 'sprites/3.png';
four.src = 'sprites/4.png';
five.src = 'sprites/5.png';
six.src = 'sprites/6.png';
seven.src = 'sprites/7.png';
eight.src = 'sprites/8.png';
nine.src = 'sprites/9.png';
backgroundDay.src = 'sprites/background-day.png';
backgroundNight.src = 'sprites/background-night.png';
base.src = 'sprites/base.png';
blueBirdDownflap.src = 'sprites/bluebird-downflap.png';
blueBirdMidflap.src = 'sprites/bluebird-midflap.png';
blueBirdUpflap.src = 'sprites/bluebird-upflap.png';
redBirdDownflap.src = 'sprites/redbird-downflap.png';
redBirdMidflap.src = 'sprites/redbird-midflap.png';
redBirdUpflap.src = 'sprites/redbird-upflap.png';
yellowBirdDownflap.src = 'sprites/yellowbird-downflap.png';
yellowBirdMidflap.src = 'sprites/yellowbird-midflap.png';
yellowBirdUpflap.src = 'sprites/yellowbird-upflap.png';
gameOver.src = 'sprites/gameover.png';
message.src = 'sprites/message.png';
greenPipeTop.src = 'sprites/pipe-green-top.png';
greenPipeBottom.src = 'sprites/pipe-green-bottom.png';
redPipeTop.src = 'sprites/pipe-red-top.png';
redPipeBottom.src = 'sprites/pipe-red-bottom.png';

const birdImages = {
    yellow: {midFlap : yellowBirdMidflap, upFlap : yellowBirdUpflap, downFlap : yellowBirdDownflap},
    red: {midFlap : redBirdMidflap, upFlap : redBirdUpflap, downFlap : redBirdDownflap},
    blue: {midFlap : blueBirdMidflap, upFlap : blueBirdUpflap, downFlap : blueBirdDownflap},
}
let loaded = false;
const gravity = 1000;
let lastTime = 0;
let paused = true;
let gameEnded = false;
let background;
let birdColor = weightedRandom([{value: 'yellow', weight: 14}, {value: 'red', weight: 4}, {value: 'blue', weight: 2}]);
let darkMode = false;
const maxHeight = -100;



function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load: ${src}`);
    });
}


Promise.all([
    loadImage('sprites/0.png'),
    loadImage('sprites/1.png'),
    loadImage('sprites/2.png'),
    loadImage('sprites/3.png'),
    loadImage('sprites/4.png'),
    loadImage('sprites/5.png'),
    loadImage('sprites/6.png'),
    loadImage('sprites/7.png'),
    loadImage('sprites/8.png'),
    loadImage('sprites/9.png'),
    loadImage('sprites/background-day.png'),
    loadImage('sprites/background-night.png'),
    loadImage('sprites/base.png'),
    loadImage('sprites/bluebird-downflap.png'),
    loadImage('sprites/bluebird-midflap.png'),
    loadImage('sprites/bluebird-upflap.png'),
    loadImage('sprites/redbird-downflap.png'),
    loadImage('sprites/redbird-midflap.png'),
    loadImage('sprites/redbird-upflap.png'),
    loadImage('sprites/yellowbird-downflap.png'),
    loadImage('sprites/yellowbird-midflap.png'),
    loadImage('sprites/yellowbird-upflap.png'),
    loadImage('sprites/gameover.png'),
    loadImage('sprites/message.png'),
    loadImage('sprites/pipe-green-bottom.png'),
    loadImage('sprites/pipe-green-top.png'),
    loadImage('sprites/pipe-red-bottom.png'),
    loadImage('sprites/pipe-red-top.png')
]).then(images => {
    console.log("All images loaded.");
    loaded = true;
    drawGame();
}).catch(err => {
    console.error(err);
});


class Bird {
    constructor(color) {
        this.x = 50;
        this.y = 200;
        this.color = color;
        this.state = 1;
        this.lastFlap = 0;
        this.targetFPS = 10;
        this.timeStep = 1000 / this.targetFPS;
        this.next;
        this.velocity = 0;
        this.jumpStrength = 300;
    }

    draw (timestamp){
        let order = ["upFlap", "midFlap", "downFlap"];
        if (!paused){
        if (timestamp - this.lastFlap >= this.timeStep) {
            this.lastFlap = timestamp;
            if (this.next == 1) {
                this.state = 0;
            } else this.state++;
            
            if (this.state > 2) {
                this.state = 1;
                this.next = 1;
            } else this.next = 0;
        }}
        ctx.drawImage(birdImages[this.color || 'yellow'][order[this.state]], this.x, this.y, 34, 24);
    }
    reset() {
        this.x = 50;
        this.y = 200;
        this.state = 1;
        this.lastFlap = 0;
        this.velocity = 0;
    }
}

class Pipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.drawImage(greenPipeBottom, this.x, this.y, 52, 400);
        ctx.drawImage(greenPipeTop, this.x, this.y - 496, 52, 400);
    }
}

class Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.drawImage(base, this.x, this.y, 288, 112);
    }
}

class Background {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.drawImage(background || backgroundDay, this.x, this.y, 288, 512);
    }
}

let flappy = new Bird(birdColor);
let startingPos = 500;
let pipe1 = new Pipe(startingPos, randomNumber(136, 400));
let pipe2 = new Pipe(startingPos + 144, randomNumber(136, 400));
let pipe3 = new Pipe(startingPos + 288, randomNumber(136, 400));
let pipes = [pipe1, pipe2, pipe3];

let base1 = new Base(0, 400);
let base2 = new Base(288, 400);
let bases = [base1, base2];

let background1 = new Background(0, 0);
let background2 = new Background(288, 0);
let backgrounds = [background1, background2];

let startNext = false;


function reset() {
    flappy.reset();
    startingPos = 500;
    pipe1 = new Pipe(startingPos, randomNumber(136, 400));
    pipe2 = new Pipe(startingPos + 144, randomNumber(136, 400));
    pipe3 = new Pipe(startingPos + 288, randomNumber(136, 400));
    pipes = [pipe1, pipe2, pipe3];
    base1 = new Base(0, 400);
    base2 = new Base(288, 400);
    bases = [base1, base2];
    background1 = new Background(0, 0);
    background2 = new Background(288, 0);
    backgrounds = [background1, background2];
}
document.addEventListener('keydown', function (e) {
    if (e.code == 'Space') {
        flappy.velocity = -flappy.jumpStrength;
        paused = false;
        if (!gameRunning){
        gameRunning = true;
        drawGame();
        startNext = true;
        }
        if (startNext){
            requestAnimationFrame(gameLoop);
            startNext = false;
        }
    }
});

const darkButton = document.getElementById("darkModeToggle");
darkButton.addEventListener("click", () => {
    if (darkButton.textContent === "Dark Mode") {
        darkButton.textContent = "Light Mode";
    } else {
        darkButton.textContent = "Dark Mode";
    }
    document.body.classList.toggle("dark-mode");
    darkMode = !darkMode;
    background = darkMode ? backgroundNight : backgroundDay;
    for (let i = 0; i < 2; i++) {
        drawGame();
    }
});
darkButton.addEventListener('mousedown', (event) => {
    event.stopPropagation();
});

document.addEventListener('mousedown', () => {
    flappy.velocity = -flappy.jumpStrength;
    paused = false;
    if (!gameRunning){
        gameRunning = true;
        drawGame();
        startNext = true;
    }
    if (startNext){
        requestAnimationFrame(gameLoop);
        startNext = false;
    }
});


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedRandom(options) {
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const opt of options) {
    if (rand < opt.weight) return opt.value;
    rand -= opt.weight;
  }
}


let drawGame = function (timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 2; i++) {
        backgrounds[i].draw();
    }
    for (let i = 0; i < 3; i++) {
        pipes[i].draw();
    }
    for (let i = 0; i < 2; i++) {
        bases[i].draw();
    }
    flappy.draw(timestamp);
    if (darkMode){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // black with 50% opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

let update = function (timestamp) {
     const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (!paused) {
    flappy.velocity += gravity * dt;
    flappy.y += flappy.velocity * dt;
    if (flappy.y < maxHeight) flappy.y = maxHeight;
    for (let i = 0; i < 3; i++) {
        let prev = (i - 1 + pipes.length) % pipes.length;
        if (pipes[i].x < -52) {
            pipes[i].x = pipes[prev].x + 144;
            pipes[i].y = randomNumber(136, 400);
        }
        pipes[i].x -= 100 * dt;   
    }
    for (let i = 0; i < 2; i++) {
        let prev = (i - 1 + bases.length) % bases.length;
        if (bases[i].x < -288) {
            bases[i].x = bases[prev].x + 288;
        }
        bases[i].x -= 100 * dt;
    }
    for (let i = 0; i< 2; i++) {
        let prev = (i - 1 + backgrounds.length) % backgrounds.length;
        if (backgrounds[i].x < -288) {
            backgrounds[i].x = backgrounds[prev].x + 288;
        }
        backgrounds[i].x -= 10 * dt;
    }
    }

    if (flappy.y + 24 > 400){
        flappy.y = 400 - 24;
        paused = true;
        die();
    }
}

let die = function () {
    paused = true;
    drawGame();
    reset();
    gameRunning = false;
}

let gameLoop = function (timestamp) {
    if (!loaded) {
        requestAnimationFrame(gameLoop);
        return;
    }
    update(timestamp);
    if (!paused) drawGame(timestamp);
    else ctx.drawImage(gameOver, 0, 0);
    requestAnimationFrame(gameLoop);
}

let gameRunning = true;
requestAnimationFrame(gameLoop);

