import React from "react";
import { WordProps } from "../../utilites";

interface StatsProps {
  total: String[];
  correctAnswers: WordProps[];
}

export const Stats : React.FC<StatsProps> = ({total, correctAnswers}) => {
  const totalWords  = total.length;
  const numberOfCorrectAnswers = correctAnswers.length;

  return(
    <section className="stats">
      <h2>Current Game</h2>
      <p>Words Guessed: {`${numberOfCorrectAnswers}`}</p>
      <p>Total Words Possible: {`${totalWords}`}</p>
    </section>
  )
}