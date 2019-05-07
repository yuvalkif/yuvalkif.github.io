var context = canvas.getContext("2d");
/**
 * Objects
 */
var gameObjects = new Array() , cake = new Object() , candy = new Object() ;
var lifeImg = new Image() ; lifeImg.src = 'sprites\\life.png' ;
var gameMusic = new Audio(); gameMusic.src ='audio\\ingame_music.wav';
var shape , board , cake ;

/**
 * sizes needed
 */
var defHeight = 768 , defWidth = 1380;
var canvasWidth = 600 , canvasHeight = 600 ;
var boardDimentions = 20 ;
var cellWidth = canvasWidth/boardDimentions ;
var cellHeight = canvasHeight/boardDimentions ;
var cellsNumber = 10 , clockTimeWorth = 15 ;
var refreshTime = 250 ;
var monsterWidth = 60 ;
var monsterHeight = 60 ;
var candyLifeTime = 10 ;
var scoreMultiplier = 1 ;
var startMoving = false; 

/**
 * player vars
 */
var score;
var pac_color;

/**
 * page vars
 */
var start_time;
var time_elapsed;
var currentPlayer ;
var playMusic = false ;
var usersArray = ['a','a'];

/**
 * Intervals
 */
var candySpawnTime = 15 , candyTime = 10 , multiplyTime = 10 , candySpawningInterval , removeCandyInterval , multiplyInterval , objectsInterval ;
var interval , mosterMoveInterval , gameTimeInterval , clockInterval;

/**
game start parameters variables
*/
var cakeExists = true;
var foodCount , monstersCount , fiveColor , fifteenColor , twentyfiveColor , gameTime ,fiveCount , fifteenCount , twentyfiveCount ;
var leftKey  , rightKey , upKey  , downKey , currentCode , gameEnded , foodLeftToPlace ;
var maxFoodCount = 90 , minFoodCount = 50 , maxMonsters = 3 , minMonsters = 1 , minGameTime = 60;
var gameFiveCount , gameFifteenCount , gameTwentyfiveCount ;

gameMusic.addEventListener("ended" , function(){
    if(gameEnded === false){
        this.currentTime = 0 ;
        this.play();
    }
} , false );
