//tabs
$('ul.tabs').each(function() {
    // for each set of tabs keep track of active/not
    var $active, $content, $links = $(this).find('a');

    // default to open on first tab
    $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // hide everything else
    $links.not($active).each(function() {
        $(this.hash).hide();
    });

    $(this).on('click', 'a', function(e) {
        // make the old tab inactive
        $active.removeClass('active');
        $content.hide();

        $active = $(this);
        $content = $(this.hash);

        // make tab active
        $active.addClass('active');
        $content.show();

        e.preventDefault();
    });
});

$(document).on("click", 'a', function() {
    $('a').removeClass('active');
    $(this).addClass('active');
});
//end tabs

//flip the card when it's clicked:
$(document).ready(
    function() {
        $(".card").flip({
            trigger: 'manual'
        });
        $(".card").click(function() {
            $(".card").flip("toggle");
        });
    }
);

//card Array:
var startingCards = [{
    "front": "What is an array?",
    "back": "An array is an ordered collection of values",
    "status": "missed"
}, {
    "front": "What is a element?",
    "back": "An element is a value in an array.",
    "status": "missed"
}, {
    "front": "What is an index?",
    "back": "The ordered position of the elements in the array",
    "status": "missed"
}, {
    "front": "Are arrays typed or untyped?",
    "back": "JS arrays are untyped, meaning any type of data can be inserted as a value",
    "status": "missed"
}, {
    "front": "What does it mean that JS arrays are dynamic?",
    "back": "It means they grow and shrink as needed; there is no need to declare a fixed size",
    "status": "missed"
}, {
    "front": "What does it mean that JS arrays are sparse?",
    "back": "It means that the elements do not have contiguous indexes from zero, but that there may be gaps",
    "status": "missed"
}, {
    "front": "What is the construct for an array literal?",
    "back": "var empty = []; An empty array.",
    "status": "missed"
}, {
    "front": "Are all indexes property names?",
    "back": "Yes, but not all property names are indexes. Only numbers between 0 - 2^32-2",
    "status": "missed"
}, {
    "front": "What happens when you call an array index that does not exist?",
    "back": "It returns undefined because it is a type of object property",
    "status": "missed"
}, {
    "front": "What is the value of the length property?",
    "back": "i + 1 because the first index number = 0",
    "status": "missed"
}, {
    "front": "What happens if you delete a value from an array index?",
    "back": "That index becomes sparse",
    "status": "missed"
}, {
    "front": "What code in a for loop would skip null, undefined, or nonexistent elements?",
    "back": "if (!a[i]) continue;",
    "status": "missed"
}, {
    "front": "What code in a for loop would skip nonexistent elements?",
    "back": "(!(i in a)) continue;",
    "status": "missed"
}, {
    "front": "What is a heterogeneous array?",
    "back": "An array that is comprised of different types of values: strings, numbers, and booleans",
    "status": "missed"
}, {
    "front": "What is a jagged array?",
    "back": "An array that is composed of two or more arrays that do not have the same number of values in their respective arrays",
    "status": "missed"
}, {
    "front": "What is a multidimensional array?",
    "back": "An array that has one or more arrays nested inside of it",
    "status": "missed"
}, {
    "front": "array.reverse();",
    "back": "reverses the order of elements in an array and returns the reversed array",
    "status": "missed"
}, {
    "front": "Define array.join()",
    "back": "A method that converts all elements of an array to a string and concatenates them returning the resulting string",
    "status": "missed"
}, {
    "front": "array.pop();",
    "back": "deletes the last element of an array",
    "status": "missed"
}, {
    "front": "array.shift();",
    "back": "deletes the first element of an array",
    "status": "missed"
}, {
    "front": "toString();",
    "back": "converts all elements of an array to a string and returns a comma separated list of them",
    "status": "missed"
}];
//copying the arrays to preserve a copy of the original
var fullCards = startingCards.slice();

var missedCards = [];

//initializing some variables
var numberCards = fullCards.length;
var indexCounter = 0;
var successCounter = 0;
var failCounter = 0;
var isMissed = false;

function shuffle(arr) {
    //derived from the Fisher-Yates Shuffle
    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
} //returns a randomly re-ordered array

//displays the card front
function cardFront(number) {
    document.getElementById('front').innerHTML = fullCards[number].front;
}
//displays the card back
function cardBack(number) {
    document.getElementById('back').innerHTML = fullCards[number].back;
}

function setUp() {
    fullCards = startingCards.slice();
    successCounter = 0;
    failCounter = 0;
    indexCounter = 0;
    numberCards = fullCards.length;
    document.getElementById("howMany").innerHTML = "<p>" + numberCards + " Terms in this set</p>";

    shuffle(fullCards);
    cardFront(indexCounter);
    cardBack(indexCounter);
    $("#full").hide();
    $("#missed").hide();
    document.getElementById("success").innerHTML = "Got It!";
    document.getElementById("fail").innerHTML = "Missed It!";
    //intializing the progress bar 
    document.getElementById("percent").innerHTML = "Card " + 1 + " of " + numberCards;
    var percentage = (1 / numberCards) * 100;
    document.getElementById("bar").style.width = percentage + "%";
}
setUp();
//this is the 're-set' of cards for someone who just wants to retry their missed cards
function setUpMissed() {
    if (missedCards.length > 0) {
        for (var j = 0; j < missedCards.length; j++) {
            if (missedCards[j].status === "known") {
                for (var k = 0; k < fullCards.length; k++) {
                    if (missedCards[j].front === fullCards[k].front && missedCards[j].back === fullCards[k].back) {
                        fullCards[k].status = "known";
                    }
                }
            }
        }
    }

    //clear the missedcard array
    missedCards.length = 0;
    for (var i = 0; i < fullCards.length; i++) {
        if (fullCards[i].status === "missed") {
            missedCards.push({
                "front": fullCards[i].front,
                "back": fullCards[i].back,
                "status": fullCards[i].status
            });
        }
    }

    successCounter = 0;
    failCounter = 0;
    indexCounter = 0;
    $("#success").show();
    $("#fail").show();
    $("#progress").show();
    $("#successRate").hide();
    $("#full").hide();
    $("#missed").hide();

    numberCards = missedCards.length;

    shuffle(missedCards);

    document.getElementById("front").innerHTML = missedCards[indexCounter].front;

    document.getElementById("back").innerHTML = missedCards[indexCounter].back;

    document.getElementById("success").innerHTML = "Got It!";
    document.getElementById("fail").innerHTML = "Missed It!";
    //progress bar 
    document.getElementById("percent").innerHTML = "Card " + 1 + " of " + numberCards;
    var percentage = (1 / numberCards) * 100;
    document.getElementById("bar").style.width = percentage + "%";

}
//when someone clicks either 'Missed it' or 'Got it' this is what progresses the cards forward
function nextCard() {
    //what happens when they're going through a deck:
    if (indexCounter < fullCards.length - 1) {
        indexCounter = indexCounter + 1;
        cardFront(indexCounter);
        cardBack(indexCounter);

    } else if (successCounter === fullCards.length) {
        //when someone reaches the end of a set and got them all right!
        document.getElementById("full").innerHTML = "Retry";
        $("#full").show();
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();
        indexCounter = 0;
        successCounter = 0;
        failCounter = 0;
        document.getElementById("successRate").innerHTML = "You killed it!!<br>Click below to retry the entire deck.";

        $("#successRate").show();

    } else if (failCounter === fullCards.length) {
        //when someone reaches the end of the set and got them all wrong
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();
        $("#missed").hide();
        indexCounter = 0;
        failCounter = 0;
        successCounter = 0;
        document.getElementById("full").innerHTML = "Retry";
        $("#full").show();

        document.getElementById("successRate").innerHTML = "You missed all the cards, but practice makes perfect.";
        $("#successRate").show();
    } else {
        //when someone reaches the end of a set having missed some
        document.getElementById("successRate").innerHTML = "Known Cards: " + successCounter + "<br>" + "Missed Cards: " + failCounter;
        $("#successRate").show();
        shuffle(fullCards);

        indexCounter = 0;
        successCounter = 0;
        failCounter = 0;
        document.getElementById("success").innerHTML = "Got It!";
        document.getElementById("fail").innerHTML = "Missed It!";
        document.getElementById("full").innerHTML = "Retry Full Set";
        $("#full").show();
        $("#missed").show();
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();

    }
    //happens each time a person progresses through the cards
    var cardCounter = indexCounter + 1;
    document.getElementById("percent").innerHTML = "Card " + cardCounter + " of " + numberCards;
    document.getElementById("bar").style.width = (cardCounter / numberCards) * 100 + "%";
}

function nextCardMissed() {
    //what happens when they're going through a deck:
    if (indexCounter < missedCards.length - 1) {

        indexCounter = indexCounter + 1;
        //displays the card back
        document.getElementById('front').innerHTML = missedCards[indexCounter].front;
        //displays the card back
        document.getElementById('back').innerHTML = missedCards[indexCounter].back;

    } else if (successCounter === missedCards.length) {
        //when someone reaches the end of a set and got them all right!
        document.getElementById("full").innerHTML = "Retry";
        $("#full").show();
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();
        indexCounter = 0;
        successCounter = 0;
        failCounter = 0;
        document.getElementById("successRate").innerHTML = "You got them all! <br>Click below to retry the entire deck.";

        $("#successRate").show();

    } else if (failCounter === missedCards.length) {
        //when someone reaches the end of the set and got them all wrong
        $("#missed").show();
        $("#full").show();
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();
        document.getElementById("successRate").innerHTML = "Known Cards: " + successCounter + "<br>" + "Missed Cards: " + failCounter + "<br>Practice makes perfect.";
        indexCounter = 0;
        failCounter = 0;
        successCounter = 0;

        $("#successRate").show();
    } else {
        //when someone reaches the end of a set having missed some
        document.getElementById("successRate").innerHTML = "Known Cards: " + successCounter + "<br>" + "Missed Cards: " + failCounter;
        $("#successRate").show();
        indexCounter = 0;
        successCounter = 0;
        failCounter = 0;
        document.getElementById("success").innerHTML = "Got It!";
        document.getElementById("fail").innerHTML = "Missed It!";
        document.getElementById("full").innerHTML = "Retry Full Set";
        $("#full").show();
        $("#missed").show();
        $("#success").hide();
        $("#fail").hide();
        $("#progress").hide();

    }
    //happens each time a person progresses through the cards
    var cardCounter = indexCounter + 1;
    document.getElementById("percent").innerHTML = "Card " + cardCounter + " of " + missedCards.length;
    document.getElementById("bar").style.width = (cardCounter / missedCards.length) * 100 + "%";
}

//a success counter goes up by 1 each time someone presses the 'got it' button
document.getElementById("success").addEventListener("click", function addOneSuccessCounter() {
    successCounter = successCounter + 1;

    //changes the button to show how many known
    document.getElementById("success").innerHTML = "Got it! (" + successCounter + ")";

});

//fail counter goes up by one if 'Missed it' is clicked
document.getElementById("fail").addEventListener("click", function addOneFailCounter() {
    failCounter = failCounter + 1;

    //changes the button to show how many missed
    document.getElementById("fail").innerHTML = "Missed It (" + failCounter + ")";
});

document.getElementById("missed").addEventListener("click", function() {
    isMissed = true;
});
document.getElementById("full").addEventListener("click", function() {
    isMissed = false;
});
//marks card as known
function markIfKnown() {
    if (isMissed) {
        missedCards[indexCounter].status = "known";
    } else {
        fullCards[indexCounter].status = "known";
    }

}
document.getElementById("full").addEventListener("click", function() {
    $("#success").show();
    $("#fail").show();
    $("#progress").show();
    $("#successRate").hide();
});
document.getElementById("missed").addEventListener("click", function() {
    $("#success").show();
    $("#fail").show();
    $("#progress").show();
    $("#successRate").hide();
});
document.getElementById("success").addEventListener("click", markIfKnown);

function markIfMissed() {
    if (isMissed) {
        missedCards[indexCounter].status = "missed";
    } else {
        fullCards[indexCounter].status = "missed";
    }

}
document.getElementById("fail").addEventListener("click", markIfMissed);
document.getElementById("full").addEventListener("click", setUp);
document.getElementById("missed").addEventListener("click", setUpMissed);

function whichCardSet() {
    if (isMissed) {
        nextCardMissed();
    } else {
        nextCard();
    }
}
document.getElementById("fail").addEventListener("click", whichCardSet);
document.getElementById("success").addEventListener("click", whichCardSet);
//end of 'Quiz Mode'
//'Study Mode' - show all the cards in order 
function showAll(arr) {
    for (var i = 0; i < arr.length; i++) {
        var frontContent = arr[i].front;
        var backContent = arr[i].back;
        $("#studyCards").append("<div class =\"card front study\">" + frontContent + "</div>");
        $("#studyCards").append("<div class = \"card back study\" style = \"vertical-align:top\">" + backContent + "</div><br>");
    }
}
showAll(startingCards);