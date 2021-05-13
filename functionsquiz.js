// global variables
var questions; // objects containing the quiz questions
var count, score, scorePercentage, answer; // tracking variables
var correctAnswer, prevFlag; // flags
var choices, question, resultsPara, choicesPara; // elements being updated
var resetButton, prevButton; // buttons
var progress, progressPercentage; // progress bar

questions = [{
        number: 0,
        question: 'What surrounds a string?',
        choices: ['Quotations', 'Curly Brackets', 'Parenthesis', 'Square Brackets'],
        answer: 0
    },
    {
        number: 1,
        question: 'Why do we write functions?',
        choices: ['Make our code easier to understand ', 'Avoid writing repeated code', 'All of these', 'Make our code reusable'],
        answer: 2
    },
    {
        number: 2,
        question: 'JavaScript must adhere to specific rules of grammar called?',
        choices: ['Syntax', 'Binary code', 'Compiler', 'Operator'],
        answer: 0
    },
    {
        number: 3,
        question: 'The conditional statement, in Javascript, begins with the word?',
        choices: ['Then', 'Else', 'if', 'do'],
        answer: 2
    },
    {
        number: 4,
        question: 'A user-defined name for stored information whose value can change over time?',
        choices: ['Token', 'id', 'variable', 'operator'],
        answer: 2
    },
    {
        number: 5,
        question: 'In JavaScript, what should you includeat the end of each statement?',
        choices: [':', '!', '=', ';'],
        answer: 3
    },
    {
        number: 6,
        question: 'The _____ relational operator means "is not equal to',
        choices: ['!==', '!==', '=!', '!='],
        answer: 3
    },
    {
        number: 7,
        question: 'What must one do in order to create a function?',
        choices: ['Define the function', 'Add a parameter', 'Give the function a value', 'None of the above'],
        answer: 0
    },
    {
        number: 8,
        question: 'What is the reason we use parameters?',
        choices: ['To make new functions', 'To make it easy for the user', 'To modify existing function', 'To debug later on'],
        answer: 2
    },
    {
        number: 9,
        question: ' What is another word for a function?',
        choices: ['Funtions', 'To call', 'Command', 'num'],
        answer: 2
    },
    {
        number: 10,
        question: 'Functions are simplified versions of something more complex',
        choices: ['True', 'Somewhat False', 'False', 'It depends on the language'],
        answer: 0
    },
    {
        number: 11,
        question: 'Functions make coding more efficient',
        choices: ['False', ' Only if you use a lot of them', 'True', 'Only in JavaScript'],
        answer: 3
    },
    {
        number: 12,
        question: ' What word is used for correcting errors in a code.',
        choices: ['Bugging', 'Seek and fix', 'Correcting', 'Debugging'],
        answer: 3
    },
    {
        number: 13,
        question: 'How many parameters can I add to a function.',
        choices: ['26', '10 each function', '15 if you make them unique', 'As many as possible'],
        answer: 3
    },
    {
        number: 14,
        question: 'The "function" and " var" are known as:',
        choices: ['Keywords', 'Data types', 'Declaration statements', 'Prototypes'],
        answer: 2
    },
    {
        number: 15,
        question: 'Which one of the following also known as Conditional Expression?',
        choices: ['Alternative to if-else', 'Switch statement', 'If-then-else statement', 'immediate if'],
        answer: 3
    },
    {
        number: 16,
        question: 'When you invoke the_____ method on a function f and pass an object o, the method returns a new function.',
        choices: ['apply()', 'call()', 'bind()', 'string()'],
        answer: 2
    },
    {
        number: 17,
        question: 'When does the function become optional?',
        choices: ['When defined as a looping statement', 'When defined as a expression', 'When the function is predefined', 'All of the above'],
        answer: 1
    },
    {
        number: 18,
        question: 'What will happen if a return statement does not have an associated expression',
        choices: ['It returns the value O', 'It gives an error', 'It returns the undefined value', 'None of the above'],
        answer: 2
    },
    {
        number: 19,
        question: ' What is the purpose of a return statement?',
        choices: ['Return a value and stop running', 'Continue executing rest of the statements', 'Stop executing the functions', 'Stop executing the function and returns the value'],
        answer: 3
    }
];



// set tracking variables
count = 0;
score = 0;
correctAnswer = false;
prevFlag = false;



// grab html elements
choices = document.querySelectorAll('.choices');
question = document.getElementsByTagName('h2')[0];
resultsPara = document.getElementsByTagName('p')[0];
choicesPara = document.getElementsByTagName('p')[1];

resetButton = document.getElementsByClassName('reset')[0];
prevButton = document.getElementsByClassName('prev')[0];
progress = document.getElementsByClassName('progress-bar')[0];



// add the event listeners
window.onload = renderQuestion();

prevButton.addEventListener('click', prevQuestion);
resetButton.addEventListener('click', resetQuiz);
choices.forEach(function(choice) {
    choice.addEventListener('click', scoring);
});



// functions used
function scoring() {
    // grab the answer of the current question
    answer = questions[count].answer;
    // prevButton is visible when a choice is selected
    prevFlag = true;

    // THIS is the span.choice that the user clicked
    if (this.innerText === questions[count].choices[answer]) {
        // correctAnswer waves for prevButton use
        correctAnswer = true;
        score++;
    } else {
        correctAnswer = false;
    }

    // then render next question
    nextQuestion();
}



function nextQuestion() {
    // count goes up
    count++;

    if (count > 20) {
        count = 20;
    } else if (count !== 20) {
        // numbers between 0 and 20 have questions that can be rendered
        renderQuestion();
    } else if (count === 20) {
        // quiz is over when count reaches 20
        renderCompletion();
    }
}



// the prevButton will only be available to go back one question
function prevQuestion() {
    // when the previous question renders, remove the prevButton
    prevFlag = false;

    // if the user originally clicked the correctAnswer, remove score
    if (correctAnswer) {
        correctAnswer = false;
        score--;
    }

    // then go back and render the old question
    count--;
    renderQuestion();
}




function renderQuestion() {

    // prevButton is hidden on the first page
    // and if the user attempts to go back more than one question
    if (!prevFlag) {
        prevButton.classList.add('hide');
    } else if (prevButton.classList.contains('hide')) {
        prevButton.classList.remove('hide');
    }

    // update question div with current question
    question.innerText = questions[count].question;

    // update each choice with the choices available in current question
    choices.forEach(function(choice, i) {
        choice.innerText = questions[count].choices[i];
    });

    updateProgress();
}

function renderCompletion() {
    updateProgress();
    scorePercentage = Math.round(score / 20 * 100) + '%';

    // update with a thank you note and the user's percentage
    question.innerText = 'So How did you do?';
    resultsPara.innerText = 'Your score is: ' + scorePercentage;
    // reset avail, prevButton and choicesPara are removed
    choicesPara.classList.add('hide');
    prevButton.classList.add('hide');
    resetButton.classList.remove('hide');
}



function updateProgress() {
    // progress bar will be updated as count goes up
    progressPercentage = Math.round((count / 20) * 100);
    progress.style.width = progressPercentage + '%';
}


function resetQuiz() {
    // reset tracking variables
    count = 0;
    score = 0;
    correctAnswer = false;
    prevFlag = false;

    // resultsPara is hidden
    resultsPara.innerText = '';

    // choicesPara displays while resetButton is hidden
    choicesPara.classList.remove('hide');
    resetButton.classList.add('hide');

    renderQuestion();
}


// Timer script starts here
const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

function startWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    }, 10);
};

function pauseWatch() {
    watch.classList.add('paused');
    clearInterval(timer);
};

function resetWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = '00:00:00:00';
};

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.id === 'start') startWatch();
    if (el.id === 'pause') pauseWatch();
    if (el.id === 'reset') resetWatch();
});