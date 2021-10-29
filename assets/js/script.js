let mainBody = document.querySelector("main");
let timeCount = 70;
let currentSlide = 1;
let scoreArr;
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

// Remove elements from the main section.
let clearMain = function() {
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    } 
};

// Load high score page based on local storage data.
let loadHighScorePage = function(userName) {
    clearMain();
    let userScore = (localStorage.getItem(userName));
    let splitScore = userScore.split(",");
    let scoreArr = [];
    scoreArr = scoreArr.concat(splitScore);

    let newSection = document.createElement("section");
    mainBody.appendChild(newSection);

    let scoreTitle = document.createElement("h1");
    scoreTitle.textContent = "Your highscores:";
    newSection.appendChild(scoreTitle);

    let scoreDiv = document.createElement("div");
    newSection.appendChild(scoreDiv);

    for(let i = 0; i < scoreArr.length; i++) {
        let scorePara = document.createElement("p");
        scorePara.className = "scorePara";
        scorePara.textContent = userName + ": " + scoreArr[i]; 
       scoreDiv.insertBefore(scorePara, scoreDiv.firstChild);
    }
};

// Save score if it's the users highest score yet.
let storeScores = function() {
    let userScore = document.querySelector("span").textContent;
    let userName = document.querySelector("#nameInput").value;

    if(localStorage.getItem(userName) === "undefined" || localStorage.getItem(userName) === null) {
        localStorage.setItem(userName, userScore);
    } else {
        let arr = [];
        let currentVal = localStorage.getItem(userName);
        let splitVal = currentVal.split(",")
        arr = arr.concat(splitVal);
        
        if(arr.indexOf(userScore) > 0) {
        } else {
            arr.push(userScore);
            arr.sort();
            localStorage.setItem(userName, arr);
        }       
    }
    loadHighScorePage(userName);
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
            formInput.id = "submit";
        }
        nameForm.appendChild(formInput);
    }
    // Prevent page re-load when submitting
    let myForm = document.querySelector("form");
    myForm.addEventListener("submit", function(event) {
        event.preventDefault();
        storeScores();
    })
};

// Show end game screen for user to see their score.
let endGame = function() {
    // Clear elements from main.
    clearMain();
    // Call function to load elements on main.
    addEndGameScreen();
};

// Check users answer when they select one, then provide feedback.
let checkAnswer = function() {
    let answerButtons = document.querySelectorAll(".answers");
    let feedbackHeader = document.querySelector("#feedback");
    // Adds an event listener to every button with the class name of "answers".
    answerButtons.forEach(btn => {
        // Without differentiating "mousedown" and "mouseup" between these event listeners,
        // the "currentTarget" method would not return the correct current value.
        btn.addEventListener("mousedown", function(event) {
            if(event.currentTarget.id === "answer3") {
                feedbackHeader.textContent = "Correct!";
            } else {
                feedbackHeader.textContent = "Wrong!";
                timeCount = timeCount - 10;
            }
        })
        // After checking the users answer, the next questions and answers will load.
        btn.addEventListener("mouseup", loadQA);
    })
};

// Randomizes both element id's and textContent based on the given currentSlide.
let loadAnswers = function() {
    let answerButtons = document.querySelector(".answerDiv").children;
    let arr = [];
    let num;
    for(let i = 0; i < answerButtons.length; i++) {
        let randomize = function() {
            // Give a random value to num that is between 1 and the length of
            // the amount of children, or answer choices, for each slide.
            num = Math.floor(Math.random() * answerButtons.length) + 1;
            // Check each random number; If that number has already been chosen,
            // run the randomize function again to find a unique one.
            if(arr.indexOf(num) >= 0) {
                return randomize();
            };
            return num;
        };
        // Add the unique randomized num to the array.
        arr.push(randomize());
    };

    // Loop through array and give each answer button a unique id name with
    // the corresponding number from the arr[]. This will randomize the order 
    // of questions each time you play.
    for(let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].id = "answer" + arr[i];
        // Determine which answer values to grab and display based on the
        // indivdual buttons assigned id.
        let questionKey = "question" + currentSlide;
        let val = arr[i] - 1;
        answerButtons[i].textContent = questionObj[questionKey].answers[val];
    }
};

// Grabs current question from questionObj based on the currentSlide value.
let loadQuestion = function() {
    let questionKey = "question" + currentSlide;
    let currentQuestion = questionObj[questionKey].title;

    return currentQuestion;
};

// Load the new question and corresponding answers.
let loadQA = function() {
    // Check to make sure the value of currentSlide has not gone over the max amount of available questions.
    if(currentSlide <= Object.keys(questionObj).length) {
        let question = document.querySelector(".question");
        question.textContent = loadQuestion();
        loadAnswers();
        currentSlide++;
    } else {
        // Increment currentSlide value once more so that startTimer() will exectue clearInterval(timerFunction).
        currentSlide++;
        endGame();
    }
};

// Start timer when quiz begins.
let startTimer = function() {
    let timer = document.querySelector("span");
    let timerFunction = setInterval(function() {
        // Check to make sure the timer hasn't run out and there are still more slides left.
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
    feedbackHeader.id = "feedback";
    newSection.appendChild(feedbackHeader);

    return newSection;
};

// Create second section of quiz that contains answer choices.
let addAnswerSection = function() {
    newSection.className = "answerSection";
    // Create div that holds the answer buttons.
    newDiv = document.createElement("div");
    newDiv.className = "answerDiv";
    newSection.appendChild(newDiv);

    // Create multiple buttons dynamically with a loop.
    for(let i = 0; i < 4; i++) {
        let btn = document.createElement("button");
        btn.className = "answers";
        newDiv.appendChild(btn);
    };
    // Call function to determine and randomize answer content.
    loadAnswers();
    
    return newSection;
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
    newDiv.appendChild(questionHeader);

    return newSection;
};

// Begin the quiz game.
let startQuiz = function() {
    clearMain();
    let newSection;
    // Add quiz content sections to the main section.
    for(let i = 0; i < 3; i++) {
        if(i === 0) {
            newSection = addQuestionSection();
        } else if(i === 1) {
            newSection = addAnswerSection();
        } else if(i === 2) {
            newSection = addFeedbackSection();
        }
        // Add section with className identified in each conditional statement.
        mainBody.appendChild(newSection);
    }
    // Loads the Question and Answer slides.
    loadQA();
    // Check users answer choice.
    checkAnswer();
    // Start quiz timer.
    startTimer(mainBody);
};

document.querySelector(".startQuiz").addEventListener("click", startQuiz);

// This will eventually print out all high scores of every
// document.querySelector(".highscores").addEventListener("click", loadHighScorePage);