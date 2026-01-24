import "./Game.css";

export default function Player({ name, choice }) {
  return (
    <div className="player">
      <h3>{name}</h3>
      <p>{choice || "?"}</p>
    </div>
  );
}