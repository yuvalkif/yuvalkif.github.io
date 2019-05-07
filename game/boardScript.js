
/**
 * spawn a candy and add to gameObjects array
 */
function spawnCandy(){
    candy = multiplierCandyConstructor();
    addGameObject(candy);
}

/**
 * remove candy form the gameObjects array
 */
function removeCandy(){
    removeGameObject(candy);

}

/**
 * sets interval for the time the player as the multiply bonus
 */
function setMultiplyTimer(){
    multiplyInterval = setInterval(endMultiply , multiplyTime*1000);
}

/**
 * end the multiply bonus
 */
function endMultiply(){
    clearInterval(multiplyInterval);
    scoreMultiplier = 1 ;
}

/**
 *  function to apply monster strike on the player .
 * decrements the player's life and resets the monsters position at the end
 */
function monsterStrike(){

    var monsterArr = new Array();
    var startCords = [0,0,boardDimentions-1,boardDimentions-1,0,boardDimentions-1];
    var j = 0 ;
    //get all the monsters on the board
    for(var i = 0 ; i < gameObjects.length ; i++){
        if(gameObjects[i].name === 'monster')
            monsterArr.push(gameObjects[i]);
    }
    //apply strike
    shape.strike();
    decrementLife();
    alert('lost 1 life'); 
    startMoving = false;

    //reset monsters position
    for(var i = 0 ; i < monsterArr.length ; i++){
        monsterArr[i].setX(startCords[j]) ; 
        monsterArr[i].setY(startCords[j+1]) ;
        j += 2 ;
    }
    shape.setAtEmptyRandomCell();
}

/**
 * decrements the hearts showing in the left upper corner of the game 
 */
function decrementLife(){
    if(shape.life === 2)
        $("#thirdHeart").hide();
    else if(shape.life === 1)
        $("#secondHeart").hide();
    else if(shape.life === 0)
        $("#firstHeart").hide();
}

function decrementBoardFood(){
        board.food--;
    }


/**
 * places a food worth's 5 points
 * @param {[x,y]} emptyCell a cell to set the food at 
 */
function placeFiveFood(emptyCell){

    board.map[emptyCell[0]][emptyCell[1]] = 1 ;
    fiveCount--;
}

/**
 * places a food worth's 15 points
 * @param {[x,y]} emptyCell a cell to set the food at 
 */
function placeFifteenFood(emptyCell){
    board.map[emptyCell[0]][emptyCell[1]] = 5;
    fifteenCount--;
}

/**
 * places a food worth's 25 points
 * @param {[x,y]} emptyCell a cell to set the food at 
 */
function placeTwentyfiveFood(emptyCell){
    board.map[emptyCell[0]][emptyCell[1]] = 6 ;
    twentyfiveCount-- ;
}

/**
 * place a food randomly in the emptyCell given .
 * first place all 5's , after all 15's an finally all 25's
 * 
 * @param {[x.y]} emptyCell empty cell to place at 
 */
function placeFoodRandomly(emptyCell){

    if(fiveCount > 0)
        placeFiveFood(emptyCell);
    else if(fifteenCount > 0)
        placeFifteenFood(emptyCell);
    else if(twentyfiveCount > 0 )
        placeTwentyfiveFood(emptyCell);

}

/**
 * find an empty cell in the board randomly
 * 
 * @return {[x,y]} 
 */
function findRandomEmptyCell() {
    var i = randomGenerator(boardDimentions-1,0);
    var j = randomGenerator(boardDimentions-1,0);

    while (board.map[i][j] !== 0) {
        i = randomGenerator(boardDimentions-1,0);
        j = randomGenerator(boardDimentions-1,0);

    }

    return [i, j];
}
