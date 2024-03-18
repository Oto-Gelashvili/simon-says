var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var highScore = 0;
function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    var buttonId = "#" + randomChosenColour;
    $(buttonId).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
    if(level > highScore){
        highScore++;
    }
    $("h1").text("level " + level);
    $("h2").html("High score: " + highScore);
    
};
$(document).on("keypress touchstart",function(event){
    if(gameStarted == false){
        nextSequence();
        gameStarted = true;
    }
});
$(".btn").click(function(){
        if(gameStarted == true && gamePattern.length > userClickedPattern.length){
            var userChosenColour = $(this).attr("id");
            playSound(userChosenColour);
            animatePress(userChosenColour);
            userClickedPattern.push(userChosenColour);
            checkAnswer();
        }
});

function playSound(name){
    var buttonSound = new Audio("./sounds/" + name + ".mp3");
    buttonSound.play();
};
function animatePress(currentColour){
        $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
};
function checkAnswer(){
    if (userClickedPattern.length < gamePattern.length) {
        for(var j=0;j < userClickedPattern.length; j++){
            if(userClickedPattern[j] != gamePattern[j]){
                $("h1").text("Game over, press a key to restart");
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(function() {
                    $("body").removeClass("game-over");
                }, 100);
                gameStarted = false; 
                gamePattern = [];
                level = 0;
                return;
            }
        }
    }
    if (userClickedPattern.length == gamePattern.length) {
        for(var i=0;i < gamePattern.length; i++){
            if(userClickedPattern[i] != gamePattern[i]){
                $("h1").text("Game over, press a key to restart");
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(function() {
                    $("body").removeClass("game-over");
                }, 100);
                gameStarted = false;
                gamePattern = [];
                level = 0;
                return;
            }
        }
        setTimeout(function() {
            nextSequence();
        }, 1000);
    
    }
};
