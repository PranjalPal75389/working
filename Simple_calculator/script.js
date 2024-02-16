const buttonsE1 = document.querySelectorAll("button");
const resultFieldE1 = document.getElementById("result");

for (let i = 0; i < buttonsE1.length; i++) {
  buttonsE1[i].addEventListener("click", () => {
    buttonValue = buttonsE1[i].textContent;

    console.log(buttonValue);

    if (buttonValue === "AC") {
      clearResult();
    } else if (buttonValue === "Del") {
      deleteValue();
    } else if (buttonValue === "=") {
      calculate();
    } else {
      appendValue(buttonValue);
    }
  });
}
function clearResult() {
  resultFieldE1.value = "";
}
function calculate() {
  resultFieldE1.value = eval(resultFieldE1.value);
}
function appendValue() {
  resultFieldE1.value += buttonValue;

}
function deleteValue() {
  resultFieldE1.value = resultFieldE1.value.slice(0, -1);
}
