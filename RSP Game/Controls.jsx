import "./Game.css";

export default function Controls({ setPlayer }) {
  return (
    <div className="controls">
      <button onClick={() => setPlayer("Rock")}>🪨 Rock</button>
      <button onClick={() => setPlayer("Paper")}>📄 Paper</button>
      <button onClick={() => setPlayer("Scissors")}>✂ Scissors</button>
    </div>
  );
}