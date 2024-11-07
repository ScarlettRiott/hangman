import React from "react"; // Import React library
import "./HangmanDrawing.css"; // Import custom CSS for styling

// HangmanDrawing component displays the current state of the hangman based on wrong guesses
const HangmanDrawing = ({ wrongGuesses }) => {
  return (
    <div className="HangmanDrawing">
      {" "}
      {/* Container for the hangman drawing */}
      <img
        // Dynamically set the image source based on the number of wrong guesses
        src={`/images/state${wrongGuesses}.gif`}
        alt={`Hangman state ${wrongGuesses}`} // Descriptive alt text for accessibility
      />
    </div>
  );
};

export default HangmanDrawing; // Export component for use in other parts of the app
