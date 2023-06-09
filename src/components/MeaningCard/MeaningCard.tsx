import React from "react";
import './MeaningCard.css'
import { MeaningProps } from "../../utilites";

interface MeaningCardProps {
  partOfSpeech: String;
  meaning: String;
}

export const MeaningCard : React.FC<MeaningCardProps> = ({partOfSpeech, meaning}) => {
  return (
    <div>
      <p className="part-of-speech"><em>{partOfSpeech}</em></p>
      <p className="meaning">{meaning}</p>
    </div>
  )
}
