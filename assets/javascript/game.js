// BEGIN PSEUDOCODE

// link to the html page

// on page load:
// display instructions and "press enter to start"

// press enter:
// randomly select from the array of game words
// display game area

// on a key event:
// read which key was pressed
// loop to compare key value to each index position of the word array
// reduce number of guesses remaining
// if correct, reveal position in 

// END PSEUDOCODE

// BEGIN GLOBAL VARIABLES
// Number of wins - starts at zero, will increase as user accumulate wins.
var wins = 0;

// Harry Potter-themed words to be guessed.
var potterWords = [
    "HARRY",
    "HERMIONE",
    "RON",
    "HAGRID",
    "DUMBLEDORE",
    "SNAPE",
    "VOLDEMORT",
    "HOGWARTS",
    "GRYFFINDOR",
    "RAVENCLAW",
    "HUFFLEPUFF",
    "SLYTHERIN",
    "QUIDDITCH",
    "HORCRUX",
    "PENSIEVE",
    "WAND",
]

// Randomly choose a potterWord to be called later
var potterIndex = Math.floor(Math.random() * potterWords.length);
var activeWord = potterWords[potterIndex];

// Show dashes in the dom in lieu of the activeWord

for (i = 0; i < activeWord.length; i++) {
    document.getElementById("active-word").innerHTML = "-";
}

// Number of guesses remaining. User will have a number of guesses 1.75x the length of the word to complete.
// var guessesRemaining = Math.floor(activeWord.length * 1.75);
// document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
// this won't work yet, so we're going with 15
var guessesRemaining = 15;

// Letters that have been guessed.
var lettersGuessed = [];

// When key pressed =================================================================================================
document.onkeyup = function keyPress(event) {

    // var key and conditional prevent the user from inputting non-alphabet characters
    var key = event.keyCode;
    if ((key >= 65 && key <= 90) || (key == 8)) {

        // The number of guesses remaining is reduced and replaced in the DOM
        guessesRemaining--;
        document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;

        //the charachter is captured, converted it to uppercase, and saves it to a variable
        var userLetter = String.fromCharCode(event.which).toUpperCase();

        //the value of the variable is written to the chosen-letter ID in the document
        document.querySelector("#chosen-letter").innerHTML = userLetter;

        // search the array for userLetter
        var findGuess = lettersGuessed.indexOf(userLetter);

        // if userLetter IS NOT in lettersGuessed...
        if (findGuess === -1) {

            // push the key pressed to the lettersGuessed array
            var addLetters = lettersGuessed.push(userLetter);

            // the value of the variable is written to the used-letters ID in the html document
            // this produces a cleaner visual in lieu of just displaying the lettersGuessed array
                var textNode = document.createTextNode(userLetter + " ");
                document.querySelector("#used-letters").appendChild(textNode);

            // if userLetter IS in lettersGuessed... 
        } else {

            // Tell the user to pick something else
            alert("You have already guessed " + userLetter);
        }
    } else {
        console.log("please select a letter of the alphabet");
    }

}
