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


// window.onload = function () {
    
// BEGIN GLOBAL VARIABLES
// Number of wins - starts at zero, will increase as user accumulate wins.
var wins = 0;

// Letters that have been guessed.
var lettersGuessed = [];

// The hidden word to be revealed letter by letter
var hiddenWord = [];

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

// Randomly choose a potterWord and convert to an array
var potterIndex = Math.floor(Math.random() * potterWords.length);
var activeWord = Array.from(potterWords[potterIndex]);

// Show dashes in the dom in lieu of the activeWord
for (i = 0; i < activeWord.length; i++) {
    hiddenWord[i] = "-";
}
document.querySelector("#active-word").innerHTML = hiddenWord.join(" ");

// Number of guesses remaining. User will have a number of guesses 1.75x the length of the word to complete.
var guessesRemaining = Math.floor(activeWord.length * 1.75);
document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;


// When key pressed =================================================================================================
document.onkeyup = function keyPress(event) {

    // var key and conditional prevent the user from inputting non-alphabet characters
    var key = event.keyCode;
    if ((key >= 65 && key <= 90) || (key == 8)) {

        //the charachter is captured, converted to uppercase, and saves it to variable userLetter
        var userLetter = String.fromCharCode(event.which).toUpperCase();

        // Search lettersGuessed for the userLetter
        var findGuessed = lettersGuessed.indexOf(userLetter);

        // if userLetter IS NOT in lettersGuessed...
        if (findGuessed === -1) {

            // push the key pressed to the lettersGuessed array
            var addLetters = lettersGuessed.push(userLetter);

            // the value of the variable is written to the used-letters ID in the html document
            // .join(" ") produces a cleaner, minimal visual (no commas) in lieu of solely displaying the lettersGuessed array
            document.querySelector("#used-letters").innerHTML = lettersGuessed.join(" ");

            // the value of the variable is written to the chosen-letter ID in the document
            document.querySelector("#chosen-letter").innerHTML = userLetter;

            // Search activeWord for the userLetter
            var findLetterIndex = activeWord.indexOf(userLetter);

            // If userLetter IS in activeWord...
            if (~findLetterIndex) {

                // Replace the dash in hiddenWord with the userLetter
                for (u = 0; u < activeWord.length; u++) {
                    if (activeWord[u] === userLetter) {
                        hiddenWord[u] = userLetter;
                        document.querySelector("#active-word").innerHTML = hiddenWord.join(" ");
                    }
                }

                // hiddenWord[findLetter] = userLetter;
                console.log("you found the letter " + userLetter);

            // If userLetter IS NOT in active Word
            } else {

            // The number of guesses remaining is reduced and replaced in the DOM
            guessesRemaining--;
            document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;

            }

        // if userLetter IS in lettersGuessed... 
        } else {

            // Tell the user to pick something else
            alert("You have already guessed " + userLetter);
        }
    // test to ensure non-alpha keys register
    } else {
        console.log("please select a letter of the alphabet");
    }

}
// }