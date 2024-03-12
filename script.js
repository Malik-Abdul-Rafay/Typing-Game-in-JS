const typingText = document.querySelector(".typing-text p")
inpField = document.querySelector(".wrapper .input-field")
tryAgainBtn = document.querySelector(".content button")
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")

let timer,
maxTime = 150,
timeleft = maxTime,
charIndex = mistakes = isTyping = 0

function loadParagraph(){
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll('span')[0].classList.add("active");
    document.addEventListener('keydown', () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
}

function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeleft > 0){
        if (!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null){
            if(charIndex > 0){
                charIndex --;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }else{
            if(characters[charIndex].innerText == typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeleft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerHTML = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else{
        clearInterval(timer);
        inpField.value = "";
    }
}


function initTimer(){
    if(timeleft > 0){
        timeleft--;
        timeTag.innerText = timeleft;
        let wpm = Math.round(((charIndex - mistakes) / 5)/ (maxTime - timeleft) * 60);
        wpmTag.innerText = wpm;
    }else{
        clearInterval(timer)
    }
}

function resetGame(){
    loadParagraph();
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = '';
    timeTag.innerText = timeleft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;;
}


loadParagraph();
inpField.addEventListener('input', initTyping)
tryAgainBtn.addEventListener('click', resetGame)