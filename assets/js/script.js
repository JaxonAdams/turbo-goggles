const canvas = document.querySelector('#gameCanvas');

const ctx = canvas.getContext('2d');

// ball position
let ballPosX = canvas.width / 2;
let ballPosY = canvas.height / 2;

// ball velocity
let ballDX = 1.5;
let ballDY = -1.5;

// draw the ball
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
};

// drawing loop function
const draw = () => {
    // clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // paint ball to screen
    drawBall();

    // move ball
    ballPosX += ballDX;
    ballPosY += ballDY;
};

// run drawing loop every 10 milliseconds
setInterval(draw, 10);