let currentSlide = 0;
let currentQuestion = {
    question1: {
        title: "Question 1",
        answers: [
            "1. Answer 1", "2. Answer 2", "3. Answer 3", "4. Answer 4", "5. Answer 5"
        ]
    },
    question2: {
        title: "Question 2",
        answers: [
            "1. Answer 1", "2. Answer 2", "3. Answer 3", "4. Answer 4", "5. Answer 5"
        ]
    },
    question3: {
        title: "Question 3",
        answers: [
            "1. Answer 1", "2. Answer 2", "3. Answer 3", "4. Answer 4", "5. Answer 5"
        ]
    },
    question4: {
        title: "Question 4",
        answers: [
            "1. Answer 1", "2. Answer 2", "3. Answer 3", "4. Answer 4", "5. Answer 5"
        ]
    },
    question5: {
        title: "Question 5",
        answers: [
            "1. Answer 1", "2. Answer 2", "3. Answer 3", "4. Answer 4", "5. Answer 5"
        ]
    },
}

// Remove title elements from the main section.
let clearMain = function(mainBody) {
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    } 
};

let addEndGameScreen = function(mainBody) {
    let endSection = document.createElement("section");
    endSection.className = "endTitle";
    mainBody.appendChild(endSection);

    let endTitle = document.createElement("h1");
    endTitle.textContent = "All Done!"
    endSection.appendChild(endTitle);

    let endPara = document.createElement("p");
    endPara.textContent = "Your final score is: ";
    endSection.appendChild(endPara);

    let nameForm = document.createElement("form");
    endSection.appendChild(nameForm);

    let formLabel = document.createElement("label");
    formLabel.setAttribute("for", "nameInput");
    formLabel.textContent = "Enter your name: ";
    nameForm.appendChild(formLabel);

    for(let i = 0; i < 2; i++) {
        let formInput = document.createElement("input");
        if(i === 0) {
            formInput.setAttribute("type", "text");
            formInput.id = "nameInput";
        } else if (i === 1) {
            formInput.setAttribute("type", "submit");
            formInput.setAttribute("value", "submit");
        }
        nameForm.appendChild(formInput);
    }
}

// Show end game screen for user to see their score.
let endGame = function(mainBody) {
    clearMain(mainBody);
    addEndGameScreen(mainBody);
}

// Start timer when quiz begins.
let startTimer = function(mainBody) {
    let timer = document.querySelector(".timer");
    let timeCount = 3;
    let timerFunction = setInterval(function() {
        if(timeCount > 0) {
            timer.textContent = "Timer: " + timeCount;
            timeCount--;
        } else {
            clearInterval(timerFunction);
            timer.textContent = "Timer: " + timeCount;
            endGame(mainBody);
        }
    }, 1000);
}

// Create third section of quiz that states if the answer was correct or not.
let addFeedbackSection = function() {
    newSection = document.createElement("section");
    newSection.className = "feedbackSection";
    // Create element for answer feedback.
    let feedbackHeader = document.createElement("h2");
    feedbackHeader.textContent = "Correct!";
    newSection.appendChild(feedbackHeader);
}

// Create second section of quiz that contains answer choices.
let addAnswerSection = function() {
    newSection.className = "answerSection";
    // Create div that holds the answer buttons.
    newDiv = document.createElement("div");
    newDiv.className = "answerDiv";
    newSection.appendChild(newDiv);

    // Create each button dynamically with a for loop.
    for(let i = 1; i < 6; i++) {
        let btn = document.createElement("button");
        btn.id = "answer" + i;
        btn.textContent = i + ". Answer " + i;
        newDiv.appendChild(btn);
    }
};

// Create first section of quiz that contains the question.
let addQuestionSection = function() {
    newSection = document.createElement("section");
    newSection.className = "questionSection";
    // Create div that holds the question header.
    let newDiv = document.createElement("div");
    newDiv.className = "questionDiv";
    newSection.appendChild(newDiv);
    // Create question header.
    let questionHeader = document.createElement("h1");
    questionHeader.className = "question";
    questionHeader.textContent = "Lorem ipsum dolor sit amet consectetur, adipsicing elit lorem?";
    newDiv.appendChild(questionHeader);
};

let startQuiz = function() {
    let mainBody = document.querySelector("main");
    clearMain(mainBody);
    // Add quiz content to the main section.
    for(let i = 0; i < 3; i++) {
        if(i === 0) {
            let newSection;
            addQuestionSection();
        } else if(i === 1) {
            let newSection;
            addAnswerSection();
        } else if(i === 2) {
            let newSection;
            addFeedbackSection();
        }
        mainBody.appendChild(newSection);
    }
    startTimer(mainBody);
}

document.querySelector(".startQuiz").addEventListener("click", startQuiz);