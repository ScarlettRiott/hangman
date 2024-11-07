import React, { useState, useEffect } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import "./App.css";

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(1); // Start from 1 to show the first GIF
  const maxWrongGuesses = 11;

  useEffect(() => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word);
        setWord(getRandomWord(words));
      });
  }, []);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

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
    setWrongGuesses(1); // Reset to 1 to show the first GIF
  };

  const hasWon = word
    .split("")
    .every(
      (letter) => guessedLetters.includes(letter) || !/^[a-zA-Z]$/.test(letter)
    );
  const hasLost = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <HangmanDrawing wrongGuesses={wrongGuesses} />
      <Word word={word} guessedLetters={guessedLetters} />
      <Keyboard onGuess={handleGuess} guessedLetters={guessedLetters} />
      <div className="status">
        {hasWon && <p>You won!</p>}
        {hasLost && <p>You lost! The word was {word}</p>}
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default App;
