$(document).ready(function() {
  var questionArr = ['Game of Thrones: How did Hodor get his name?', 'Narcos: Who was Pablo Escobar?','Stranger Things: What is the name of Dustin\'s unsual disorder?','Daredevil: What memento of his late father does Wilson Fisk keep close?','House of Cards: Frank said to his wife, Claire, \"I loved her more than _____.\"','Orange Is The New Black: Piper Chapman was sentenced to serve how many years in Litchfield?','Sense 8: Sensate that  trying to protect others from a similarly empowered called "..............."','13 Reasons Why: Who made the "Hot/Not" List?','WestWorld: The creator of the show also created ______.','Silicon Valley: Who said: “You guys taking this all in? This is what it looks like when Google acquires your company for over $200M!…Kid Rock is the poorest person here, apart from you guys!”'];

  var answerArr = [['During a seziure while yelling "Hold the door"','From his mom','He likes the name Hodor','Because Hodor'],['DEA Agent', 'Columbian Police Chief','Columbian Lawyer','Leader of Medellin Cartel'],['Glaucoma','Asperger\'s Syndrome','Cleidocranial Dysplasia', 'Alzheimer\'s Disease'],['Glasses','Cuff links','Bowling Ball','Cane'], ['Sharks love blood', 'America\'s Stupid Treasury','This World','Thelma loved Louse'],['1 Year','12 years','9 Months','15 Months'],['Whispers','Shouting','Voices','Neets'],['Zach Dempsey','Justin Foley','Alex Standall', 'Clay Jensen'],['Avengers','Avatar','Jurassic Park','Wonder Woman'],['Big Head','Richard','Dinesh','Erlich']];

  // Image Array
  var imgArr = ['images/hodor.gif','images/pablo.gif','images/dustin.gif','images/tenor.gif','images/underwood.gif','images/orange.gif','images/sense8.gif','images/hannah.gif','images/westworld.gif','images/silicon.gif'];


  // Correct answer indices Array
  var ansIndex = [0,3,2,1,0,3,0,2,2,3];
  var letters = ['A','B','C','D'];


  // Global Variables
  var question = $('#question');
  var answer1 = $('#ans1');
  var answer2 = $('#ans2');
  var answer3 = $('#ans3');
  var answer4 = $('#ans4');
  var result = $('#result');
  var index = 0; // Question Index
  var wins = 0;
  var losses = 0;
  var timer = 30;
  var isBtnPressed = false;
  var gameOver = false;
  var intervalID;


  // loadQuestion function
  var loadQuestion = function(){
    if (!gameOver){
      // Starts countdown timer
      $('#timer').text('Countdown Timer: '+timer+' Seconds left.')
      intervalID = setInterval(function(){
        countDown();
      },1000);

      isBtnPressed = false;
      result.hide(); // hides result element.

      // Adds the question and answers
      question.text(questionArr[index]);
      answer1.text("A. " + answerArr[index][0]);
      answer2.text("B. " + answerArr[index][1]);
      answer3.text("C. " + answerArr[index][2]);
      answer4.text("D. " + answerArr[index][3]);
    }
    else{
      // Display Gameover
      showGameOver();
    }
  }

  // Loads intial questions
  loadQuestion();

  // Display results
  var displayRes = function(win){
    var resultTag = $('<p>');
    // Display results for correct answer
    if (win){
      resultTag.text("Congrats! You were Correct!");
    }
    // Display results for incorrect answer
    else{
      resultTag.text("Sorry! You were incorrect! The correct answer is " + letters[ansIndex[index]] + ".");
    }

    // Fill Result element with content
    var img = $('<img>');
    var resultPTag = $('<p>');
    // resultPTag.text('Hold the door!')
    img.attr('src',imgArr[index]);
    result.empty();
    result.append(resultTag);
    result.append(img);
    result.append(resultPTag);
    result.show();

    // Increment to next slide in 4 seconds
    timer = 30;
    index++; // Increments array index selector
    setTimeout(function(){
      loadQuestion();
    },4000);

    // Checks to see if game is over
    if(index > questionArr.length-1){
      gameOver = true;
    }

    // Scrolls the page down to see the results
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  }

  // Displays Game Over function
  var showGameOver = function(){
    clearInterval(intervalID);
    question.text('Thank you for taking the trivia!');
    answer1.text('Click here to take the quiz again.');
    result.text('Correct Answers: ' + wins + ', Incorrect Answers: ' + losses);
    $('#answer2').hide();
    $('#answer3').hide();
    $('#answer4').hide();
    $('#timer').hide();
  }

  // Restarts the game
  var resetGame = function(){
    wins = 0;
    losses = 0;
    timer = 30;
    gameOver = false;
    index = 0;
    isBtnPressed = false;
    loadQuestion();
    $('#answer2').show();
    $('#answer3').show();
    $('#answer4').show();
    $('#timer').show();
  }

  // Timer function
  var countDown = function(){
    if (timer > 0){
      timer--;
      $('#timer').text('Countdown Timer: '+timer+' Seconds left.')
    }
    else{
      clearInterval(intervalID);
      losses++;
      displayRes(false);
    }
  }

  // Click function for buttons
  $('.answerBtn').on('click',function(){
    btnTrigger($(this));
  });

  // Triggers event when button is pressed
  var btnTrigger = function(btn){
    if(!isBtnPressed){
      isBtnPressed = true;

      // Removes active selector on button after 4 seconds.
      setTimeout(function(){
        btn.blur(); // btn.blur() removes the button depressed styling so that you won't see it when the trivia switches to the next question.
      },4000);

      // Stops Timer
      clearInterval(intervalID);

      if (btn.attr('value')-1 === ansIndex[index]){
        // Correct answer
        wins++;
        displayRes(true);
      }
      else {
        // Incorrect answer
        losses++;
        displayRes(false);
      }
    }
    else if(gameOver){
      resetGame();
      btn.blur(); // removes depressed button styling.
    }
  }



});
