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
// Function To go back a mode
  const back = function () {
    if (history.length !== 0 && mode !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
