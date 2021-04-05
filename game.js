let buttonColors=["red", "blue", "green", "yellow"];
let gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
  $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(".btn").click(function() {
  var userChosenColour=  $(this).attr("id"); // or this.id would also work
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name1){
  var audio = new Audio("sounds/" + name1 + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
   setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

  if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("pressed");
   setTimeout(function() {
    $("body").removeClass("pressed");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  }
  startOver();
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

