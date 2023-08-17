import React, {useEffect, useState} from 'react';
import { Header } from '../Header/Header';
import { Gameboard } from '../Gameboard/Gameboard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Switch, Route } from 'react-router-dom';
import { fetchDefinition, fetchLetters, fetchRandomLetters } from '../../fetches';
import { cleanDefinitionData, WordProps, cleanGameData } from '../../utilites';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { DefinitionCard } from '../DefinitionCard/DefinitionCard';
import { About } from '../About/About';
import Loading from '../Loading/Loading';
import Dropdown from '../Dropdown/Dropdown';
import './App.css';

const App = () => {
  const [error, setError] = useState<string>(''),
        [loading, setLoading] = useState<boolean>(true),
        [center, setCenter] = useState<string>(''),
        [letters, setLetters] = useState<string[]>([]),
        [words, setWords] = useState<string[]>([]),
        [currentGuess, setGuess] = useState<string>(''),
        [windowWidth, setWindowWidth] = useState(window.innerWidth),
        [answers, setAnswers] = useState<WordProps[]>([]),
        [definition, setDefinition] = useState<WordProps>(
          { meanings: [{partOfSpeech: '', definitions: [""]}], word: "", phonetic: ""});

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Fetch Calls
  useEffect(() => {
    fetchData();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchRandomLetters();
      if (!data.ok) {
        throw new Error();
      }

      const json = await data.json();
      const { letters, words, center } = cleanGameData(json);
      
      setError('');
      setAnswers([]);
      setGuess('');
      setDefinition({ meanings: [{partOfSpeech: '', definitions: [""]}], word: "", phonetic: ""});

      setLoading(false);
      setCenter(center);
      setLetters(letters);
      setWords(words);
      
    } catch (error) {
      setError("Something went wrong");
    }
  };
 
  const getDefinition = async (word: string) => {
    try {
      const data = await fetchDefinition(word);
      if (!data.ok) {
        setAnswers((prevAnswers) => [...prevAnswers, { meanings: [{partOfSpeech: '', definitions: [""]}], word: word, phonetic: ""}])
        throw (data);
      }

      const json = await data.json();
      const cleanedDefinition = cleanDefinitionData(json[0]);

      setDefinition(cleanedDefinition);  
      setAnswers((prevAnswers) => [...prevAnswers, cleanedDefinition]);  

    } catch (error : any) {
      setError(`${error.message}`);
    };
  };

  //Gameplay Funcitons 
  const handleSubmit = ()  : void => {
    setError('');
    checkGuess(currentGuess);
    setGuess('');
  };

  const checkGuess = (guess : string) : void => {
    guess = guess.toLowerCase();
    if (words.includes(guess.toLowerCase())) { 
      const newWords = words.filter(word => word !== guess);
      setWords(newWords);
      getDefinition(guess);
      setGuess('');
    } else if (guess.length < 4) {
      setError('Guesses must be at least 4 letters!');
    } else if (answers.find(answer => answer.word === guess) ){
      setError('You already got that word!');
    } else {
      setError('Please enter a valid word!');
    };
  };

  // Funcitons for Gameplay Buttons
  const deleteLastLetter = () : void => {
    setGuess(currentGuess.slice(0, -1));
  };

  const updateCurrentGuess = (letter : string)  : void => {
    setGuess([currentGuess, letter].join(''));
  };

  const randomizeLetters = () : void => {
    const shuffledLetters = letters.slice().sort(() => {
      return 0.5 - Math.random();
    });
    setLetters(shuffledLetters);
  };
  
  return (
    <div className="App">
      <Header fetchData={fetchData}/>
      <Switch>
        <Route exact path = "/about" render={()=> (
          <About />
          )}
        />
        <Route exact path ="/" 
          render = { () => (
            <section className ='home-display'>
              { loading &&  <Loading/> }
              { !loading &&
                <section className='main-content-wrapper'>
                  <Gameboard 
                    currentGuess = {currentGuess}
                    letters= {letters}
                    center={center}
                    handleSubmit={handleSubmit}
                    updateCurrentGuess={updateCurrentGuess}
                    deleteLastLetter = {deleteLastLetter}
                    randomizeLetters = {randomizeLetters}
                  />
                  <aside>
                    <Scoreboard
                      answers = {answers}
                    />
                    { !error && <DefinitionCard definition = {definition} key ={Date.now()}/> }
                    { error && <ErrorMessage message= {error} /> }
                  </aside>
                  {windowWidth < 850 && <Dropdown answers={answers}/>}
                </section>
              }
            </section>
          )}
        />
        <Route exact path ="/*" render={ () => (
          <ErrorMessage message ={"Nothing to see here!"}/>
          )}
        />
    </Switch>
    </div>
  );
};   

export default App;
