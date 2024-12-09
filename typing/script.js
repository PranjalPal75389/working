document.addEventListener("DOMContentLoaded", () => {
  let startTime;
  let quote = "";
  const submitBtn = document.getElementById("submit-button")
  const textBox = document.querySelector(".text-box");
  const textInput = document.querySelector(".text-input")
  const lengthBtns = document.querySelectorAll(".length-button");


  async function fetchText( minLengthValue=100) {
    try {
      const response = await fetch(`https://api.quotable.io/random?minLength=${minLengthValue}`);
      const data = await response.json();
      console.log(data);
      quote = data.content;
      console.log(quote);
      console.log(quote.length);
      textBox.textContent = quote;
    } catch (error) {
      console.error("Error fetching quote,", error);
      textBox.textContent = "failed to load quote";
    }
  }

  // fetch the text using api
  fetchText();

  textInput.onclick = () => {
    startTime = new Date();
    console.log("start time = " + startTime);
  };

  function submitText() {
    if (startTime && quote) {
      const submitTime = new Date();
      let textInputValue = textInput.value;

      let wordCheck = 0;
      let coloredText = "";
      // split the sentence into words
      let quoteWords = quote.split(/\s+/);
      let userWords = textInputValue.split(/\s+/);
      for (let i = 0; i < quoteWords.length; i++) {
        if (quoteWords[i] === userWords[i]) {
          wordCheck += 1;
          coloredText=coloredText+` <span style="color:green">${quoteWords[i]}</span> `;
        } else {
          coloredText=coloredText+` <span style="color:red">${quoteWords[i]}</span> `;
        }
      }
      textBox.innerHTML=coloredText.trim();
      let timeTaken = (submitTime - startTime) / 1000;
      let WPM = Math.round((wordCheck / timeTaken) * 60);
      console.log("WPM :" + WPM);
      document.getElementById("wpm-display").textContent = WPM;
    }
    setTimeout(() => {
      textInput.value = "";
      fetchText();
    }, 1000);
  }

  // submit the text on pressing Enter
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitText();
    }
  });

  submitBtn.addEventListener("click", submitText);

  // preventing the user to copy (textBox) and pasting (textInput)
  textInput.addEventListener("paste", (e) => {
    e.preventDefault();
    alert("pasting are not allowed");
  });
  textBox.addEventListener("copy", (e) => {
    e.preventDefault();
    alert("copying are not allowed");
  });
 
 lengthBtns.forEach(btn => {
    btn.addEventListener("click", async () => {
      let minLengthValue = parseInt(btn.textContent, 10);
      await fetchText(minLengthValue);
    });
  });
});
