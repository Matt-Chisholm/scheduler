import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (newMode !== mode) {
      setMode(newMode);
      (replace
        ? history[history.length - 1] = newMode
        : history.push(newMode)
      );
      setHistory([ ...history ]);
    }
  }

  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory([ ...history ]);
    }
  }

  return { mode, transition, back };
}
