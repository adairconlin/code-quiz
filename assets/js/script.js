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

let startTimer = function() {
    let timer = document.querySelector(".timer");
    let timeCount = 9;
    let timerFunction = setInterval(function() {
        if(timeCount > 0) {
            timer.textContent = "Timer: " + timeCount;
            timeCount--;
        } else {
            clearInterval(timerFunction);
            timer.textContent = "Timer: " + timeCount;
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
    newSection = document.createElement("section");
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
    // Remove title elements from the main section.
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

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

    startTimer();
}

document.querySelector(".startQuiz").addEventListener("click", startQuiz);