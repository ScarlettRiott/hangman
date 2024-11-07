import React from "react"; // Import React library
import "./Keyboard.css"; // Import custom CSS for styling the keyboard

// Keyboard component displays an alphabet keyboard for guessing letters
const Keyboard = ({ onGuess, guessedLetters }) => {
  // Define the alphabet as an array of lowercase letters
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="Keyboard">
      {" "}
      {/* Container for the keyboard buttons */}
      {alphabet.map((letter) => (
        <button
          key={letter} // Unique key for each button to help React identify list items
          onClick={() => onGuess(letter)} // Call onGuess with the letter when button is clicked
          disabled={guessedLetters.includes(letter)} // Disable button if letter has been guessed
        >
          {letter} {/* Display the letter on the button */}
        </button>
      ))}
    </div>
  );
};

export default Keyboard; // Export component for use in other parts of the app
