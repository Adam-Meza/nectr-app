import React, { useState } from "react";
import { Boardpiece } from "../Boardpiece/Boardpiece";
import './/gameboard.css'

interface GameboardProps {
  center: any
  letters: any
  words: String[]
  checkGuess : (guess : String ) => boolean
}

export const Gameboard : React.FC<GameboardProps> = ({center, letters, checkGuess}) => {
  const [currentGuess, setGuess] = useState<String[]>([])

  const handleSubmit = () => {
    checkGuess(currentGuess.join())
    setGuess([])
  }

  const updateCurrentGuess = (letter : String) => {
    setGuess([...currentGuess, letter])
  }

  letters = letters.split('')
  return (
    <section>
        <h2>{currentGuess}</h2>
      <section className = 'gameboard'>
      <div className="piece-container">
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[0]}/>
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[1]}/>
      </div>
      <div className="piece-container">
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[2]}/>
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {center} center = {true}/>
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[3]}/>
      </div>
      <div className="piece-container">
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[4]}/>
        <Boardpiece updateCurrentGuess= {updateCurrentGuess} letter = {letters[5]}/>
      </div>
      </section>
      <div className ='button-container'>
        <button onClick = {() => handleSubmit()}></button>
        {/* <button></button>
        <button></button> */}
      </div>
    </section>
  )
}