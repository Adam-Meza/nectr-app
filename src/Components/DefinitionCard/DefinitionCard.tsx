import React from "react";
import './DefinitionCard.css'
import { DefinitionProps, MeaningProps } from "../../utilites";
import { MeaningCard } from "../MeaningCard/MeaningCard";

interface DefinitionCardProps {
  definition: DefinitionProps;
};

export const DefinitionCard : React.FC<DefinitionCardProps> = ({definition}) => {
  const {word, meanings, phonetic} = definition;
  const meaningCards = meanings.map((meaningInst : MeaningProps) => {
    const {partOfSpeech, definitions} = meaningInst;
    return <MeaningCard partOfSpeech={partOfSpeech} meaning ={definitions}/>;
  });

  return (
    <div className="definition">
      <div className="title-box">
        <h2 className ="word">{word}</h2>
        <p className="part-of-speech"><em>{phonetic}</em></p>
      </div>
      {meanings && meaningCards}
    </div>
  );
};

