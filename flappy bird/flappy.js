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
let greenPipe = new Image();
let redPipe = new Image();


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
greenPipe.src = 'sprites/pipe-green.png';
redPipe.src = 'sprites/pipe-red.png';




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
    loadImage('sprites/pipe-green.png'),
    loadImage('sprites/pipe-red.png')
]).then(images => {
    console.log("All images loaded.");
    ctx.drawImage(backgroundDay, 0, 0, 288, 512);
    ctx.drawImage(base, 0, 400, 288, 112);
    ctx.drawImage(yellowBirdMidflap, 0, 0, 34, 24);
}).catch(err => {
    console.error(err);
});


let gameLoop = function () {
    ctx.drawImage(backgroundDay, 0, 0, 288, 512);
    ctx.drawImage(base, 0, 400, 288, 112);
    ctx.drawImage(yellowBirdMidflap, 0, 0, 34, 24);
    requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);

