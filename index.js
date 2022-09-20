import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

document.getElementById("button-start").addEventListener("click", startGame);
document.getElementById("button-end").addEventListener("click", resetGame);
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width= 600;
canvas.height= 600;

const background = new Image();
background.src = 'images/background.png';

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 5, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;


//Start screen
function startGame() {
    document.getElementById("start").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("game-over").style.display = "none";

    setInterval(game, 1000/60);
}

//Game
function game(){
    checkGameOver();

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }  
}

//Game Over Screen
function displayGameOver(){
    if(isGameOver){
        document.getElementById("start").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("game-over").style.display = "block";

        if(didWin === true){
            document.getElementById("score").innerHTML = "You win!";
        }
        else if(didWin === false && isGameOver === true){
            document.getElementById("score").innerHTML = "You lose!";
        }
    }
    
}

function resetGame(){
    window.location.reload();   
}

function checkGameOver(){
    if(isGameOver){
        return;
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true; 
    }
    if(enemyController.collideWith(player)){
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
    if(enemyController.getLowestEnemyLocation() >= player.y){
        isGameOver = true;
    }
}

