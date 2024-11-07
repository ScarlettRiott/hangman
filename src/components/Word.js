import React from "react"; // Import React library
import "./Word.css"; // Import custom CSS for styling the word display

// Word component displays the word with unguessed letters hidden
const Word = ({ word, guessedLetters }) => {
  return (
    <div className="Word">
      {" "}
      {/* Container for the word display */}
      {word.split("").map(
        (
          letter,
          index // Split the word into individual letters and map over each letter
        ) => (
          <span key={index} className="letter">
            {" "}
            {/* Each letter is wrapped in a span for styling */}
            {
              // If the letter is guessed or not an alphabet character, display it
              guessedLetters.includes(letter) || !/^[a-zA-Z]$/.test(letter)
                ? letter
                : "_" // Otherwise, display an underscore
            }
          </span>
        )
      )}
    </div>
  );
};

export default Word; // Export component for use in other parts of the app
