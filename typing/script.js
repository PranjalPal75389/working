document.addEventListener("DOMContentLoaded", () => {
  let startTime;
  let quote = "";
  const submitBtn = document.getElementById("submit-button");
  const textBox = document.querySelector(".text-box");
  const textInput = document.querySelector(".text-input");
  const lengthBtns = document.querySelectorAll(".length-button");
  const speakBtn = document.getElementById("speak-button");

  textInput.value = "";
  async function fetchText(minLengthValue = 100) {
    try {
      const response = await fetch(
        `https://api.quotable.io/random?minLength=${minLengthValue}`
      );
      const data = await response.json();
      console.log(data);
      quote = data.content;
      console.log(quote);
      console.log(quote.length);
      textBox.textContent = quote;
      textSpeech(textBox.textContent);
    } catch (error) {
      console.error("Error fetching quote,", error);
      textBox.textContent = "failed to load quote";
    }
  }

  // fetch the text using api
  fetchText();

  document.addEventListener("keydown", (e) => {
    textInput.focus();
    if (!startTime) {
      startTime = new Date();
      console.log("start time = " + startTime);
    }
  });

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
          coloredText =
            coloredText + ` <span style="color:green">${quoteWords[i]}</span> `;
        } else {
          coloredText =
            coloredText + ` <span style="color:red">${quoteWords[i]}</span> `;
        }
      }
      textBox.innerHTML = coloredText.trim();
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
      responsiveVoice.pause();
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

  lengthBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (responsiveVoice.isPlaying()) {
        responsiveVoice.cancel();
      }
      let minLengthValue = parseInt(btn.textContent, 10);
      await fetchText(minLengthValue);
    });
  });
  async function textSpeech(text) {
    //   let speechText;
    //    if(window.speechSynthesis){
    //   let speech = new SpeechSynthesisUtterance();
    //   speech.text=textBox;
    //   speechText=textBox;
    //     speech.rate=1;
    //     speech.pitch=1;
    //     speech.onstart = () => {
    //       console.log("Speech started");
    //     };
    //     speech.onend = () => {
    //       console.log("Speech ended");
    //     };
    //     speech.onerror = (event) => {
    //       console.error("Speech error: ", event);
    //     };
    //     speechSynthesis.speak(speech);

    //  }
    //  else{
    if (responsiveVoice.voiceSupport()) {
      let speechText;
      speechText = text;
      responsiveVoice.speak(speechText);
    }
    //  }
  }
  // text to speak button event listener
  speakBtn.addEventListener("click", () => {
    if (responsiveVoice.isPlaying()) {
      responsiveVoice.pause();
    } else {
      responsiveVoice.resume();
    }
  });
});
