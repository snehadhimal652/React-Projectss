import { useState, useEffect } from "react";
import Controls from "./Controls";
import Player from "./Player";
import Result from "./Result";
import Score from "./Score";
import "./Game.css";

const choices = ["Rock", "Paper", "Scissors"];

export default function Game() {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [result, setResult] = useState("");
  const [pScore, setPScore] = useState(0);
  const [cScore, setCScore] = useState(0);

  useEffect(() => {
    if (player) {
      const random = Math.floor(Math.random() * 3);
      setComputer(choices[random]);
    }
  }, [player]);

  useEffect(() => {
    if (player && computer) checkWinner();
  }, [computer]);

  const checkWinner = () => {
    if (player === computer) setResult("Draw");
    else if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      setResult("You Win ");
      setPScore(pScore + 1);
    } else {
      setResult("You Lose ");
      setCScore(cScore + 1);
    }
  };

  const reset = () => {
    setPlayer("");
    setComputer("");
    setResult("");
    setPScore(0);
    setCScore(0);
  };

  return (
    <div className="game">
      <h1>Rock Paper Scissors</h1>
      <Score p={pScore} c={cScore} />
      <Controls setPlayer={setPlayer} />

      <div className="players">
        <Player name="You" choice={player} className={result.includes("Win") ? "winner" : ""} />
        <Player name="Computer" choice={computer} className={result.includes("Lose") ? "winner" : ""} />
      </div>

      <Result result={result} />
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
}