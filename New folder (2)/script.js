// JS start here
const question = document.getElementById("question");
const userInput = document.querySelector("input");
const displayScore = document.querySelector("p");
const submitBtn = document.getElementById("submitBtn");
var score = 0;

function generateQuestion() {

    let firstNum = Math.floor(Math.random() * 20) + 1;
    let secondNum = Math.floor(Math.random() * 10) + 1;

    answer = firstNum * secondNum;
    question.innerHTML = `What is ${firstNum} multiply by ${secondNum}?`;
    console.log(userInput.value);
    console.log("ans : " + answer)

}
submitBtn.onclick = () => {
    if (userInput.value == answer) {
        score++;
        console.log("true")
    }
    else {
        score--;
    }
    displayScore.innerHTML = "Score:" + score;
    generateQuestion();
}
generateQuestion();