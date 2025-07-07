/*
ChatGPT did assist in the creation of this code, however I coded most of it
and I used ChatGPT for help since I'm fairly new to coding and still learing stuff

I also used the autocomplete feature from Windsurf to help speed up the coding process
(like all the variable declarations I had to do lol)
*/

//canvas setup
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let resetButton = document.getElementById('resetButton');
canvas.style.backgroundColor = 'black';

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
canvas.height = 512;
canvas.width = 288;

//image declarations
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

//audio declarations
let dieSound = new Audio('audio/die.wav');
let hitSound = new Audio('audio/hit.wav');
let pointSound = new Audio('audio/point.wav');
let swooshSound = new Audio('audio/swoosh.wav');
let wingSound = new Audio('audio/wing.wav');

//image setup
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

//variable setup
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
let darkMode = true;
let score = 0;
let numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
const maxHeight = -100;


//image loader (by chatGPT)
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load: ${src}`);
    });
}

//loads images
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

//classes
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
        this.scored = false;
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

//variables for stuff
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

//function and event listeners
function reset() {
    flappy.reset();
    score = 0;
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
let spaceHeld = false;
document.addEventListener('keydown', function (e) {
    if (e.code == 'Space' && !spaceHeld) {
        spaceHeld = true;
        flappy.velocity = -flappy.jumpStrength;
        paused = false;
        wingSound.cloneNode().play();
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

document.addEventListener('keyup', function (e) {
    if (e.code == 'Space') {
        spaceHeld = false;
    }
})

const darkButton = document.getElementById("theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
body.classList.remove("dark-mode", "light-mode");
body.classList.add(savedTheme);
darkButton.textContent = savedTheme === "dark-mode" ? "🌙" : "☀️";
darkMode = savedTheme === "dark-mode";
background = darkMode ? backgroundNight : backgroundDay;
}
darkButton.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    const newTheme = isDark ? "light-mode" : "dark-mode";
    localStorage.setItem("theme", newTheme);
    // Change icon based on theme
    darkButton.textContent = body.classList.contains("dark-mode") ? "🌙" : "☀️";
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
    wingSound.cloneNode().play();
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

//actual functions
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

function centerX(img){
    let imgWidth = img.width;
    return (canvas.width - imgWidth) / 2;
}

function centerY(img){
    let imgHeight = img.height;
    return (canvas.height - imgHeight) / 2;
}

function writeText(text, font, size, color, strokeWidth, x, y){
    ctx.textAlign = 'center';
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = strokeWidth;
    document.fonts.load(`${size}px ${font}`).then(() => {
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
    });
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
    let totalWidth = 0;
    for (let i = 0; i < score.toString().length; i++){
        totalWidth += numbers[score.toString()[i]].width;
    }
    let x = (canvas.width - totalWidth) / 2;
    for (let i = 0; i < score.toString().length; i++){
        let digit = score.toString()[i];
        ctx.drawImage(numbers[digit],x, 40);
        x += numbers[digit].width;  
    }
    //writeText(score, 'flappy-font', 40, 'white', 2, canvas.width / 2, 40);
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
            pipes[i].scored = false;
        }
        if (pipes[i].x < flappy.x + 12 && pipes[i].scored == false) {
            score++;
            pointSound.cloneNode().play();
            console.log(score);
            pipes[i].scored = true;
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
    hitSound.cloneNode().play();
    dieSound.cloneNode().play();
    drawGame();
    reset();
    gameRunning = false;
}

//gameloop
let gameLoop = function (timestamp) {
    if (!loaded) {
        requestAnimationFrame(gameLoop);
        return;
    }
    update(timestamp);
    if (!paused) drawGame(timestamp);
    else ctx.drawImage(gameOver, centerX(gameOver), centerY(gameOver));
    requestAnimationFrame(gameLoop);
}

let gameRunning = true;
requestAnimationFrame(gameLoop);

