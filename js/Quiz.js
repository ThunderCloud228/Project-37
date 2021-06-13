class Quiz 
{
  constructor() {
    this.title = createElement('h1');
    //this.reset = createButton('Reset');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data) {
       gameState = data.val();
    });

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play()
  {
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(25);
    text("Result of the Quiz",310,0);
    

    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfo is not undefined
    if(allContestants !== undefined) {

      //write code to add a note here
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are highlighted in green colour!", 130, 250);

      var displayPosition = 300;
      for(var plr in allContestants) 
      {
          var correctAns = "2";
          if(correctAns !== allContestants[plr].answer) 
          {
              fill("red");
              text(allContestants[plr].name + ": " + allContestants[plr].answer, 225, displayPosition);
          }
          else {
              fill("green");
              text(allContestants[plr].name + ": " + allContestants[plr].answer, 225, displayPosition);
          }
          displayPosition += 40;
      }
    }
  }
}
