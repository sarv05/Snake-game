alert('Press Space bar to start the game');
const board=document.getElementById('board');
const score=document.getElementById('score');
const highScoreText=document.getElementById('high_score')

let snake=[{x:10,y:10}];
let food=generateFood();
let direction='right';
let gameInterval;
let gameSpeedDelay=200;
let gameStarted=false;
let highScore=0;

function draw(){
    board.innerHTML='';
    if(gameStarted){
        drawSnake();
        drawFood();
        updateScore();
    }
}

function drawSnake(){
    snake.forEach((segment) =>{
        const snakeElement=createGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

function drawFood(){
    const foodElement=createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

function generateFood(){
   const x=Math.floor(Math.random()*20)+1; 
   const y=Math.floor(Math.random()*20)+1; 
   return {x,y};
}

function move(){
    const head={...snake[0]};
    switch(direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;  
    }
    snake.unshift(head);

    if(head.x==food.x && head.y==food.y){
        food=generateFood();
        clearInterval(gameInterval);
        gameInterval=setInterval(()=>{
            move();
            checkCollision();
            draw();
        },gameSpeedDelay);
    }
    else{
        snake.pop();
    }
}

function startGame(){
    gameStarted=true;
    gameInterval=setInterval(()=>{
        move();
        checkCollision();
        draw();
    },gameSpeedDelay);
}

function handleKeyPress(event){
    if(!gameStarted && (event.code=='Space' || event.key==' ')){
        startGame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction='up';
                break;
            case 'ArrowDown':
                direction='down';
                break;
            case 'ArrowLeft':
                direction='left';
                break;
            case 'ArrowRight':
                direction='right';
                break;
        }
    }
}

document.addEventListener('keydown',handleKeyPress);

function checkCollision(){
    const head=snake[0];
    
    if(head.x<1 || head.x>20 || head.y<1 || head.y>20){
        resetGame();
    }

    for(let i=1;i<snake.length;i++){
        if(head.x==snake[i].x && head.y==snake[i].y){
            resetGame();
        }
    }
}

function resetGame(){
    alert('Press Space bar to restart the game');
    updateHighScore();
    stopGame();
    snake=[{x:10,y:10}];
    food=generateFood();
    direction='right';
    gameSpeedDelay=200;
    updateScore();
}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');
}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
}

function updateHighScore(){
    const currentScore=snake.length-1;
    if(currentScore>highScore){
        highScore=currentScore;
        highScoreText.textContent=highScore.toString().padStart(3,'0');
        highScoreText.style.display='block';
    }
}