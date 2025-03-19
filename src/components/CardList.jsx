import { useQuery, gql } from "@apollo/client";
import Card from "./CharacterCard";
import { useEffect, useState } from "react";

const GET_CHARACTER = gql`
  query ($anime: String) {
    Media(search: $anime) {
      characters(perPage: 20, page: 1) {
        nodes {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
  }
`;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function CardList({ anime, onClick }) {
  const [characters, setCharacters] = useState(null);
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { anime },
  });

  useEffect(() => {
    if (data?.Media?.characters?.nodes) {
      setCharacters(data.Media.characters.nodes);
    }
  }, [data]);

  if (!characters || loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const shuffleClick = () => {
    setCharacters(shuffleArray([...characters]));
  };

  return (
    <div className="cards">
      {characters.map(({ id, name, image }) => (
        <Card
          key={id}
          id={id}
          title={name.full}
          imageUrl={image.large}
          onClick={onClick}
          shuffleClick={shuffleClick}
        />
      ))}
    </div>
  );
}

export default CardList;
