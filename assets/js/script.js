const canvas = document.querySelector('#gameCanvas');

const ctx = canvas.getContext('2d');

// ball position
let ballPosX = canvas.width / 2;
let ballPosY = canvas.height / 2;

// ball velocity
let ballDX = 1.7;
let ballDY = -1.7;

// ball radius
const ballRadius = 10;

// paddle
const paddleWidth = 75;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// arrow keys pressed
let rightPressed = false;
let leftPressed = false;

// draw the ball
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
};

// draw the paddle
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'tomato';
    ctx.fill();
    ctx.closePath();
};

// drawing loop function
const draw = () => {
    // clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // paint assets to the screen
    drawBall();
    drawPaddle();

    // move ball
    ballPosX += ballDX;
    ballPosY += ballDY;

    // collision detection
    if (ballPosY + ballDY < ballRadius || ballPosY + ballDY > canvas.height - ballRadius) {
        // reverse direction
        ballDY = -ballDY;
    };

    if (ballPosX + ballDX < ballRadius || ballPosX + ballDX > canvas.width - ballRadius) {
        ballDX = -ballDX;
    };

    // key pressed
    if (rightPressed) {
        paddleX = Math.min(paddleX + 5, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 5, 0);
    };
};

// key pressed handler functions
const keyDownHandler = e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    };
};

const keyUpHandler = e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    };
};

// key event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// run drawing loop every 10 milliseconds
setInterval(draw, 10);