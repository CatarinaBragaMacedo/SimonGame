
//Array to hold the colors
let buttonColors = ["red", "blue", "green", "yellow"];

//Array to hold the game pattern
let gamePattern = [];

//Array to hold values of userChosenColor variable
let userClickedPattern=[]


//jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click( function(){
    // userChosenColor holds the id of the button that got clicked
    let userChosenColor = $(this).attr("id");

    //Add the contents of the variable userChosenColour to the end of userClickedPattern array
    userClickedPattern.push(userChosenColor);

    //Plays sound when user clicks on the button
    playSound(userChosenColor)

    //Passes the pressed button to the animatePress()
    animatePress(userChosenColor);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
});


//Function to generate a random number between 0 and 3
function nextSequence() {
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = []
    
    //Increase the level by 1 every time nextSequence() is called
    level++;

    //Update the h1 with the value of the level been played
    $("#level-title").text("Level " + level);

    //Generates a random number between 1 and 3
    let randomNumber = Math.floor(Math.random() * 4);

    //New variable randomChosenColor to store the random color
    let randomChosenColor = buttonColors[randomNumber];

    //Add the new randomChosenColor to the end of the gamePattern array
    gamePattern.push(randomChosenColor);

    //jQuery select the button with the same ID as the randomChosenColor and animate it with a flash
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //Refactoring the code in playSound() so it work for both playing sound in nextSequence() and when the user clicks a button
    playSound(randomChosenColor)

    //return randomChosenColour;
}


//Function to play sound that takes one parameter called name
function playSound (name) {

    //JS to play the sound for each button color selected
    let audio = new Audio("sounds/" + name + ".mp3");
 
    audio.play();
}
 

//Function to animate the buttons with a CSS class, it takes one parameter called currentColor
function animatePress(currentColor) {
    //Use jQuery to add this pressed class to the button that gets clicked inside animatePress()
    $('#' + currentColor).addClass('pressed')
    
    //JS to remove the pressed class after 100 milliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}



//Variable to keep track of whether the game has started or not in order to only call nextSequence() on the first keypress
let started = false

//Variable to hold the level been played
let level = 0

//Detect when a keyboard key has been pressed with jQuery, once it happens call nextSequence()
$(document).keydown(function() {
    if (!started) {
      //Change the text on h1 to "Level 0..."
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true; //This will change the initial value of started to true
    }
  });



//Function to check the answer from the user
function checkAnswer(currentLevel) {

    //Check if the most recent user answer is the same as the game pattern
    //If so then log "success", otherwise log "wrong"
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
        console.log("success");
    
        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
    
        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            nextSequence();
        }, 1000);
        }
    } else {
        console.log("Wrong")
        //JS to play the sound for if the user choses the wrong color
        playSound("wrong")

        //Use jQuery to add the css game-over class once the user gets one of the answers wrong and then remove it after 200 milliseconds
        $('body').addClass('game-over')

        //Change the h1 title
        
        setTimeout(function() {
        $('body').removeClass('game-over')
        }, 200)

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver()

    }
}

function startOver() {
    //alert('hey')
    level = 0
    started = false
    gamePattern = []
}








































/* 
//Array to hold values of userChosenColor variable
var userClickedPattern = [];
 
//Array to hold the game pattern
var gamePattern = [];
 
//Array to hold the colors
var buttonColors = ["red", "blue", "green", "yellow"];
 
//jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
 
  //var userChosenColor holds the id of the button that got clicked
 
  var userChosenColor = $(this).attr("id");
 
  //Add the contents of the variable userChosenColor to the end of userClickedPattern array
  userClickedPattern.push(userChosenColor);
 
  //Plays sound when user clicks on the button
  playSound(userChosenColor);
 
  //Passes the pressed button to the animatePress()
  animatePress(userChosenColor);
 
  console.log("Button clicked: " + userClickedPattern);
 
  //Call checkAnswer() after the user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);
 
});
 
//Function to generate a random number between 0 and 3
function nextSequence() {
 
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];
 
  //Increase the level by 1 every time nextSequence() is called
  level++;
 
  //Update the h1 with the value of the level been played
  $("#level-title").text("Level " + level);
 
  //Generates a random number between 1 and 3
  var randomNumber = buttonColors[Math.floor(Math.random() * 4)];
 
  //New variable randomChosenColor to store the random color
  var randomChosenColor = randomNumber;
 
  //Add the new randomChosenColor to the end of the gamePattern array
  gamePattern.push(randomChosenColor);
 
  //jQuery select the button with the same ID as the randomChosenColor and animate it with a flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
 
  //Refactoring the code in playSound() so it work for both playing sound in nextSequence() and when the user clicks a button
  playSound(randomChosenColor);
 
  //return randomChosenColor;
 
}
 
//Function to play sound that takes one parameter called name
function playSound(name) {
  //JS to play the sound for each button color selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
 
//Function to animate the buttons with a CSS class, it takes one parameter called currentColor
function animatePress(currentColor) {
  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress()
  $("#" + currentColor).addClass("pressed");
 
  //JS to remove the pressed class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
 
//Variable to keep track of whether the game has started or not in order to only call nextSequence() on the first keypress
var started = false;
 
//Variable to hold the level been played
var level = 0;
 
//Detect when a keyboard key has been pressed with jQuery, once it happens call nextSequence()
$(document).keypress(function() {
  if (!started) {
    //Change the text on h1 to "Level 0..."
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
 
//Function to check the answer from the user
function checkAnswer(currentLevel) {
  //Check if the most recent user answer is the same as the game pattern
  //If so then log "success", otherwise log "wrong"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
 
    //if the user got the most recent answer right on the check above, then check that they have finished their sequence with another if statement
        if (userClickedPattern.length === gamePattern.length) {

        //Call nextSequence() after a 1000 millisecond delay
        setTimeout(function() {
        nextSequence();
        }, 1000);
        }
        } else {
            //JS to play the sound for if the user choses the wrong color
            //var audio = new Audio("sounds/wrong.mp3");
            //audio.play();
            playSound("wrong");

            //Use jQuery to add the css game-over class once the user gets one of the answers wrong and then remove it after 200 milliseconds
            $('body').addClass('game-over');
        
            //Change the h1 title
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function() {
            $('body').removeClass('game-over');
            }, 200);
            console.log("Wrong");
            
        }
}

*/









