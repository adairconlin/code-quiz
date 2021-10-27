let timeCount = 0;
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

let startQuiz = function() {
    let mainBody = document.querySelector("main");
    // Remove title elements from the main section.
    while(mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    // Define variables once to make them available throughout the function.
    let newSection;
    let newDiv;
    // Add quiz content to the main section.
    for(let i = 0; i < 3; i++) {
        if(i === 0) {
            // Create first section of quiz that contains the question.
            newSection = document.createElement("section");
            newSection.className = "questionSection";
            // Create div that holds the question header.
            newDiv = document.createElement("div");
            newDiv.className = "questionDiv";
            newSection.appendChild(newDiv);
            // Create question header.
            let questionHeader = document.createElement("h1");
            questionHeader.className = "question";
            questionHeader.textContent = "Lorem ipsum dolor sit amet consectetur, adipsicing elit lorem?";
            newDiv.appendChild(questionHeader);

        } else if(i === 1) {
            // Create second section of quiz that contains answer choices.
            newSection = document.createElement("section");
            newSection.className = "answerSection";
            // Create div that holds the answer buttons.
            newDiv = document.createElement("div");
            newDiv.className = "answerDiv";
            newSection.appendChild(newDiv);
            // Create each individual button.
            let btn1 = document.createElement("button");
            let btn2 = document.createElement("button");
            let btn3 = document.createElement("button");
            let btn4 = document.createElement("button");
            // Assign each button a unique id.
            btn1.id = "answer1";
            btn2.id = "answer2";
            btn3.id = "answer3";
            btn4.id = "answer4";
            // Placeholder text content.
            btn1.textContent = "1. Answer 1";
            btn2.textContent = "2. Answer 2";
            btn3.textContent = "3. Answer 3";
            btn4.textContent = "4. Answer 4";

            newDiv.appendChild(btn1);
            newDiv.appendChild(btn2);
            newDiv.appendChild(btn3);
            newDiv.appendChild(btn4);

        } else if(i === 2) {
            // Create third section of quiz that states if the answer was correct or not.
            newSection = document.createElement("section");
            newSection.className = "feedbackSection";
            // Create element for answer feedback.
            let feedbackHeader = document.createElement("h2");
            feedbackHeader.textContent = "Correct!";
            newSection.appendChild(feedbackHeader);
        }
        mainBody.appendChild(newSection);
    }
}

document.querySelector(".startQuiz").addEventListener("click", startQuiz);