var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var highScore = 0;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    var buttonId = "#" + randomChosenColour;
    $(buttonId).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    if(level >highScore){
        highScore++;
    }
    $("h2").html("High score: " + highScore)
};
$(document).on("keypress",function(event){
    if(gameStarted == false){
        nextSequence();
        gameStarted = true;
        $("h1").text("level " + level);
    }
});
// Add a delay before the next sequence
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
                userClickedPattern = [];
                gamePattern = [];
                level = 0;
                gameStarted = false;
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
                userClickedPattern = [];
                gamePattern = [];
                level = 0;
                gameStarted = false;
                return;
            }else if(highScore == 85){
                $("h1").text("You win, press a key to restart");
                playSound("win");
                $("body").addClass("win");
                setTimeout(function() {
                    $("body").removeClass("win");
                }, 100);
                userClickedPattern = [];
                gamePattern = [];
                highScore = 0;
                level = 0;
                gameStarted = false;
                return;
            }
        }
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
            $("h1").text("level " + level);
        }, 1000);
    
    }
};
