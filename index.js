const GAMEBOARD = document.querySelector("#gameBoard");
const CTX = GAMEBOARD.getContext("2d");
const SCORETEXT = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = GAMEBOARD.width;
const gameHeight = GAMEBOARD.height;
const boardBackground = "white";
const snakeColor = "#fbe216";
const snakeBorder = "black";
const foodColor = "#cf2e2e";
const unitSize = 25 ;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
let overlap = 1;
let foodTry = "" + foodX + foodY;
let snakeTry = [];


window.addEventListener("keydown", changeDirection, resetGame);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running= true;
    SCORETEXT.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
            
        }, 100);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    CTX.fillStyle = boardBackground;
    CTX.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

   
};
function drawFood(){
    CTX.fillStyle = foodColor;
    CTX.fillRect(foodX, foodY, unitSize, unitSize);
};

for(let i=0; i<snake.length; i++){
    snakeTry[i] = "" + snake[i]["x"] + snake[i]["y"];
}

while(overlap){
    if(snakeTry.includes(foodTry)){
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameWidth - unitSize);
        foodTry = "" + foodX + foodY;
    } else {
        overlap = 0;
    }
}

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        SCORETEXT.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};
function drawSnake(){
    CTX.fillStyle = snakeColor;
    CTX.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        CTX.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        CTX.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == 32):
            resetGame();
            break;
        
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    CTX.font = "50px 'Courier', 'Courier New', Courier, monospace";
    CTX.fillStyle = "black";
    CTX.textAlign = "center";
    CTX.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0},
        
    ]; 
    gameStart();
};