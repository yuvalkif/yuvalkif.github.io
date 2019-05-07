

function clockBonusConstructor(timeWorth){

    var clock = new Object();
    var img = new Image();
    img.src = "sprites\\clock.png";

    clock.name = 'clock';
    clock.i = randomGenerator(boardDimentions-1,0);
    clock.j = randomGenerator(boardDimentions-1,0);
    clock.img = img ;
    clock.timeWorth = timeWorth ;
    clock.width = cellWidth ;
    clock.height = cellHeight ;

    clock.placeOnBoard = function(){
        while(board.checkForWall(clock.i,clock.j)){
            clock.i = randomGenerator(boardDimentions-1,0);
            clock.j = randomGenerator(boardDimentions-1,0);
        }
    };


    clock.update = function(){
        if(checkCollision(clock.i,clock.j)){
            addTimeBonus(clock.timeWorth);
            removeGameObject(this);
        }
    };

    clock.render = function(){
        context.drawImage(clock.img , clock.i*cellWidth , clock.j*cellHeight , clock.width , clock.height);
    };

    clock.placeOnBoard();

    return clock ;
}

/**
 * constructor for the multiplying candy object . 
 * when the player reaches this object , the score he gets will be multiplied for fixed amount of time .
 */

function multiplierCandyConstructor(){

    var candy = new Object();
    var candyImg = new Image();
    var randX = randomGenerator(boardDimentions-1,0);
    var randY = randomGenerator(boardDimentions-1,0);

    candyImg.src = "sprites\\candy.png";
    candy.name = "multiplier_candy";
    candy.width = cellWidth ; 
    candy.height = cellHeight ;
    candy.i = randX ;
    candy.j = randY ;
    candy.img = candyImg ;

    /**
     * place the candy on the board on a valid random position
     */
    candy.placeCandyOnBoard = function(){
        while(board.checkForWall(candy.i,candy.j)){
            candy.i = randomGenerator(boardDimentions-1,0);
            canji.j = randomGenerator(boardDimentions-1,0);
        }
    };

    candy.update = function(){
        checkCandyCollision(candy.i , candy.j , shape.i , shape.j);
    };
     
    candy.render = function(){
        context.drawImage(candy.img , candy.i*cellWidth , candy.j*cellHeight , candy.width , candy.height);
    };

    candy.placeCandyOnBoard();

    return candy ;
}

/**
 * constructor for the board object .
 * the board contains a map , which is a 2d array of ints .
 * 
 */

function boardConstructor(){
    
    var board = new Object(); 
    
    board.length = boardDimentions ;
    board.map = new Array();

    //set total food on board
    board.food = foodCount;

    for(var i = 0 ; i < board.length ; i++){
        board.map[i] = new Array();
        for (var j = 0 ; j < board.length ; j++){
            board.map[i][j] = 0;
        }
     }

     /**
      * sets the intervals needed for the game to run .
      */
    board.setIntervals = function(){

        board.interval = setInterval(UpdatePosition, refreshTime);//for player and food
        board.objectsInterval = setInterval(updateObjects , refreshTime+100);//for al other objects
        //board.monsterMoveInterval = setInterval(moveMonsters , 1500);//the time it takes untill the monster's can move
        board.setCandySpawnInterval();
        board.setClockInterval();
        
    };

    board.setClockInterval = function(){
        clockInterval = setInterval(board.spawnClock , (gameTime/2)*1000) ;
    };

    board.spawnClock = function(){

        addGameObject(clockBonusConstructor(clockTimeWorth));

        clearInterval(clockInterval);
    };

    board.checkForWall = function(objX , objY){
        return board.map[objX][objY] === 4 ;
    };

    board.clearIntervals = function(){
        clearInterval(board.interval);
        clearInterval(board.objectsInterval);
        clearInterval(board.monsterMoveInterval);
        clearInterval(board.candySpawningInterval);
        clearInterval(board.removeCandyInterval);
    };

    board.spawnCandy = function(){
        spawnCandy();
        clearInterval(board.candySpawningInterval);//clear the spawning interval so there wont be more than 1 interval active at each time
        board.setCandyRemoveInterval();//start counting for the removal of the candy from the board
        
    };

    board.removeCandy = function(){
        clearInterval(board.setCandyRemoveInterval);
        clearInterval(board.removeCandyInterval);
        removeCandy();
 
        board.setCandySpawnInterval();
    };

    /**
     * sets the interval for spawning the candy object on the board
     */
    board.setCandySpawnInterval = function(){

        board.candySpawningInterval = setInterval(board.spawnCandy , candySpawnTime*1000);
    };

    board.setCandyRemoveInterval = function(){
        board.removeCandyInterval = setInterval(board.removeCandy , candyTime*1000);
    };

    /**
     * build the walls on the board
     */
    board.buildWalls = function(){
        for(var i = 1 ; i < 7 ; i++)
            board.map[1][i] = 4 ;
        
        for(var i = 4 ; i < 16 ; i++)
            board.map[i][1] = 4 ;

        for(var i = 8 ; i < 12 ; i++)
            board.map[i][5] = 4 ;

        for(var i = 3 ; i < 15 ; i++)
            board.map[15][i] = 4 ;

        for(var i = 3 ; i < 8 ; i++)
            board.map[i][10] = 4 ;

        for(var i = 3 ; i < 13 ; i++)
            board.map[i][14] = 4 ;
        
        for(var i = 3 ; i < 14 ; i++)
            board.map[i][18] = 4 ;

        for(var i = 8 ; i < 11 ; i++)
            board.map[1][i] = 4 ;

        for(var i = 16; i < 19 ; i ++){
            board.map[i][5] = 4 ;
            board.map[i][11] = 4 ;
        }

        board.map[8][1] = 0 ;
        board.map[9][1] = 0 ;
        board.map[1][1] = 0 ;
        board.map[15][7] = 0 ;
        board.map[15][8] = 0 ;
        board.map[8][18] = 0 ;
        board.map[9][18] = 0 ;

    };

    /**
     * check if a move is legal in the given board
     * 
     * @return {boolean}
     */
    board.checkLegalMove = function(x,y){
        var res =  (x >= 0 && x < boardDimentions && y >= 0 && y < boardDimentions && board.map[x][y] != 4);

        return res;
    };

    /**
     * checks for all possible moves from the point (originX , originY) and returns all the possible directions
     * an object can take from that point 
     * 
     * @return {array : string}
     */
    board.possibleMoves = function(originX , originY){
      
        var array = new Array();

        if(originX+1 < board.length && board.map[originX+1][originY] != 4)
            array.push('right');
        if(originX-1 >=0 && board.map[originX-1][originY] != 4)
            array.push('left');
        if(originY+1 < board.length && board.map[originX][originY+1] != 4)
            array.push('down');
        if(originY-1 >= 0 && board.map[originX][originY-1] != 4)
            array.push('up');
        
        return array[randomGenerator(array.length-1,0)];

    };

    board.buildWalls();

    return board ;
}

/**
 * constructor for the cake object .
 * this object moves randomly on the board and grants pointsWorth of points on taking 
 * 
 * @param {*} pointsWorth points the player will get from taking the cake 
 */
function cakeConstructor(pointsWorth , updateRate){

    var cake = new Object();
    var cakeImg = new Image();
    var startX = randomGenerator(boardDimentions-1,0);
    var startY = randomGenerator(boardDimentions-1,0) ;
    var rnd = randomGenerator(3,0);
    
    cake.numberOfSteps = 3 ; 
    cake.moves = 0 ;
    cake.directions = ['up','down','left','right'];
    cake.updateRate = updateRate;
    cakeImg.src="sprites\\cake.png";
    cake.points = pointsWorth ;
    cake.img = cakeImg ;
    cake.i = startX ;
    cake.j = startY ;
    cake.name = 'cake' ;
    cake.direction = 'up';
    cake.cakeWidth = cellWidth ;
    cake.cakeHeight = cellHeight ;
    cake.direction = cake.directions[rnd];
    
    cake.move = function(){
        if(cake.direction === 'down')
            cake.moveDown();
        else if(cake.direction === 'up')
            cake.moveUp();
        else if(cake.direction === 'left')
            cake.moveLeft();
        else if(cake.direction === 'right')
            cake.moveRight();

        cake.moves++ ;
    };

    cake.moveRight = function(){
        cake.i++ ;
    };

    cake.moveLeft = function(){
        cake.i-- ;
    };

    cake.moveUp = function(){
        cake.j-- ;
    };

    cake.moveDown = function(){
        cake.j++ ;
    };

    cake.collide = function(){
        score += cake.pointsWorth ;
    };

    cake.update = function(){

        if(cake.moves == 3 || cake.checkLegalMove(cake.i,cake.j) === false){
            cake.direction = board.possibleMoves(cake.i,cake.j);
            cake.moves = 0 ;
        }

        cake.move();
        
    };

    cake.checkLegalMove = function(x,y){

        if(cake.direction === 'up')
            return board.checkLegalMove(x,y-1);
        else if(cake.direction === 'down')
            return board.checkLegalMove(x,y+1);
        else if(cake.direction === 'right')
            return board.checkLegalMove(x+1,y);
        else
            return board.checkLegalMove(x-1,y);
    };

    cake.render = function(){
        context.drawImage(cake.img , cake.i*cellWidth, cake.j*cellHeight , cake.cakeWidth , cake.cakeHeight);
    };


    return cake ;
}

/**
 * constructor for the player object 
 * 
 * @param {*} startX starting x  
 * @param {*} startY starting y
 */
function pacmanConstructor(startX , startY){

    var player = new Object() ; 

    player.name = 'pacman';
    player.i = startX ;
    player.j = startY ;
    player.direction = 'right' ;
    player.life = 3 ;

    player.render = function(){
        var drawDirections = player.drawBy();
  
        context.beginPath();
        context.arc(player.i*cellWidth+cellWidth/2, player.j*cellHeight+cellHeight/2, 15, drawDirections[0] * Math.PI, drawDirections[1] * Math.PI); // half circle
        context.lineTo(player.i*cellWidth+cellWidth/2, player.j*cellHeight+cellHeight/2);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(player.i*cellWidth+cellWidth/2 , player.j*cellHeight+cellHeight/2 , 3, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    };

    player.update = function(){

        if(player.life <= 0)
            endGame();

        if(cakeExists)
            checkCakeCollision(player.i , player.j , cake.i , cake.j);

        checkMonsterCollision();
        

        return ;
    };

    player.moveRight = function(){
        player.direction = 'right' ;
        player.i++;
    };

    player.moveLeft = function(){
        player.direction = 'left' ;
        player.i--;
    };

    player.moveUp = function(){
        player.direction = 'up' ;
        player.j--;
    };

    player.moveDown = function(){
        player.direction = 'down' ;
        player.j++; 
    };

    player.setAtEmptyRandomCell = function(){
        var rndCell = findRandomEmptyCell();

        player.i = rndCell[0];
        player.j = rndcell[1];
    };

    player.strike = function(){
          
        player.life--;
        score -= 10;

       
    }

    /**
     * used by the render function so it can paint the character in the direction of the movement 
     * 
     * @return {array : int}
     */
    player.drawBy = function(){

    if(player.direction === 'right')
        return [0.15,1.85,5,-15] ;

    else if(player.direction === 'left')
        return [1.15,0.85,5,-15] ;

    else if(player.direction === 'down')
        return [0.65,0.35,5,-15];

    else if(player.direction === 'up')
        return[1.65,1.35,10,15] ;   
    };

    return player ;

}

/**
 * constructor for the monster object
 * 
 * @param {*} startX starting x
 * @param {*} startY starting y
 */
function monsterConstructor(startX , startY , updateRate){

    var monster = new Object();
    var monsterImg = new Image();

    monsterImg.src = "sprites\\viking.png" ;
    monster.name = 'monster';
    monster.i = startX ;
    monster.j = startY ;
    monster.updateRate = updateRate ; 
    monster.img = monsterImg ;


    monster.move = function(){

        var userPos = userPosition();
        var deltaX = monster.i - userPos[0] ;
        var deltaY = monster.j - userPos[1] ;
        var rnd = randomGenerator(1,0);

         if(deltaX > 0){//so monster on the right of the player
            if(deltaY === 0)
                monster.moveLeft();
            else if(deltaY > 0 )
                if(rnd <= 0.5 )
                    monster.moveUp();
                else
                    monster.moveLeft();
            else
                if(rnd <= 0.5)
                    monster.moveDown();
                else
                    monster.moveLeft();

         }else if(deltaX < 0){
            if(deltaY === 0)
                monster.moveRight();
            else if(deltaY > 0)
                if(rnd <= 0.5)
                    monster.moveUp();
                else
                    monster.moveRight();
            else
                if(rnd <= 0.5)
                    monster.moveDown();
                else
                    monster.moveRight();

         }else if(deltaX === 0){
             if(deltaY < 0)
                monster.moveDown();
             else
                monster.moveUp();
         }

    };

    monster.moveRight = function(){
        if(board.checkLegalMove(monster.i+1,monster.j))
            monster.i++ ;
    };

    monster.moveLeft = function(){
        if(board.checkLegalMove(monster.i-1,monster.j))
            monster.i-- ; 
    };

    monster.moveDown = function(){
        if(board.checkLegalMove(monster.i,monster.j+1))
        monster.j++ ;
    };

    monster.moveUp = function(){
        if(board.checkLegalMove(monster.i,monster.j-1))
            monster.j-- ;
    };

    monster.render = function(){
        context.drawImage(monster.img,monster.i*cellWidth,monster.j*cellHeight,cellWidth,cellHeight);
    };

    monster.update = function(){

        checkMonsterCollision();
        monster.move();
    };

    monster.setX = function(newX){
        monster.i = newX ;
    };

    monster.setY = function(newY){
        monster.j = newY
    };

    return monster ;
}

/**
 * spawn monsters in the number specified by count
 * 
 * @param {int} count number of monsters to spawn 
 */
function spawnMonsters(count){

    var monsterRate = 15;
    var startCords = [0,0,boardDimentions-1,boardDimentions-1,0,boardDimentions-1];
    var i = 0 ;

    while(count > 0){//add the monsters to the gameObjects array so they are updated and rendered
        addGameObject(monsterConstructor(startCords[i],startCords[i+1],monsterRate)) ; 
        count-- ;
        i += 2;
    }

}

/**
 * check if the player and a monster collides
 */
function checkMonsterCollision(){

    var tempMonster ;

    for(var i = 0 ; i < gameObjects.length ; i++){
        if(gameObjects[i].name !== 'monster')
            continue;
        
        tempMonster = gameObjects[i] ;

        if(tempMonster.i === shape.i && tempMonster.j === shape.j){
            monsterStrike();//apply being hit by a monster
        }
    }

}

/**
 * check if the player got to the cake
 * 
 * @param {*} playerX player x at the time 
 * @param {*} playerY player y at the time
 * @param {*} cakeX cake x at the time
 * @param {*} cakeY cake y at the time 
 */
function checkCakeCollision(playerX , playerY , cakeX , cakeY){
  
    if(cakeX === playerX && cakeY === playerY){
        score += cake.points;
        cakeExists = false ;
        removeGameObject(cake);
    }
}

/**
 * remove an object from the gameObjects array
 * 
 * @param {object} obj 
 */
function removeGameObject(obj){
        
    var temp ; 
    var tarr = new Array();
    var i = gameObjects.length;

    while(i > 0 ){

        temp = gameObjects.pop();
        if(temp.name !== obj.name)
            tarr.push(temp);

        i-- ;
    }

    i = tarr.length ; 
    while(i > 0){
        gameObjects.push(tarr.pop());
        i-- ;
    }

}

/**
 * add an object to the gameObjects array
 * 
 * @param {object} obj 
 */
function addGameObject(obj){

    gameObjects[gameObjects.length] = obj ;
}

/**
 * add bonus game time
 * 
 * @param {int} timeToAdd bonus time to be added 
 */
function addTimeBonus(timeToAdd){

    var time = parseInt(gameTime);
    
    gameTime = time + timeToAdd ;
    setTotalTime();
    setGameTimeInterval(parseInt(time - time_elapsed + timeToAdd));
}

function checkCollision(objX , objY){

    return objX === shape.i && objY === shape.j ;
}

/**
 * check if the player got to the candy
 * 
 * @param {int} candyX candy x at the time 
 * @param {int} candyY candy y at the time
 * @param {int} shapeX players x at the time
 * @param {int} shapeY player y at the time
 * 
 * @return {boolean}
 */
function checkCandyCollision(candyX , candyY , shapeX , shapeY){

    var res = (candyX === shapeX && candyY === shapeY);

    if(res){
        scoreMultiplier = 2 ;
        board.removeCandy();//remove the candy from the board
        setMultiplyTimer();//set the timer for the multiply to hold
    }

    return res ;
}
