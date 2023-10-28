let inputDir ={x:0 , y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio ('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 10;
let score= 0;
let lastPaintTime= 0;
let snakeArr = [
    {x:13, y:15}
];
food ={x:6, y:7};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

    function isCollide(snake){
        // if snake bumps on his self
        for(let i=1 ; i<snakeArr.length ; i++){
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        // if the snake gets bumpped on walls
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
        return false;
    }

function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0 , y:0};
        alert("Game Over. Press any key to start again!");
        snakeArr=[{x:13 , y:15}];
        musicSound.play();
        score=0;
    }
// After eating the food increment the score and regerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore:" , JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore:" + hiscoreval;
            console.log(hiscoreval)
        }
        hiscoreBox.innerHTML= "HiScore:" + score;
        console.log(score)
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a+(b-a)* Math.random()) , y: Math.round(a+(b-a)* Math.random())};
    }

    // Moving the Snake
    for(let i= snakeArr.length -2; i>=0 ; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part2 : Display the snake and food 
    // Display the snake.
    const Board = document.getElementById('board')
    Board.innerHTML = ""
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        Board.appendChild(snakeElement);
    });
// Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        Board.appendChild(foodElement);

}

// speed change after selecting the level
const input1 = document.querySelector("#number");
const button1 = document.querySelector(".button1");



const number1 = document.querySelector("#number")

button1.onclick = () => {
    var num = number1.value;
    if(num==  1)
    {
    
     speed = 5
    }
    else if(num==  2)
    {
         speed = 10
    }
    else if(num==  3)
    {
         speed = 15
    }
    else if(num== 4)
    {
         speed = 20
    }
    else
    {
         speed = 25
    }
}
// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));

}
else{
    hiscoreval= "HiScore:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0 , y:1}
    // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
    
})