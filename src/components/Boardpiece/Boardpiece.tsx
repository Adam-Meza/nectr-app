import React from "react";
import './Boardpiece.css'

interface BoardpieceProps {
  letter : string;
  id?: string;
  updateCurrentGuess : (letter : string) => void;
};

export const Boardpiece : React.FC<BoardpieceProps> = ({letter, updateCurrentGuess, id}) => {
  return (
    <button className = 'boardpiece' onClick={() => updateCurrentGuess(letter)} id ={id}>
      <strong>{letter}</strong>
    </button>
  );
};