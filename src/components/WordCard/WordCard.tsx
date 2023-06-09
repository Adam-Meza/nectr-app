import React, {useEffect, useState} from "react";
import './word-card.css';
import { DefinitionProps } from "../../utilites";
 

interface WordCardProps {
  definition: DefinitionProps;
  unfavorite: (word : any) => void
  addFavorite: (definition : DefinitionProps) => void;
  checkFavorites: (word : String) => Boolean
};

export const WordCard : React.FC<WordCardProps> = ({definition, addFavorite, unfavorite, checkFavorites}) => {
  const[favorite, setFavorite] = useState<Boolean>(false);

  useEffect(() => {
    checkFavorites(definition.word) ? setFavorite(true) : setFavorite(false);
  }, []);

  const handleFavoriteToggle = () => {
    if (!favorite) {
      addFavorite(definition);
      setFavorite(true);
    } else {
      unfavorite(definition);
      setFavorite(false);
    };
  };

  return (
    <div className="word-card">
      <h3>{definition.word}</h3>
      {!favorite && <button className="favorite-button" onClick={() => handleFavoriteToggle()}>Favorite</button>}
      {favorite && <button className="unfavorite-button" onClick={() => handleFavoriteToggle()}>Unfavorite</button>}
    </div>
  );
};