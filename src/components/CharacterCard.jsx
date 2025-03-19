import "../styles/CharacterCard.css";

function CharacterCard({ id, title, imageUrl, onClick, shuffleClick }) {
  return (
    <div
      className="card"
      onClick={() => {
        onClick(id);
        shuffleClick();
      }}
    >
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}

export default CharacterCard;
