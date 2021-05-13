// global variables
var questions; // objects containing the quiz questions
var count, score, scorePercentage, answer; // tracking variables
var correctAnswer, prevFlag; // flags
var choices, question, resultsPara, choicesPara; // elements being updated
var resetButton, prevButton; // buttons
var progress, progressPercentage; // progress bar

questions = [{
        number: 0,
        question: 'Which of these contains an executable statement?',
        choices: ['var x = 10; // var y = 0;', 'var x = 10; // var y = 0;', 'var x = 10; */ var y = 0;', 'var x = 10; /* var y = 0'],
        answer: 2
    },
    {
        number: 1,
        question: 'Assume that value of A is 10 and value of B is 15. Which of the following returns a true value in if statement.',
        choices: ['if A not = B', 'if A != B', 'if (A not = B)', 'if (A != B)'],
        answer: 2
    },
    {
        number: 2,
        question: 'Which of the following is not a builtin Javascript object?',
        choices: ['Time', 'Array', 'Date', 'Month'],
        answer: 0
    },
    {
        number: 3,
        question: ' Which of the following JavaScript statements use arrays?',
        choices: ['x = a(i)', 'x = a[i]', 'x = a >> i', 'x = a & i'],
        answer: 1
    },
    {
        number: 4,
        question: 'Which of the following JavaScript statements is NOT a correct definitions of an array?',
        choices: ['var a = new Array(100)', 'var a = new Array[100]', 'a = new Array(100)', 'a = new Array(1,2,3,4)'],
        answer: 0
    },
    {
        number: 5,
        question: 'The JavaScript statement x = new Array[2,3]',
        choices: ['defines a new two-dimensional array a whose dimensions are 2 and 3', 'defines an array a with two elements with a[1]=2 and a[2]=3', 'defines an array a with two elements with a[0]=2 and a[1]=3', 'It is an incorrect way of defining an array '],
        answer: 3
    },
    {
        number: 6,
        question: 'Which of these lines of code show how to validly store an array with 3 items?',
        choices: ['var nums = [42, 3, 7]', 'var nums = 3, 42, 7', 'var nums = [3]', 'var nums = (3, 42, 7)'],
        answer: 0
    },
    {
        number: 7,
        question: 'How would you access the second element in an array?',
        choices: ['nums.2', 'nums[2]', 'nums_1', 'nums[1]'],
        answer: 0
    },
    {
        number: 8,
        question: 'How would you change the first element in an array?',
        choices: ['nums[1] = "New!"', 'nums = "New!"', 'var nums[1] = "New!"', 'nums[0] = "New!"'],
        answer: 3
    },
    {
        number: 9,
        question: ' What property tells you how many items are in an array',
        choices: ['length', 'count', 'items', 'num'],
        answer: 0
    },
    {
        number: 10,
        question: 'What method can you use to add an element to an array in JavaScript?',
        choices: ['pop()', 'push()', 'append()', 'insert()'],
        answer: 1
    },
    {
        number: 11,
        question: 'Which of these for loops would iterate through each item of the nums array (no more, no less)?',
        choices: ['for (var i = 0; i < nums; i++) {}', 'for (var i = 1; i < nums.length; i++) {}', 'for (var i = 1; i < nums; i++) {}', 'for (var i = 0; i < nums.length; i++) {}'],
        answer: 3
    },
    {
        number: 12,
        question: ' What are the two ways you can access objects?',
        choices: ['Dot notation and bracket notation', 'Curl notation and dot notation', 'Square brackets and parentheses', 'Dot notation and parentheses'],
        answer: 0
    },
    {
        number: 13,
        question: 'What is the correct syntax for adding a property to the object provided?  var university = {}',
        choices: ['university[name] = "Greenwich" ', 'university[name] : "Greenwich"', 'university.name : "Greenwich"', 'university.name = "Greenwich"'],
        answer: 3
    },
    {
        number: 14,
        question: 'In Javascript, what surrounds an array?',
        choices: ['Quotations', 'Curly Brackets', 'Parenthesis', 'Square Brackets'],
        answer: 3
    },
    {
        number: 15,
        question: 'array = [1,2,3,4,5] What is the length of this array?',
        choices: ['6', '4', '5', '4.5'],
        answer: 2
    },
    {
        number: 16,
        question: 'What is proper syntax for declaring a array in JavaScript?',
        choices: ['var arrayName =[ ];', 'var arrayName[ ] ={ };', 'array arrayName ={ };', 'obj var arrayName =[ ];'],
        answer: 0
    },
    {
        number: 17,
        question: 'Which of the variables below is an array?',
        choices: ['var names="array"', 'var names = array;', 'var names = [];', 'var names[];'],
        answer: 2
    },
    {
        number: 18,
        question: ' How would you change the first element in an array?',
        choices: ['nums[1] = "New!";', 'nums = "New!";', 'var nums[1] = "New!";', 'nums[0] = "New!";'],
        answer: 3
    },
    {
        number: 19,
        question: ' Which of these lines of code show how to validly store an array with 3 items?',
        choices: ['var nums = [42, 3, 7];', 'var nums = 3, 42, 7;', 'var nums = [3];', 'var nums = (3, 42, 7);'],
        answer: 0
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

    // update with a note and the user's percentage
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