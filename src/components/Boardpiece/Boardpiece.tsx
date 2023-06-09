import React from "react";
import './Boardpiece.css'

interface BoardpieceProps {
  letter : String;
  id?: string;
  updateCurrentGuess : (letter : String) => void;
};

export const Boardpiece : React.FC<BoardpieceProps> = ({letter, updateCurrentGuess, id}) => {
  return (
    <button className = 'boardpiece' onClick={() => updateCurrentGuess(letter)} id ={id}>
      <strong>{letter}</strong>
    </button>
  );
};