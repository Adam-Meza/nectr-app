import React, {useEffect, useState} from "react";
import './word-card.css';
import { WordProps } from "../../utilites";
 

interface WordCardProps {
  definition: WordProps;
}

export const WordCard : React.FC<WordCardProps> = ({definition}) => {
  return (
    <div className="word-card">
      <p className="guess">{definition.word}</p>
    </div>
  );
};