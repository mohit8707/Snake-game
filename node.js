let dir = {x:0,y:0};
const musicsound=new Audio('music/music.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const foodsound = new Audio('music/food.mp3');
const movesound = new Audio("music/move.mp3");
let speed = 5;
let lasttime = 0;
let High = -1;
let board = document.querySelector("#board");
let snakearr=[
    {x:13,y:15}
];
let score = 0;
let food = {x:4,y:5};
function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime - lasttime)/1000)<1/speed){
        return;
    }
    lasttime=ctime;
    GameEngine();
}
function isCollide(snakearr){
    if(snakearr[0].x >18 || snakearr[0].x<1 || snakearr[0].y<1 || snakearr[0].y>18 ){
        return true;
    }
    for(let i = 1;i<snakearr.length;i++){
        if(snakearr[0].x === snakearr[i].x && snakearr[0].y===snakearr[i].y){
            return true;
        }
    }
    return false;
}
function GameEngine(){
    if(score>High){
        Highscore.innerHTML="HIGH SCORE : "+score;
        High=score;
    }
    Score.innerHTML="SCORE : "+score;
    if(isCollide(snakearr)){
        musicsound.pause();
        gameoversound.play();
        alert("Your Game has been finished Press any key to Play again ");
        musicsound.play();
        snakearr=[
            {x:13,y:15}
        ];
        dir={x:0,y:0};
        if(score>High){
            High=score;
        }
        score = 0;
    }
    if(snakearr[0].x==food.x && snakearr[0].y == food.y){
        foodsound.play();
        snakearr.unshift({x:snakearr[0].x +dir.x ,y: snakearr[0].y + dir.y});
        score++;
        let a  = 2;
        let b = 16;
        food={x:a + (b-a)*Math.round(Math.random()),y:a + (b-a)*Math.round(Math.random())};
        Score.innerHTML="SCORE : "+score;
    }
    for(let i = snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x=snakearr[0].x+dir.x;
    snakearr[0].y=snakearr[0].y+dir.y;
    board.innerHTML="";
    snakearr.forEach(function(e,idx){
        snakelement = document.createElement('div');
        snakelement.style.gridRowStart = e.y;
        snakelement.style.gridColumnStart = e.x;
        if(idx==0){
            snakelement.classList.add('head');
        }
        else{
            snakelement.classList.add('snake');
        }
        board.appendChild(snakelement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
window.addEventListener('keydown',function(e){
    movesound.play();
    musicsound.play();
    dir = {x:0,y:0};
    switch (e.key){
        case  "ArrowUp" :
            dir.x = 0;
            dir.y=-1;
            break;
        case  "ArrowDown" :
            dir.x = 0;
            dir.y=1;
            break;
        case  "ArrowLeft" :
            dir.x = -1;
            dir.y=0;
            break;
        case  "ArrowRight" :
            dir.x = 1;
            dir.y=0;
            break;
        default :
            break;
        
    }
});
window.requestAnimationFrame(main);