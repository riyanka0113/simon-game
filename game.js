var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function(){
	if(!start){
		nextSequence();
		start = true;
	}
});

$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	//console.log(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel)
{
	if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
		if (userClickedPattern.length === gamePattern.length){
        		setTimeout(function () {
          			nextSequence();}, 1000
			);
      		}
    	} 
	else {
      		playSound("wrong");
      		$("body").addClass("game-over");
      		$("#level-title").text("Game Over, Press Any Key to Restart");
      		setTimeout(function () {
        		$("body").removeClass("game-over");}, 200
		);
		startOver();
	}
}

function nextSequence()
{
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level "+level);
	var randomNumber = Math.floor(Math.random() *4);
	var randomChoseColour = buttonColours[randomNumber];
	gamePattern.push(randomChoseColour);
	btn = $("#"+randomChoseColour);
	btn.fadeToggle(100).fadeIn(100);
	playSound(randomChoseColour);
}

function playSound(name)
{
	var audio =  new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColour)
{
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");},100
	);
}

function startOver()
{
	gamePattern = [];
	level = 0;
	start = false;
}