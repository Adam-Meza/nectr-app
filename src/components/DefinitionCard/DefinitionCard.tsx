import React from "react";
import './DefinitionCard.css'
import { WordProps, MeaningProps } from "../../utilites";
import { MeaningCard } from "../MeaningCard/MeaningCard";

interface DefinitionCardProps {
  definition: WordProps;
};

export const DefinitionCard : React.FC<DefinitionCardProps> = ({definition}) => {
  const {word, meanings, phonetic} = definition;
  const meaningCards = meanings.map((meaningInst : MeaningProps, index : number) => {
    const {partOfSpeech, definitions} = meaningInst;
    return <MeaningCard partOfSpeech={partOfSpeech} meaning ={definitions} key = {index}/>;
  }).slice(0,2);

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

