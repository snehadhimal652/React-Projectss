import "./Game.css";

export default function Score({ p, c }) {
  return (
    <div className="score">
      <span>You: {p}</span>
      <span>Computer: {c}</span>
    </div>
  );
}