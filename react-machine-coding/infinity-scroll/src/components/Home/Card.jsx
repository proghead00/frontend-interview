import "./Card.css";

function Card({ title }) {
  const newTitle = title;
  return (
    <div className="card">
      <h3>{newTitle.substr(0, 150)}</h3>
    </div>
  );
}

export default Card;
