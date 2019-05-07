
/**
 * check if the username and password entered by the user are registered in the system
 * 
 * @param {string} username username entered 
 * @param {string} password password entered
 *
 * @return {boolean}
 */
function validateSignIn(username , password){
        
    var index = usersArray.indexOf(username);
    
    if(index != -1){
        if(usersArray[index+1] == (password)){
            setCurrentPlayer(usersArray[index]);
            return true;
        }
    }

    return false;
}

function setCurrentPlayer(name){
    document.getElementById("pname").innerHTML = name ;
}


/**
 * checks if first and last name entered are legal
 * 
 * @param {string} fname first name enetered 
 * @param {string} lname last name enetered
 * 
 * @return {boolean}
 */
function checkLegalNames(fname , lname){

    var i = 0;
    var code = 0 ;

    while(i < fname.length){

        code = fname.charCodeAt(i);
        if(code >= 48 && code <= 57){
            return false;
        }
        i += 1 ;
    }

    i = 0;

    while(i < lname.length){
        code = lname.charCodeAt(i);
        if(code >= 48 && code <= 57){
            return false;
        }

        i += 1;
    }

    return true;
}

/**
 * checks if the password entered by the user in registration is legal
 * 
 * @param {string} password
 * 
 * @return {boolean} 
 */
function checkLegalPassword(password){

    var i = 0;
    var char = false ;
    var num = false;
    var code = 0;
    
    while(i < password.length){
        code = password.charCodeAt(i);
        if((code >= 97 && code <= 122)|| (code >= 65 && code <= 90)){
            char = true ;
        }

        else if(code >= 48 && code <= 57){
            num = true;
        }

        i += 1;
    }

    return (char == true && num == true);
}

/**
 * check if all the fields entered by the user in the registration page is legal
 * 
 * @return {boolean}
 */
function checkSignupFields(){
    
    var uname = $('#unamefield').val() ;
    var pass = $('#passfield').val() ;
    var email = $('#efield').val() ;
    var date = $('#datepicker').val() ;
    var lname = $('#lnamefield').val() ;
    var fname = $('#fnamefield').val() ;

    
    var i = 0 ;

    if(lname == '' || fname == '' || uname == '' || pass == '' || email == '' || date == ''){
        return false ;
    }

    if(pass.length < 8 || checkLegalPassword(pass) == false){
        return false ;
    }

    if(checkLegalNames(fname,lname) == false){
        return false ;
    }

    if(email.indexOf('@') <= 0){
        return false ;
    }

    return true ;
}

/**
 * add new user and password to the users array
 */
function addUserAndPass(){

    var username = document.getElementById("unamefield").value ;
    var pass = document.getElementById("passfield").value ;

    usersArray.push(username);
    usersArray.push(pass);

}


/**
 * resets the values in the fields - cosmetic only
 */
function resetFields(){
    document.getElementById("fnamefield").value = "";
    document.getElementById("lnamefield").value = "";
    document.getElementById("passfield").value = "";
    document.getElementById("efield").value = "";
    document.getElementById("unamefield").value = "";
    document.getElementById("datepicker").value = "";
}
