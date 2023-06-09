import React from "react";
import './/Boardpiece.css'

interface BoardpieceProps {
  letter : string
  center? : boolean
  updateCurrentGuess : (letter : string) => void
}

export const Boardpiece : React.FC<BoardpieceProps> = ({letter, updateCurrentGuess}) => {
  return (
    <button className = 'boardpiece' onClick={() => updateCurrentGuess(letter)}>
      {letter}
    </button>
  )
}