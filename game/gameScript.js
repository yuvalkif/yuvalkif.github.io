
/**
 * set the player global var 
 */
function setPlayerVar(){
    shape = gameObjects[gameObjects.length-1];
}

/**
 * get the position of the user
 * 
 * @return {[x,y]}
 */
function userPosition(){
    return [shape.i,shape.j];
}


/**
 * update loop for all objects but monsters
 */

function update(){
  
    var temp ;
    
    if(board.food === 0)
        endGame();

    for(var i = 0 ; i < gameObjects.length ; i++){
        temp = gameObjects[i] ;
        if(temp.name !== 'monster')
            temp.update();
    }
}

/**
 * update loop for all objects 
 */ 
function updateAll(){

    var temp ;

    for(var i = 0 ; i < gameObjects.length ; i++){
        temp = gameObjects[i] ;
        temp.update();
    }

}


/**
 * render loop for all objects
*/
function render(){

    var temp ;

    for(var i = 0 ; i < gameObjects.length; i++){
        temp = gameObjects[i] ;
        temp.render();
    }
}



function Start() {
    
    gameObjects = new Array();
    var emptyCell ;
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var pacman_remain = 1;
    start_time = new Date();

    board = boardConstructor();
    board.setIntervals();

    //place pacman randomly
    emptyCell = findRandomEmptyCell();
    addGameObject(pacmanConstructor(emptyCell[0],emptyCell[1]));
    
    setPlayerVar();
    foodLeftToPlace = foodCount ;
    //place all the food randomly
 
    while (foodLeftToPlace > 0) {
        emptyCell = findRandomEmptyCell();
        placeFoodRandomly(emptyCell);
        foodLeftToPlace--;
    }

    spawnMonsters(monstersCount);

    cake = cakeConstructor(50,20);
    addGameObject(cake);

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
 
    setTotalTime();
    setGameTimeInterval(gameTime);
    gameMusic.currentTime = 0;
    gameEnded = false ;
    //startMoving = false ;
   // moveMonsters = false ;
    gameMusic.play();
}

function setGameTimeInterval(time){
    clearInterval(gameTimeInterval);
    gameTimeInterval = setInterval(endGame , time*1000);
}

function setTotalTime(){
    document.getElementById('ttlabel').innerHTML = gameTime;
}

function moveMonsters(){
    startMoving = true ;
    clearInterval(board.monsterMoveInterval);
}

$(document).ready(function(){
window.addEventListener("keydown", function(e) {
// space and arrow keys
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
}, false);
});


//////////////////////////////////////// BOARD FUNCTIONS ///////////////////////////////////////////


/**
 * main update function
 */
function updateObjects(){
    //if(startMoving === false)
     //   update();
   // else
        updateAll();
}

/**
 * function for ending the game
 */
function endGame(){
    if(shape.life === 0)
        alert('You Lost!');
    else{
        if(score < 150)
            alert('You can do better');
        else
            alert('We have a winner!!!');
    }
    moveToPage('#game','#welcome');
    gameObjects = new Array();
    board.clearIntervals();
    clearInterval(gameTimeInterval);
    stopMusic();
    endCandyIntervals();
}

function stopMusic(){
    gameEnded = true ;
    gameMusic.pause();
}

////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @return {number}
 */
function GetKeyPressed() {
    

    if (keysDown[upKey]) {
        return 1;
    }
    if (keysDown[downKey]) {
        return 2;
    }
    if (keysDown[leftKey]) {
        return 3;
    }
    if (keysDown[rightKey]) {
        return 4;
    }
}

$( function() {
      $( "#datepicker" ).datepicker();
});


/**
 * function for drawing objects .
 * 
 * calls for render() at the end which renders all of the objects
 */
function Draw() {

    var circleUnits = 2*Math.PI ;
    var basePoints = 5 ;
    var foodRadius = 5 ;

    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;

    for (var i = 0; i < board.length ; i++) {
        for (var j = 0; j < board.length ; j++) {;

            if (board.map[i][j] === 1) { // 1 - 5 point food
                context.beginPath();
                context.arc(i*cellWidth+cellWidth/2 , j*cellHeight+cellHeight/2 , foodRadius , 0, circleUnits); // circle
                context.fillStyle = fiveColor; //color
                context.fill();
            }else if(board.map[i][j] === 5){//5 - 15 point food
                context.beginPath();
                context.arc(i*cellWidth+cellWidth/2 , j*cellHeight+cellHeight/2 , foodRadius+2,0, circleUnits);
                context.fillStyle = fifteenColor ;
                context.fill();
            }else if(board.map[i][j] === 6){//6 - 25 point food 
                context.beginPath();
                context.arc(i*cellWidth+cellWidth/2 , j*cellHeight+cellHeight/2 , foodRadius+4 ,0, circleUnits);
                context.fillStyle = twentyfiveColor ;
                context.fill();
            }else if (board.map[i][j] === 4) {// 4 - wall
                context.beginPath();
                context.rect(i*cellWidth, j*cellHeight, cellWidth , cellHeight , 60);
                context.fillStyle = "grey"; //color
                context.fill();
            } 
        }
    }
    
    render();

}

/**
 * update player's position
 */
function UpdatePosition() {

    board.map[shape.i][shape.j] = 0;
    var x = GetKeyPressed();

    if (x === 1) {//up
        if (board.checkLegalMove(shape.i,shape.j-1)) {
            shape.moveUp() ;
        }
    }
    if (x === 2) {//down
        if (board.checkLegalMove(shape.i , shape.j+1)) {
            shape.moveDown();
        }
    }
    if (x === 3) {//left
        if (board.checkLegalMove(shape.i-1,shape.j)){
            shape.moveLeft();
        }
    }
    if (x === 4) {//right
        if (board.checkLegalMove(shape.i+1,shape.j)) {
            shape.moveRight();
        }
    }
    if (board.map[shape.i][shape.j] === 1) {
        score += 5*scoreMultiplier ;
        decrementBoardFood();
    }else if(board.map[shape.i][shape.j] === 5){
        score += 15*scoreMultiplier ;
        decrementBoardFood();
    }else if(board.map[shape.i][shape.j] === 6){
        score += 25*scoreMultiplier ;
        decrementBoardFood();
    }
 
    board.map[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (board.food === 0) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}
