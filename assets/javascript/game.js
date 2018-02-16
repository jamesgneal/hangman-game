$(document).ready(function() {
  // BEGIN GLOBAL VARIABLES

  // Audio files for winning and losing
  var expelliarmus = new Audio("assets/audio/expelliarmus.mp3");
  var avada = new Audio("assets/audio/avada.mp3");

  // Number of wins - starts at zero, will increase as user accumulate wins.
  var wins = 0;
  document.querySelector("#win-count").innerHTML = wins;

  // Letters that have been guessed.
  var lettersGuessed = [];

  // The hidden word to be revealed letter by letter
  var hiddenWord = [];


  // The last word played
  // var lastWord = hiddenWord.push("!");

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
    "WAND"
  ];

  // Randomly choose a potterWord, converts to an array, and removes the word for subesquent rounds
  var potterIndex;
  var activeWord = [];

  // Number of guesses remaining. User will start with 12;
  var guessesRemaining = 12;

  // Begin the game, as well as the reset after a word has been solved or all guesses used.
  function gameStart() {
    // reset letters that have been guessed.
    lettersGuessed = [];
    document.querySelector("#used-letters").innerHTML = lettersGuessed.join(" ");

    // reset the hidden word to be revealed letter by letter
    hiddenWord = [];

    // Randomly choose a potterWord, converts to an array, and removes the word for subesquent rounds
    potterIndex = Math.floor(Math.random() * potterWords.length);
    activeWord = Array.from(potterWords[potterIndex]);
    potterWords.splice(potterIndex, 1);

    // Cheating for easy debugging ============================== DELETE LATER ======================================
    console.log(activeWord.join(" "));

    // Show dashes in the dom in lieu of the activeWord
    for (i = 0; i < activeWord.length; i++) {
      hiddenWord[i] = "-";
    }
    document.querySelector("#active-word").innerHTML = hiddenWord.join(" ");

    // Reset guesses to 12;
    guessesRemaining = 12;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
  }

    // END GLOBAL VARIABLES +++++ LET'S PLAY!
  gameStart();

  // When key pressed =================================================================================================
  document.onkeyup = function keyPress(event) {
    // var key and conditional prevent the user from inputting non-alphabet characters
    var key = event.keyCode;
    if ((key >= 65 && key <= 90) || key == 8) {
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

          // Check if the user has guessed all the letters
          var checkWin = hiddenWord.indexOf("-");

          // If user has guessed all letters in activeWord...
          if (checkWin === -1) {
            // Play the winnging expelliarmus audio
            expelliarmus.play();
            
            // Increase the win count and display in the DOM
            wins++;
            document.querySelector("#win-count").innerHTML = wins;
            
            // Reveal the word just guessed at the bottom of the screen
            document.querySelector("#right-or-wrong").innerHTML = "YOU CORRECTLY GUESSED";
            document.querySelector("#last-word").innerHTML = activeWord.join(" ") + "!";
            // document.querySelector("#game-image").innerHTML = '<img src="assets/images/baselayer.png">';

            // reset the game area
            gameStart();
          }

          // If userLetter IS NOT in active Word
        } else {
          // The number of guesses remaining is reduced and replaced in the DOM
          guessesRemaining--;
          document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;

          // Check to see if user has run out of guesses
          if (guessesRemaining == 0) {
            // Play the losing avada kedavra audio
            avada.play();

            // Reveal the word just guessed at the bottom of the screen
            document.querySelector("#right-or-wrong").innerHTML = "SORRY - YOU COULDN'T GUESS";
            document.querySelector("#last-word").innerHTML = activeWord.join(" ") + "!";
            // document.querySelector("#game-image").innerHTML = '<img src="assets/images/baselayer.png">';

            // reset the game area
            gameStart();
          }
        }
      } 

    // test to ensure non-alpha keys register
    } else {
      console.log("please select a letter of the alphabet");
    }
  };
});
