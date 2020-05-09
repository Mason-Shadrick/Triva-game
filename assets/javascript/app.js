$(document).ready(function(){
    //variables to be updated with code
    var correctAns = 0;
    var wrongAns = 0;
    var unAnsQuestions = 0;
    var timeRemain = 15;
    var intervalID;
    //index lets us load diff questions without game reset
    var indexQandA = 0; 
    //stopping timer when answer is clicked
    var answered = false; 
    //which answer is right
    var correct;
    //listing questions with choices and correct answer 
    var triviaGame = [{
        question: "How many seasons of Community are there?",
        answer:["Three", "Six", "Eight", "Twelve"],
        correct: "1",
    }, {
        question: "What was Jeff's former occupation?",
        answer: ["Doctor", "Artist", "Lawyer", "A/C Repairman"],
        correct: "2"
    }, {
        question: "Which of these characters went to highschool with Annie?",
        answer: ["Troy", "Pierce", "Abed", "Britta"],
        correct: "0"
    }, {
        question: "What name did Ben Chang go by when he had 'Chang-neasia'",
        answer: ["Sylas", "Kevin", "Richard", "None of the above"],
        correct: "1"
    }, {
        question: "Shirley asks Abed to make a Christian movie telling the story of Jesus in season 2, What was the name of the movie he makes?",
        answer: ["Jesus: The Story of HIM", "The Newest New Testament", "Real Talk with the Lord", "ABED"],
        correct: "3"
    }, {
        question: "Why does Troy leave Greendale?",
        answer: ["To sail around the world", "He dropped out of school", "He was killed", "To join a new study group"],
        correct: "0"
    }];

    //Functions!

    //game start
    function startGame(){
        console.log("game start")
        $('.start-button').remove();
        correctAns = 0;
        wrongAns = 0;
        unAnsQuestions = 0;
        loadQandA();
    }
    //loading questions from variable
    function loadQandA(){
        answered = false;
        timeRemain = 15
        intervalID = setInterval(timer, 1000)
        if (answered === false){
            timer();
        }
        //showing question and answers on page
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++){
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class = answersAll id=' + i + '>' + answer + '</h4></br>');
            $('.answersAll').css({'background-color': 'lightpink'})
        }
        // on clicks for answers
        $("h4").on("click", function(){
            var id = $(this).attr('id');
            if (id === correct){
                //stop timer
                answered = true;
                //show you got it right text
                $('.question').text("Thats Right! Nice Job!!")
                correctAnswer();
            } else {
                //stop timer
                answered = true
                //show you got it wrong text and what the right answer was
                $('.question').text("Incorrect!! The right answer is: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });

    }
    //Timer function to dosply on html
    function timer(){
        if (timeRemain === 0){
            //stop timer
            answered = true;
            clearInterval(intervalID);
            $('.question').text("The right answer is: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true){
            clearInterval(intervalID);
        } else{
            timeRemain--;
            $('.timeRemaining').text('You have ' + timeRemain + " seconds to choose!")
        }
    }
    //reset on win replacing time with the you got it right text then reset
    function correctAnswer(){
        correctAns++;
        $(".timeRemaining").text("You Answered Right!!");
        resetRound();
    }

    //same as the last function but with losing instead
    function incorrectAnswer(){
        wrongAns++;
        $(".timeRemaining").text("You Answered Wrong!! :(");
        resetRound()
    }

    //same as last two but with unasnwered instead
    function unAnswered(){
        unAnsQuestions++;
        $(".timeRemaining").text("You didnt choose anything???");
        resetRound();
    }

    //reseting the round with a new question on page
   function resetRound(){
    $('.answersAll').remove();
    //adds to index and loads next question whenever loadQandA is called
    indexQandA++;
    if(indexQandA < triviaGame.length){
        setTimeout(function(){
            loadQandA();
        }, 5000);
    } else {
        setTimeout(function () {
            $('.question').remove();
            $('.timeRemaining').remove();
            $('.answerImage').remove();
            $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAns + '</h4>');
            $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + wrongAns + '</h4>');
            $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unAnsQuestions + '</h4>');
            setTimeout(function () {
                location.reload();
            }, 7000);
        }, 5000);

    }
   


    }




    $('.startButton').on("click", function(){
        $('.startButton');
        startGame();
    })

})