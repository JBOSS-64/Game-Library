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
ctx.imageSmoothingEnabled = false;

//image loader (by chatGPT)
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load: ${src}`);
    });
}

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
let bronze = new Image();
let silver = new Image();
let gold = new Image();
let platinum = new Image();
let getReady = new Image();
let medalScreen = new Image();
let newHighscore = new Image();
let okayBtn = new Image();
let pauseBtn = new Image();
let resumeBtn = new Image();
let playBtn = new Image();
let tapStart = new Image();
let logo = new Image();
let menuBtn = new Image();

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
bronze.src = 'sprites/bronze-medal.png';
silver.src = 'sprites/silver-medal.png';
gold.src = 'sprites/gold-medal.png';
platinum.src = 'sprites/platinum-medal.png';
getReady.src = 'sprites/get-ready.png';
medalScreen.src = 'sprites/medal-screen.png';
newHighscore.src = 'sprites/new-highscore.png';
okayBtn.src = 'sprites/okay-button.png';
menuBtn.src = 'sprites/menu-button.png';
pauseBtn.src = 'sprites/pause-button.png';
resumeBtn.src = 'sprites/resume-button.png';
playBtn.src = 'sprites/play-button.png';
tapStart.src = 'sprites/tap-start.png';
logo.src = 'sprites/flappy-bird-logo.png';
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
    loadImage('sprites/pipe-red-top.png'),
    loadImage('sprites/bronze-medal.png'),
    loadImage('sprites/silver-medal.png'),
    loadImage('sprites/gold-medal.png'),
    loadImage('sprites/platinum-medal.png'),
    loadImage('sprites/get-ready.png'),
    loadImage('sprites/medal-screen.png'),
    loadImage('sprites/new-highscore.png'),
    loadImage('sprites/okay-button.png'),
    loadImage('sprites/pause-button.png'),
    loadImage('sprites/resume-button.png'),
    loadImage('sprites/play-button.png'),
    loadImage('sprites/tap-start.png'),
    loadImage('sprites/flappy-bird-logo.png')
]).then(images => {
    console.log("All images loaded.");
    loaded = true;
    okayButton = new Button(canvas.width/2, 330, okayBtn, 2);
    pauseButton = new Button(15, 15, pauseBtn, 2);
    drawGame();
}).catch(err => {
    console.error(err);
});


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
let isFalling;
let lastScore = 4;
let highscore = localStorage.getItem("highscoreFlappy") || 0;
let oldHighscore = highscore;
let pipeColor = weightedRandom([{value: 'green', weight: 49}, {value: 'red', weight: 1}]);
let started = false;
let gameState = "start";

//classes
class Bird {
    constructor(color) {
        this.x = 50;
        this.y = 216;
        this.color = color;
        this.state = 1;
        this.lastFlap = 0;
        this.targetFPS = 10;
        this.timeStep = 1000 / this.targetFPS;
        this.next;
        this.velocity = 0;
        this.jumpStrength = 300;
        this.rotation = 0;
    }

    draw (timestamp){
        let order = ["upFlap", "midFlap", "downFlap"];
        if (timestamp - this.lastFlap >= this.timeStep) {
            this.lastFlap = timestamp;
            if (this.next == 1) {
                this.state = 0;
            } else this.state++;
            
            if (this.state > 2) {
                this.state = 1;
                this.next = 1;
            } else this.next = 0;
        }
        ctx.save();

        // Move origin to the bird's center
        ctx.translate(this.x + 17, this.y + 12);  // 17 and 12 are half width and height

        // Rotate around the new origin (bird center)
        ctx.rotate(this.rotation || 0);  // fallback to 0 if undefined

        // Draw bird centered at origin (top-left at -17, -12)
        ctx.drawImage(birdImages[this.color || 'yellow'][order[this.state]], -17, -12, 34, 24);

        ctx.restore();
    }
    reset() {
        this.x = 50;
        this.y = 200;
        this.state = 1;
        this.lastFlap = 0;
        this.velocity = 0;
        this.rotation = 0;
    }
}

class Pipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.scored = false;
    }

    draw() {
        if (pipeColor == "green") {
        ctx.drawImage(greenPipeBottom, this.x, this.y, 52, 400);
        ctx.drawImage(greenPipeTop, this.x, this.y - 496, 52, 400);
        } else if (pipeColor == "red") {
        ctx.drawImage(redPipeBottom, this.x, this.y, 52, 400);
        ctx.drawImage(redPipeTop, this.x, this.y - 496, 52, 400);
        }
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

class Button {
    constructor (x, y, image, mult){
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = this.image.width*(mult||1);
        this.height = this.image.height*(mult||1);
    }
    draw() {
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
}

//variables for classes
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

let okayButton;
let pauseButton;

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
    document.getElementById("menu-button").hidden = true;
    gameState = "start";
}
let spaceHeld = false;
document.addEventListener('keydown', function (e) {
    if (e.code == 'Space' && !spaceHeld) {
        if (gameState == "start"){
            gameState = "running";
        }
        if (gameState == "running"){
        flappy.velocity = -flappy.jumpStrength;
        spaceHeld = true;
        wingSound.cloneNode().play();
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
});
darkButton.addEventListener('mousedown', (event) => {
    event.stopPropagation();
});
document.addEventListener('mousedown', () => {
    if (gameState == "start"){
        gameState = "running";
    }
    if (gameState == "running"){
    flappy.velocity = -flappy.jumpStrength;
    wingSound.cloneNode().play();
    }
});

canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    //okay button bounds
    const left   = okayButton.x - okayButton.width / 2;
    const right  = okayButton.x + okayButton.width / 2;
    const top    = okayButton.y - okayButton.height / 2;
    const bottom = okayButton.y + okayButton.height / 2;

    //pause button bounds
    const left2   = pauseButton.x - pauseButton.width / 2;
    const right2  = pauseButton.x + pauseButton.width / 2;
    const top2    = pauseButton.y - pauseButton.height / 2;
    const bottom2 = pauseButton.y + pauseButton.height / 2;

    if (gameState == "gameover"){
        if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
            reset();
            swooshSound.play();
        }
    }
    if (gameState == "running" || gameState == "paused"){
        if (mouseX >= left2 && mouseX <= right2 && mouseY >= top2 && mouseY <= bottom2) {
            gameState = (gameState == "paused") ? "running" : "paused";
            pauseButton.image = (gameState == "paused") ? resumeBtn : pauseBtn;
        }
    }
});

canvas.addEventListener('mousedown', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    //pause button bounds
    const left2   = pauseButton.x - pauseButton.width / 2;
    const right2  = pauseButton.x + pauseButton.width / 2;
    const top2    = pauseButton.y - pauseButton.height / 2;
    const bottom2 = pauseButton.y + pauseButton.height / 2;
    if (gameState == "running" || gameState == "paused"){
        if (mouseX >= left2 && mouseX <= right2 && mouseY >= top2 && mouseY <= bottom2) {
            e.stopPropagation();
        }
    }
});

canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    //okay button bounds
    const left   = okayButton.x - okayButton.width / 2;
    const right  = okayButton.x + okayButton.width / 2;
    const top    = okayButton.y - okayButton.height / 2;
    const bottom = okayButton.y + okayButton.height / 2;

    //pause button bounds
    const left2   = pauseButton.x - pauseButton.width / 2;
    const right2  = pauseButton.x + pauseButton.width / 2;
    const top2    = pauseButton.y - pauseButton.height / 2;
    const bottom2 = pauseButton.y + pauseButton.height / 2;

    if (gameState == "gameover"){
        if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }
    if (gameState == "running" || gameState == "paused"){
        if (mouseX >= left2 && mouseX <= right2 && mouseY >= top2 && mouseY <= bottom2) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
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

function centerX(img, mult){
    let imgWidth = img.width*(mult||1);
    return (canvas.width - imgWidth) / 2;
}

function centerY(img, mult){
    let imgHeight = img.height*(mult||1);
    return (canvas.height - imgHeight) / 2;
}

function writeText(text, font, size, color, strokeWidth, x, y, allignment){
    ctx.textAlign = allignment || "center";
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
    if (gameState != "paused") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    for (let i = 0; i < 2; i++) {
        backgrounds[i].draw();
    }
    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < 3; i++) {
        pipes[i].draw();
    }
    for (let i = 0; i < 2; i++) {
        bases[i].draw();
    }
    if (gameState != "dead" && gameState != "gameover") {
        flappy.draw(timestamp); 
    } else {
        flappy.draw();
    }
    let totalWidth = 0;
    for (let i = 0; i < score.toString().length; i++){
        totalWidth += numbers[score.toString()[i]].width;
    }
    let x = (canvas.width - totalWidth) / 2;
    if (gameState == "running" || gameState == "paused" || gameState == "dead") {
    for (let i = 0; i < score.toString().length; i++){
        let digit = score.toString()[i];
        ctx.drawImage(numbers[digit],x, 40);
        x += numbers[digit].width;  
    }
    }
    if (gameState == "running") {
        pauseButton.image = pauseBtn;
        pauseButton.draw();
    }
    if (gameState == "gameover") {
    ctx.drawImage(gameOver, centerX(gameOver), centerY(gameOver)-100);
    ctx.drawImage(medalScreen, centerX(medalScreen,2), centerY(medalScreen,2), medalScreen.width*2, medalScreen.height*2);
    writeText(lastScore, 'flappy-font', 20, 'white', 2, 235, 250, 'right');
    writeText(highscore, 'flappy-font', 20, 'white', 2, 235, 290, 'right');
    okayButton.draw();
    if (highscore == lastScore && highscore != oldHighscore) {
        ctx.drawImage(newHighscore, 160, 255, newHighscore.width*2, newHighscore.height*2);
    }
    if (lastScore >= 10) {
        ctx.drawImage(bronze, 57, 239, bronze.width*2, bronze.height*2);
    }
    if (lastScore >= 20){
        ctx.drawImage(silver, 57, 239, silver.width*2, silver.height*2);
    }
    if (lastScore >= 30){
        ctx.drawImage(gold, 57, 239, gold.width*2, gold.height*2);
    }
    if (lastScore >= 40){
        ctx.drawImage(platinum, 57, 239, platinum.width*2, platinum.height*2);
    }    
    } else if (gameState == "start") {
        let tapStartMult = 2.5
        ctx.drawImage(tapStart, centerX(tapStart,tapStartMult), 216, tapStart.width*tapStartMult, tapStart.height*tapStartMult);
        let logoMult = 2.5
        ctx.drawImage(logo, centerX(logo,logoMult), 50, logo.width*logoMult, logo.height*logoMult);
    }
} else {
    pauseButton.draw();
}
}

let update = function (timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (gameState == "running") {
    flappy.velocity += gravity * dt;
    flappy.y += flappy.velocity * dt;
    let maxRotation = Math.PI / 4; // 45 degrees up
    let minRotation = -Math.PI / 2; // 90 degrees down

    flappy.rotation = flappy.velocity / 600; // tweak divisor for sensitivity
    if (flappy.rotation > maxRotation) flappy.rotation = maxRotation;
    if (flappy.rotation < minRotation) flappy.rotation = minRotation;

    if (flappy.y < maxHeight) flappy.y = maxHeight;
    for (let i = 0; i < 3; i++) {
        let prev = (i - 1 + pipes.length) % pipes.length;
        if (pipes[i].x < -52) {
            pipes[i].x = pipes[prev].x + 144;
            pipes[i].y = randomNumber(136, 400);
            pipes[i].scored = false;
        }
        if (pipes[i].x < flappy.x + 17 && pipes[i].scored == false) {
            score++;
            if (score > highscore) {
                oldHighscore = highscore;
                highscore = score;
                localStorage.setItem("highscoreFlappy", highscore);
            }
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
    for (let i = 0; i < pipes.length; i++) {
    let margin = 4;
    let birdLeft = flappy.x + margin;
    let birdRight = flappy.x + 34 - margin;
    let birdTop = flappy.y + margin;
    let birdBottom = flappy.y + 24- margin;

    let pipeLeft = pipes[i].x;
    let pipeRight = pipes[i].x + 52;
    let pipeTop = pipes[i].y - 496 + 400; // top pipe bottom edge
    let pipeBottom = pipes[i].y; // bottom pipe top edge

    let collidedWithTop = (birdRight > pipeLeft && birdLeft < pipeRight && birdTop < pipeTop);
    let collidedWithBottom = (birdRight > pipeLeft && birdLeft < pipeRight && birdBottom > pipeBottom);

    if (collidedWithTop || collidedWithBottom) {
        die();
    }
    }
    } 
    if (gameState == "start") {
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
        flappy.y = 216 + 5 * Math.sin(timestamp/200);
    }

    if (flappy.y + 24 > 400){
        flappy.y = 400 - 24;
        paused = true;
        die();
    }
    //if flappy.x or flappy.x + 34 is between pipes[i].x and pipes[i].x + 52 die
    //if flappy.y or flappy.y + 24 is between pipes[i].y and pipes[i].y + 400 die
}

function die() {
    gameState = "dead";
    lastScore = score;
    hitSound.cloneNode().play();
    dieSound.cloneNode().play();
    function fall(timestamp) {
        isFalling = true;
        const dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        flappy.velocity += gravity * dt;
        flappy.y += flappy.velocity * dt;

        drawGame(timestamp);

        if (flappy.y + 24 < 400) {
            requestAnimationFrame(fall);
        } else {
            flappy.y = 400 - 24;
            paused = true;
            drawGame(timestamp);
            gameState = "gameover";
        }
    }
    requestAnimationFrame(fall);
}

//gameloop
let gameLoop = function (timestamp) {
    if (!loaded) {
        requestAnimationFrame(gameLoop);
        return;
    }
    update(timestamp);
    drawGame(timestamp);
    requestAnimationFrame(gameLoop);
}

let gameRunning = false;
requestAnimationFrame(gameLoop);

