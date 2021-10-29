# Code Quiz
Code Quiz is a dynamically loaded quiz game that locally stores data. Multiple users can save their scores on a single browser and compare their high scores at the end. Every element after the header, which displays "View Highscores" and "Time Count", loads dynamically from the JavaScript code. 

To accomplish the requirements of this challenge, I worked a lot with HTML DOM Methods and storing local storage with JavaScript. The biggest challenge of this project was dealing with the localStorage method in such depth for the first time. In this project, I used a mix of storing and getting storages with dynamically changing variables. Another part I found challenge was dynamically loading the questions and answers from an object. 

One personal challenge I gave myself was to avoid hard-coding variables and instead create functions that include variables that can be changed. An example of this is within in `loadAnswers()` function. Within this function, I set the condition as `i < answerButtons.length;`. Instead of hard-coding the amount of answers I wrote for each question, I set the condition to be based on the amount of answers there are. This is so that if anyone wanted to add more buttons, you wouldn't have to change the function. I tried to maintain this mindset while writing all of my functions.

Overall, I became a lot more comfortable working between functions, with `localStorage()` methods, and with dynamically changing variables.

# Playing The Game
### If you would like to interact with the project yourself, visit [here](https://adairconlin.art/code-quiz/).
## Start The Game
Once at the start page, the user is introduced to this screen that explains how the game works:

![title-screen](/assets/images/start-screen.PNG) 

Clicking "Start Quiz" will begin the quiz and the timer. The user has 60 seconds to answer all the questions. 

Clicking an answer will automatically go to the next question. An element below the answers will also appear, telling the user if they answered correctly or incorrectly:

![question-feedback](/assets/images/quiz-feedback.PNG)

If the user answers incorrectly, 10 seconds are subtracted from the timer. 

## End of Game
After all questions have been answers OR the timer runs out, the users score is the time they was left.

The user can now enter their initials and enter their score on this screen:

![end-game](/assets/images/endgame-screen.PNG)

Upon submission, the page will then change to show all of the users high scores.

The user now has the option to play again, or delete their high scores.

![highscores](/assets/images/highscore-screen.PNG)
