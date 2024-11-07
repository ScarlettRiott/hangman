// Import necessary React hooks and components
import React, { useState, useEffect } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import "./App.css";

// Helper function to select a random word from the list of words
const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  // State to store the word to guess
  const [word, setWord] = useState("");

  // State to store letters guessed by the user
  const [guessedLetters, setGuessedLetters] = useState([]);

  // State to keep track of wrong guesses; start from 1 to show the first hangman image
  const [wrongGuesses, setWrongGuesses] = useState(1);

  // Maximum number of wrong guesses allowed before the game is lost
  const maxWrongGuesses = 11;

  // Fetch a list of words from the dictionary and set a random word as the word to guess
  useEffect(() => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word); // Filter out any empty lines
        setWord(getRandomWord(words));
      });
  }, []);

  // Handle a guessed letter by the user
  const handleGuess = (letter) => {
    // Ignore if the letter has already been guessed
    if (guessedLetters.includes(letter)) return;

    // Update guessed letters state
    setGuessedLetters([...guessedLetters, letter]);

    // If the guessed letter is not in the word, increment the wrong guesses counter
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  // Restart the game by fetching a new word and resetting guessed letters and wrong guesses
  const restartGame = () => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word);
        setWord(getRandomWord(words));
      });
    setGuessedLetters([]);
    setWrongGuesses(1); // Reset to 1 to show the first hangman image
  };

  // Determine if the player has won by checking if all letters in the word are guessed
  const hasWon = word
    .split("")
    .every(
      (letter) => guessedLetters.includes(letter) || !/^[a-zA-Z]$/.test(letter)
    );

  // Determine if the player has lost by checking if wrong guesses exceed the maximum allowed
  const hasLost = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      {/* Display the hangman drawing based on wrong guesses */}
      <HangmanDrawing wrongGuesses={wrongGuesses} />

      {/* Display the word with blanks for unguessed letters */}
      <Word word={word} guessedLetters={guessedLetters} />

      {/* Display the keyboard for user to guess letters */}
      <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />

      {/* Display win/lose messages based on game status */}
      <div className="status">
        {hasWon && <p>You won!</p>}
        {hasLost && <p>You lost! The word was {word}</p>}
      </div>

      {/* Button to restart the game */}
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default App;
