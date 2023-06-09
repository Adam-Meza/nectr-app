import React, {useEffect, useState} from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Gameboard } from '../Gameboard/Gameboard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { Definition } from '../Definition/Definition';

function App() {
  const [error, setError] = useState(null)
  const [center, setCenter] = useState('')
  const [letters, setLetters] = useState('')
  const [wordlist, setWords] = useState<String[]>([])

  const checkGuess = (guess : String) => {
    return wordlist.find(word => guess === word) ? true : false ;
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://freebee.fun/cgi-bin/today')
      if (response.ok) {
        const json = await response.json()
        const {letters, wordlist, center} = json

        setCenter(center)
        setLetters(letters)
        setWords(wordlist)
      } else {
        throw new Error()
      }

    } catch(error : any) {
      setError(error)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
 
  return (
    <div className="App">
      <Header/>
      <main>
        {error && <ErrorMessage message={error}/>}

        { !error && <Gameboard 
        checkGuess={checkGuess}
        letters ={letters} 
        center ={center} 
        words ={wordlist} />}
      </main>
      <aside className='aside'>
        <Scoreboard />
        <Definition />
      </aside>
    </div>
    
  );
}

export default App;
