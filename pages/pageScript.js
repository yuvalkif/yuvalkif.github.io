 
/**
 * move from source page to target page
 * 
 * @param {string} source the source page id 
 * @param {string} target the target page id
 */
function moveToPage(source,target){
    $(source).hide();
    $(target).show();
}

/**
 * show only the target page
 * 
 * @param {string} target id of the target page 
 */
function showPage(target){

    $('#game').hide();
    $("#configurations").hide();
    $("#signup").hide();
    $("#login").hide();
    $("#welcome").hide();
    $(target).show();
}

//set the size of the window
$(document).ready(function(){
    $(window).width(defWidth);
    $(window).height(defHeight);
    $(window).focus();

    $('#game').hide();
    $("#configurations").hide();
    $("#signup").hide();
    $("#login").hide();
    $("#welcome").show();
});

/**
add listeners to buttons 
*/
$(document).ready(function(){
    document.getElementById("signinbtn").addEventListener("click",function(){
        moveToPage('#welcome','#login');
    },true);

    document.getElementById("signupbtn").addEventListener("click",function(){
        moveToPage('#welcome','#signup');
        resetFields(); //clear input fields
    },true);

    document.getElementById("doneSignUp").addEventListener("click",function(){
        
        var ok = checkSignupFields();

        if(ok == true){
            addUserAndPass();
            alert('added username');
            moveToPage('#signup','#welcome');
        }else{
            alert('Please fill all fields by the instructions');
        }

    },true);

    document.getElementById("backFromSignUpToWelcome").addEventListener("click",function(){
        moveToPage('#signup','#welcome');
    },true);

    /**
    handler for signing in . 
    after a successful sign-in , show the configurations page for the player to choose his parameters . 
    when clicking on "Done" , go to the game . this handler will be in a seperate function .
    */
    document.getElementById("doneSignIn").addEventListener("click",function(){
        var ok = validateSignIn(document.getElementById("usernameInput").value , document.getElementById("passwordInput").value);

        if(ok == true){
            moveToPage('#login','#configurations');
        }
        else if(ok == false){
            alert('Wrong username or password .');
        }

    },true);

    document.getElementById("backFromSignInToWelcome").addEventListener("click",function(){
        moveToPage('#login','#welcome');
    },true);

    /**
    handler for random option in configurations
    */
    document.getElementById("configRandom").addEventListener("click",function(){
        randomGameParameters();
        moveToPage('#configurations','#game');
        setMovementKeys();
        Start();
    },true);

    /**
    handler for confirming the player's parameters in the configurations page 
    */
    document.getElementById("configDone").addEventListener("click",function(){
        var status ;
        status = setPlayerParameters();
        if(status === -1){
            alert('One or more parameters are illegal')
            return ;
        }
        setMovementKeys();
        moveToPage('#configurations','#game');
        Start();
    },true);

    document.getElementById('restartbtn').addEventListener("click",function(){
        
        board.clearIntervals();
        clearInterval(gameTimeInterval);
        fiveCount = gameFiveCount ;
        fifteenCount = gameFifteenCount ;
        twentyfiveCount = gameTwentyfiveCount ;
       
        Start();

    } , true);

    winndow.addEventListener("keydown",function(event){
        alert(event.code);
    });

});

/**
 * sets the current key code pressed
 * 
 * @param {object} event the event 
 * @param {string} inputId id of the field on focus 
 */
function getKeyCode(event,inputId){
    
    document.getElementById(inputId).value = ""+event.code;
    currentCode = ""+event.code ;

}

/**
 * fix a problem where the code get concatenated with the letter pressed e.g. keyDd
 * 
 * @param {string} id id of the field on focus 
 */
function fixKeyCodes(id){
    document.getElementById(id).value = ""+currentCode ;
}


/**
 * sets the movement keys as chosen by the player 
 */
function setMovementKeys(){

    leftKey = document.getElementById('lkey').value ;
    rightKey = document.getElementById('rkey').value ;
    upKey = document.getElementById('ukey').value ;
    downKey = document.getElementById('dkey').value ;
    
}
