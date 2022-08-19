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

// brick field information
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// set up 2d array to store brick info
const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0 };
    };
};

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

const drawBricks = () => {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            // set up brick coordinates
            const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;

            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = 'tomato';
            ctx.fill();
            ctx.closePath();
        };
    };
};

// drawing loop function
const draw = () => {
    // clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // paint assets to the screen
    drawBricks();
    drawBall();
    drawPaddle();

    // move ball
    ballPosX += ballDX;
    ballPosY += ballDY;

    // collision detection
    if (ballPosY + ballDY < ballRadius) {
        // reverse direction
        ballDY = -ballDY;
    } else if (ballPosY + ballDY > canvas.height - ballRadius) { // ball hits bottom of screen
        if (ballPosX > paddleX && ballPosX < paddleX + paddleWidth) {
            ballDY = -ballDY;

            // increase speed;
            ballDX += 0.2;
            ballDY -= 0.2;
        } else {
            alert('GAME OVER');
            window.location.reload();
            clearInterval(interval); // required for Chrome
        };
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

// define game interval
const interval = setInterval(draw, 10);