let mainBody = document.querySelector("main");
let timeCount = 50;
let currentSlide = 1;
let questionObj = {
    question1: {
        title: "Is JavaScript a statically typed or dynamically typed language?",
        answers: [
            "Both", "Statically typed", "Dynamically typed", "Neither",
        ]
    },
    question2: {
        title: "Which is an example of an Immediately Invoked Function (IIF)?",
        answers: [
            "let myFunc = function() {};", "function() {};", "(function() {})();", "(function() {});",
        ]
    },
    question3: {
        title: "Which property is on the very outside of the CSS Box Model?",
        answers: [
            "Padding", "Border", "Margin", "Content",
        ]
    },
    question4: {
        title: "Which method removes the last element from an array and also returns that same element?",
        answers: [
            "array.concat()", "array.push()", "array.pop()", "array.indexOf()",
        ]
    },
    question5: {
        title: "Which is not a valid data type in JavaScript?",
        answers: [
            "Boolean", "Number", "float", "Undefined",
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

    let scoreText = document.createElement("span");
    scoreText.textContent = timeCount;
    endPara.appendChild(scoreText);

    let timer = document.querySelector("span");
    timer.textContent = scoreText.textContent;

    let nameForm = document.createElement("form");
    endSection.appendChild(nameForm);

    let formLabel = document.createElement("label");
    formLabel.setAttribute("for", "nameInput");
    formLabel.textContent = "Enter your name: ";
    nameForm.appendChild(formLabel);

    // Add both input elements to form.
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

// Randomizes both element id's and textContent based on the given currentSlide.
let loadAnswers = function() {
    let answerButtons = document.querySelector(".answerDiv").children;
    let arr = [];
    let x;
    for(let i = 0; i < answerButtons.length; i++) {
        let randomize = function() {
            x = Math.floor(Math.random() * answerButtons.length) + 1;
            if(arr.indexOf(x) >= 0) {
                return randomize();
            };
            return x;
        };
        arr.push(randomize());
    };

    for(let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].id = "answer" + arr[i];
        let q = "question" + currentSlide;
        let x = arr[i] - 1;

        answerButtons[i].textContent = questionObj[q].answers[x];
    }
};

// Grabs current question from questionObj based on the currentSlide value.
let loadQuestion = function() {
    let q = "question" + currentSlide;
    let currentQuestion = questionObj[q].title;

    return currentQuestion;
};

// Load the new question and corresponding answers.
let loadQA = function() {
    if(currentSlide <= Object.keys(questionObj).length) {
        loadAnswers();
        let question = document.querySelector(".question");
        question.textContent = loadQuestion();
        currentSlide++;
    } else {
        // Increment currentSlide value once more so that startTimer() will exectue clearInterval(timerFunction).
        currentSlide++
        endGame();
    }
};

// Start timer when quiz begins.
let startTimer = function() {
    let timer = document.querySelector("span");
    let timerFunction = setInterval(function() {
        if(timeCount > 0 && currentSlide < 7) {
            timeCount--;
            timer.textContent = timeCount;
        } else {
            clearInterval(timerFunction);
            timer.textContent = timeCount;
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
    for(let i = 1; i < 5; i++) {
        let btn = document.createElement("button");
        btn.className = "answers";
        //btn.textContent = questionObj.question1.answers[i - 1];
        newDiv.appendChild(btn);
    };
    loadAnswers();
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
    //questionHeader.textContent = loadQuestion();
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
    // Loads the Question and Answer slides
    loadQA();

    // Add event listener to load new Question and Answer slides on each user click.
    let answerButtons = document.querySelectorAll(".answers");
    answerButtons.forEach(btn => {
        btn.addEventListener("click", loadQA);
    });

    // Start quiz timer.
    startTimer(mainBody);
};

document.querySelector(".startQuiz").addEventListener("click", startQuiz);