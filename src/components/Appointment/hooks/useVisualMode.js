import { useState } from "react";

// Function to Dynamically change modes(states)
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // Function To transition from one mode to another, using prev to avoid mutating
  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  };
  // Function To go back a mode (modified to clone history and not mutate history)
  const back = () => {
    const pastHistory = history.length > 1 ? history.slice(0, -1) : initial;
    setHistory(pastHistory);
    console.log(history);
    setMode(
      Array.isArray(pastHistory)
        ? pastHistory[pastHistory.length - 1]
        : pastHistory
    );
  };

  return { mode, transition, back };
}
