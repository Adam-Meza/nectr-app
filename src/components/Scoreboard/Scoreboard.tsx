import React, {useState} from "react";
import './Scoreboard.css'
import { WordCard } from "../WordCard/WordCard";
import { WordProps } from "../../utilites";

interface ScoreboardProps {
  answers : WordProps[];
};

export const Scoreboard : React.FC <ScoreboardProps> = ({answers}) => {
  const correctAnswers = answers.map((answer, index) => (
    <WordCard 
      definition = {answer}
      key = {index}
      />
  ));
  
  return (
    <div className='scoreboard'>
      {correctAnswers}
    </div>
  );
};