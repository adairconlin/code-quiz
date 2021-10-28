let mainBody = document.querySelector("main");
let currentSlide = 1;
let questionObj = {
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
};

// Remove title elements from the main section.
let clearMain = function() {
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    } 
};

// Show end game screen for user to see their score.
let endGame = function() {
    // Clear elements from main.
    clearMain();
    // Call function to load elements on main.
    addEndGameScreen();
};

// Dynamically load end game screen.
let addEndGameScreen = function() {
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
};

let loadAnswers = function() {

};

// Grabs current question from questionObj based on the currentSlide value.
let loadQuestion = function() {
    let test = "question" + currentSlide;
    let currentQuestion = questionObj[test].title;
    console.log(Object.keys(questionObj).length);
    currentSlide++;

    return currentQuestion;
};

// Load the new question and corresponding answers.
let loadQA = function() {
    if(currentSlide <= Object.keys(questionObj).length) {
        let question = document.querySelector(".question");
        question.textContent = loadQuestion();
    } else {
        endGame();
    }
};

// Start timer when quiz begins.
let startTimer = function() {
    let timer = document.querySelector(".timer");
    let timeCount = 3;
    let timerFunction = setInterval(function() {
        if(timeCount > 0) {
            timer.textContent = "Timer: " + timeCount;
            timeCount--;
        } else {
            clearInterval(timerFunction);
            timer.textContent = "Timer: " + timeCount;
            endGame();
        }
    }, 1000);
};

// Create third section of quiz that states if the answer was correct or not.
let addFeedbackSection = function() {
    newSection = document.createElement("section");
    newSection.className = "feedbackSection";
    // Create element for answer feedback.
    let feedbackHeader = document.createElement("h2");
    feedbackHeader.textContent = "Correct!";
    newSection.appendChild(feedbackHeader);
};

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
        btn.className = "answers";
        btn.textContent = questionObj.question1.answers[i - 1];
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
    questionHeader.textContent = loadQuestion();
    newDiv.appendChild(questionHeader);
};

let startQuiz = function() {
    clearMain();
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

    // Add event listener to load new question on each user click.
    let answerButtons = document.querySelectorAll(".answers");
    answerButtons.forEach(btn => {
        btn.addEventListener("click", loadQA);
    });
    
    // Start quiz timer.
    //startTimer(mainBody);
};

document.querySelector(".startQuiz").addEventListener("click", startQuiz);