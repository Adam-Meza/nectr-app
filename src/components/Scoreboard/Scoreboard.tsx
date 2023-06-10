import React, {useState} from "react";
import './Scoreboard.css'
import { WordCard } from "../WordCard/WordCard";
import { DefinitionProps } from "../../utilites";

interface ScoreboardProps {
  answers : DefinitionProps[];
  addFavorite: (definition : DefinitionProps) => void;
  unfavorite : (word : any) => void;
  checkFavorites: (word : String) => Boolean
};

export const Scoreboard : React.FC <ScoreboardProps> = ({answers, addFavorite, unfavorite, checkFavorites}) => {
  const correctAnswers = answers.map((answer, index) => (
    <WordCard 
      definition = {answer}
      addFavorite = {addFavorite}
      unfavorite = {unfavorite}
      checkFavorites = {checkFavorites}
      key = {index}
      />
  ));
  
  return (
    <div className='scoreboard'>
      {correctAnswers}
    </div>
  );
};