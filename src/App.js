import React, { useState, useEffect, useRef } from "react";
import './App.css'; // Add your styles here

function App() {
  // State variables
  const [textToType, setTextToType] = useState("");
  const [typedText, setTypedText] = useState("");
  const [timer, setTimer] = useState(60);  // Time set to 60 seconds initially
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wpm, setWpm] = useState(0); // New state for Words Per Minute

  // Timer logic
  useEffect(() => {
    let interval;
    if (isStarted && timer > 0) {
      interval = setInterval(() => setTimer(prevTime => prevTime - 1), 1000);
    } else if (timer === 0) {
      setIsFinished(true);
      setIsStarted(false);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isStarted, timer]);

  // Function to start the game
  const startGame = () => {
    setIsStarted(true);
    setTimer(60); // Reset timer to 60 seconds
    setTypedText("");
    setWordsTyped(0);
    setWpm(0); // Reset WPM
    setIsFinished(false);
    generateRandomText(); // Generate new random text for each game
  };

  // Handle typing input
  const handleTyping = (e) => {
    setTypedText(e.target.value);
    const wordCount = e.target.value.trim().split(" ").length;
    setWordsTyped(wordCount);

    // Calculate WPM dynamically
    const currentWpm = Math.round((wordCount / (60 - timer)) * 60);
    setWpm(currentWpm);
  };

  // Random text generation logic
  const generateRandomText = () => {
    const texts = [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "To be, or not to be, that is the question.",
      "All that glitters is not gold.",
      "The early bird catches the worm.",
      "A picture is worth a thousand words."
    ];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTextToType(randomText);
  };

  return (
    <div className="App">
      <h1>Typing Speed Tester</h1>
      {!isStarted && !isFinished && (
        <button onClick={startGame}>Start Game</button>
      )}

      <div>
        <p>Time Left: {timer}s</p>
        <p>Words Typed: {wordsTyped}</p>
        <p>Words Per Minute: {wpm}</p> {/* Display WPM */}
      </div>

      <div>
        <p>{textToType}</p>
        <textarea 
          value={typedText}
          onChange={handleTyping}
          disabled={isFinished}
          placeholder="Start typing above text"
        />
      </div>

      {isFinished && (
        <div>
          <h2>Game Over!</h2>
          <p>You typed {wordsTyped} words in 60 seconds.</p>
          <p>Your typing speed: {wpm} WPM</p> {/* Display WPM on game over */}
        </div>
      )}
    </div>
  );
}

export default App;
