
/**
 * checks if a number is in an interval specified by min and max
 * 
 * @param {number} check number to be checked 
 * @param {unmber} max max range 
 * @param {number} min min range
 * 
 * @return {boolean}
 */
function isLegalParameter(check , max , min){
    return check >= min && check <= max ;
}

/**
 * sets colors to the different food types
 */
function setPlayerColorsToFood(){
    fiveColor = document.getElementById("5pointsColor").value ;
    fifteenColor = document.getElementById("15pointsColor").value ;
    twentyfiveColor = document.getElementById("25pointsColor").value ;
}

/**
 * sets the time limit chosen by the player
 */
function setPlayerGameTime(){
    gameTime = document.getElementById("timeLimitField").value ;
}

/**
 * sets number of monsters chosen by the player
 */
function setPlayerMonsters(){
    monstersCount = document.getElementById("monstersCount").value ;
}

/**
 * sets the total food count chosen by the player and assign each food type count in proportion to it
 */
function setFoodCount(){

    foodCount = document.getElementById("foodCountField").value ;
    fiveCount = Math.round(foodCount * 0.6) ;
    fifteenCount = Math.round(foodCount * 0.3) ;
    twentyfiveCount = Math.round(foodCount * 0.1) ;

}

/**
 * generate random number in a range given by max and min
 * 
 * @param {number} max max range
 * @param {number} min min range
 */
function randomGenerator(max , min){
    return Math.round(Math.random() * (max-min) + min) ; 
}

/**
 * generate random color 
 * 
 * @return {string}
 */
function randomColorGenerator(){

    var str = "0123456789ABCDEF" ;
    var color ="#" ;
    var rnd ;

    for(var i = 0 ; i < 6 ; i++){
        rnd = Math.round(Math.random()*15);
        color += str[rnd] ;
    }

    return color ;
}

/**
set random game parameters thats acceptable by the game rules 
*/
function randomGameParameters(){
    foodCount = randomGenerator(90,50);
    monstersCount = randomGenerator(3,1);
    fiveColor = randomColorGenerator();
    fifteenColor = randomColorGenerator();
    twentyfiveColor = randomColorGenerator();
    gameTime = randomGenerator(500 , 60);
    fiveCount = Math.round(foodCount*0.6);
    fifteenCount = Math.round(foodCount*0.3);
    twentyfiveCount = Math.round(foodCount*0.1); 
    foodFix();

    
    gameFiveCount = fiveCount;
    gameFifteenCount = fifteenCount;
    gameTwentyfiveCount = twentyfiveCount ;
}

/**
set the player'r parameters from the configurations page 
*/
function setPlayerParameters(){

    var ok ;

    ok = isLegalParameter(document.getElementById("foodCountField").value,maxFoodCount,minFoodCount);
    if(ok === true){
        setFoodCount();
    }else{
        return -1 ;
    }   

    ok = isLegalParameter(document.getElementById("timeLimitField").value,999999,minGameTime);
    if(ok === true){
        setPlayerGameTime();
    }else{
        return -1;
    }
    
    ok = isLegalParameter(document.getElementById("monstersCount").value,maxMonsters,minMonsters);
    if(ok === true){
        setPlayerMonsters();
    }else{
        return -1;
    }
    
    setPlayerColorsToFood();
    foodFix();

    gameFiveCount = fiveCount;
    gameFifteenCount = fifteenCount;
    gameTwentyfiveCount = twentyfiveCount ;

    return 1;
}

/**
 * fixes the problem where the food types does not cover total food due to numbers qualities 
 */
function foodFix(){

    if((fiveCount + fifteenCount + twentyfiveCount) < foodCount){
        fiveCount ++ ;
    }

    if((fiveCount+fifteenCount+twentyfiveCount )> foodCount){
        fiveCount--;
    }
}