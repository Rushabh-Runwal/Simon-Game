var buttonColours=["red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern= [];
var level=0;
var GameIsOn = false;

$(document).keydown( function(){
	
	if(!GameIsOn) {
	GameIsOn = true;
	nextSequence();
	}
  }
);

$(".btn").click(function(){
	
	var userChosenColour = $(this).attr("id"); //this.classList[1];
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length -1);
	
});


function checkAnswer(currentLevel) {

		if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

			console.log("right"); //ON level "+level+".."+userClickedPattern +"// "+gamePattern );
			
			if(gamePattern.length === userClickedPattern.length){
			setTimeout(function(){ 
				nextSequence();
			 },1000);
			}
			
		}
		else{
			

			console.log("Game Over");
			$("body").addClass("game-over");
			setTimeout(function(){
			$("body").removeClass("game-over");
			},200);
			$("#level-title").text("Game Over, Press Any Key to Restart");
			startOver();
		}		

}

function nextSequence(){
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  console.log(gamePattern);
  playSound(randomChosenColour);
	
  $("#level-title").text("level "+level);

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
	
}

function animatePress(currentColour){
	$("."+currentColour).addClass("pressed");
	setTimeout(function(){ $("."+currentColour).removeClass("pressed"); }, 100);
}

function startOver(){
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	GameIsOn = false;	
}

//****************************************************************











