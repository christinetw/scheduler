import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Transition to a new React mode
   * @param {} mode 
   * @param {*} replace 
   */
  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  /**
   * Go back to the previous React mode using history
   */
  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(prev => ([...prev.slice(0, - 1)]));
    }
  }

  return { mode, transition, back };
}