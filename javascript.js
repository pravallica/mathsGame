var playing = false;
var score;
var timeRemaining;
var correctAnswer;

//start game
document.getElementById("startReset").onclick = function(){

    //if playing
    if(playing == true){

        //reload page
        location.reload();
    }

    // if not playing
    else {

        //start playing and set to true
        playing = true;

        //set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        //show timer box
        show("timeRemaining");
        timeRemaining=60;
        document.getElementById("time").innerHTML = timeRemaining;

        //hide gameover
        hide("gameOver");

        //show reset button
        document.getElementById("startReset").innerHTML = 'Reset Game';

        //start countdown
        startTimer();

        //display question and answer
        generateQA();
    }
}

//click on answer
for(i =1; i< 5; i++){
    document.getElementById("box"+i).onclick=function(){

        //playing?
        if(playing == true){

            //correct?
            if(correctAnswer == this.innerHTML){
                //increase score by 1
                score =score+1;
                document.getElementById("scoreValue").innerHTML = score;

                //display correct for 1 sec and hide
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000)
                generateQA();
            }

            //no         
            else{

                //display try again for 1 sec
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);   
            }
        }           
    }
}


//functions section

//start counter
function startTimer(){
    action = setInterval(function(){
        timeRemaining--;
        document.getElementById("time").innerHTML = timeRemaining;
        //gameover
        if(timeRemaining == 0){
            stopTimer();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p> GAME OVER </p> <p> YOUR SCORE IS: " + score + ".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = 'Start Game';
        }
    },1000)
}

//stop timer
function stopTimer(){
    clearInterval(action);
}

//hide the element
function hide(id){
    document.getElementById(id).style.display = "none";
}

//show the element
function show(id){
    document.getElementById(id).style.display = "block";
}


//generate question and answer

//generate question
function generateQA(){
    var num1 = Math.round(Math.random()*9)+1; //because we dont want 0 to be a number
    var num2 = Math.round(Math.random()*9)+1;
    document.getElementById("question").innerHTML = num1 + 'x' + num2;
    correctAnswer = num1 * num2;

    //fill one random box with answer
    var position =  Math.round(Math.random()*3)+1;
    document.getElementById("box"+position).innerHTML = correctAnswer;

    //fill other boxes with wrong answer
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        if(i != position){
            var wrongAnswer;

            //wrong answer should not be equal to correct answer
            do{
                wrongAnswer = (Math.round(Math.random()*9)+1)*(Math.round(Math.random()*9)+1);
            }
            while(answers.indexOf(wrongAnswer) > -1) //no duplicate values
        document.getElementById("box"+i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
        }
    }
}





