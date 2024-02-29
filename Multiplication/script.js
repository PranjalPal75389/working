// JS start here
const question = document.getElementById("question");
const userInput = document.querySelector("input");
const displayScore = document.querySelector("p");
const submitBtn = document.getElementById("submitBtn");
var score = 0;
// function to generate the question
function generateQuestion() {

    let firstNum = Math.floor(Math.random() * 20) + 1;
    let secondNum = Math.floor(Math.random() * 10) + 1;

    answer = firstNum * secondNum;
    question.innerHTML = `What is ${firstNum} multiply by ${secondNum}?`;
}
//when user sumit the answer. This (function) will check if the user answer is correct or not.
function start() {
    if (userInput.value == answer) {
        score++;
    }
    else {
        score--;
    }
    displayScore.innerHTML = "Score:" + score;
    userInput.value="";
    // function call to generate the new question 
    generateQuestion();
}

// Run the start function is Enter key is pressed 
userInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter")
        start();
})
// load the question when page is load
generateQuestion();