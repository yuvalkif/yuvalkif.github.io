//close window by X


//close window by ESC

//close window by outclick


//get the Modal

//focus the Modal (?)

//the gets are for the JS file!!

//get the modal wit jquery or ajax

//we are scripting the elements function, the name chosen in the HTML file.

//the event can be caught inside the function args --> func(input (where this input is coming from? ) , callback )


// Get the modal
var modal = document.getElementById('aboutModal');

// Get the button that opens the modal
var modalOpener = document.getElementById('modalOpener');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
modalOpener.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$(document).keydown(function(e) { 
	//if click esc
    if (e.keyCode == 27) { 
        modal.style.display = "none";

    } 
});
