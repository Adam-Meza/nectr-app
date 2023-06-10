import React, {useState} from "react";
import './Scoreboard.css'
import { WordCard } from "../WordCard/WordCard";
import { WordProps } from "../../utilites";

interface ScoreboardProps {
  answers : WordProps[];
  addFavorite: (definition : WordProps) => void;
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