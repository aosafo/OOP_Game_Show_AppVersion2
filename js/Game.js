/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {        let phraseArr = [];        phraseArr.push(new Phrase("Jesus is lord"));        phraseArr.push(new Phrase("Blessings in the name of Jesus"));        phraseArr.push(new Phrase("Favor grace"));        phraseArr.push(new Phrase("Anointed preacher"));        phraseArr.push(new Phrase("Bible text"));        return phraseArr;    }    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {        return this.phrases[Math.floor(Math.random() * this.phrases.length)];    }    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {        let overlay = document.getElementById("overlay");        overlay.style.display = "none";        let phraseObj = this.getRandomPhrase();        phraseObj.addPhraseToDisplay();        this.activePhrase = phraseObj;    }    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't
       won
     */
    checkForWin() {        // Get the Letters that have a class name called letter
        const letters = document.getElementsByClassName("letter");        // Loop through the letters and check if it has the css class hide.        // If it does, the user has not revealed all the letters, so no win        for (let m = 0; m < letters.length; m++) {            if (letters[m].classList.contains("hide"))
                return false;
        }        return true;    }
    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out lives
     */
    removeLife() {

        // Get all the lives
        const lives = document.getElementsByClassName("tries");
        
        lives[this.missed].firstElementChild.src = "images/lostHeart.png";

        if (this.missed == 4) {
            this.gameOver(false);
        }

        this.missed++;
    }

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {

        // Display the original start screen overlay
        let overlay = document.getElementById("overlay");        overlay.style.display = "block";

        // Get the overlay h1 element
        const game_over_message = document.getElementById("game-over-message");

        // If the user won the game, display win message, else display loss
        // message
        if (gameWon) {
            game_over_message.innerText = "Great Job!";
            overlay.className = overlay.className.replace(/\bstart\b/g, "win");
        }
        else {
            game_over_message.innerText = "Sorry, better luck next time!";
            overlay.className = overlay.className.replace(/\bstart\b/g, "lose");
        }

    }

    /**
     * Handles onscreen keyboard button clicks
     * @param (HTMLButtonElement) button - The clicked button element
     */
    handleInteraction(button) {
        
        // Disable the selected letter's onscreen keyboard button
        button.disabled = true;

        // Check if the phrase contains the guessed letter, if it contains it,
        // add the chosen Css class to the selected letter's keyboard button,
        // call the showMatchedLetter() method on the phrase, and then
        // call the checkForWin() method, if the player has won the game, 
        // also call the gameOver() method if not, add the wrong Css class 
        // to the selected letter's keyboard button and call the removeLife 
        // method
        if (this.activePhrase.checkLetter(button.innerText)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(button.innerText);

            if (this.checkForWin()) {
                this.gameOver(true); 
            }
        }
        else {

            button.classList.add("wrong");
            this.removeLife();
        }
        
    }
}