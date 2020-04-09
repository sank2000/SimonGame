var gamePattern = [];
var level = 0;
var clickC = 0;
var start = false ;
var userClickedPattern = [];

alert("It is a brain game....  At each level one new color will be added to sequence you should remember and reproduce that sequence of color")

var buttonColours = ["red", "blue", "green", "yellow"];

$(".Cbtn").hide();
function nextSequence()
{
    $(".Cbtn").hide();
    userClickedPattern = [];
    clickC=0;
    level++;
    $("h1").text("LEVEL "+level);
    setTimeout(function()
    {
      $("h3.count").text("("+level+"  more  click)"); 
    },50);
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
}


$(".btn").on("click",function()
{
  if(gamePattern.length===0)
  {
    return;
  }
  clickC++;
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  $("h3.count").text("("+(level-clickC)+" more click )");   
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function()
{
  if(start===false)
  {
    $("h3.count").show();
    nextSequence();
    start=true;
  }
});

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(() => { $("#"+currentColour).removeClass("pressed");  }, 100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
      if(gamePattern.length===userClickedPattern.length)
      {
        setTimeout(function()
        {
          nextSequence();
        },1000)
      }
  }
  else
  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".Cbtn").show();
    $("h3.count").hide();
    startOver();
  }
}


function startOver()
{
  level =0 ;
  gamePattern =[];
  start=false;
}
$(".click").on("click",function()
{
  if(start===false)
  {
    $("h3.count").show();
    nextSequence();
    start=true;
  }
});