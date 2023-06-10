import React, {useEffect, useState} from 'react';
import { Header } from '../Header/Header';
import { Gameboard } from '../Gameboard/Gameboard';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Switch, Route } from 'react-router-dom';
import { fetchDefinition, fetchLetters } from '../../fetches';
import { cleanDefinitionData, DefinitionProps, cleanGameData } from '../../utilites';
import { Favorites } from '../Favorites/Favorites';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { DefinitionCard } from '../DefinitionCard/DefinitionCard';
import { Stats } from '../Stats/Stats';
import './App.css';

const App = () => {
  const [error, setError] = useState<String>(''),
        [center, setCenter] = useState<String>(''),
        [letters, setLetters] = useState<String[]>([]),
        [words, setWords] = useState<String[]>([]),
        [currentGuess, setGuess] = useState<String>(''),
        [answers, setAnswers] = useState<DefinitionProps[]>([]),
        [favorites, setFavorites] = useState<DefinitionProps[]>([]),
        [definition, setDefinition] = useState<DefinitionProps>(
          { meanings: [{partOfSpeech: '', definitions: [""]}], word: "", phonetic: ""});

  // Fetch Calls
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const json = await fetchLetters();
      if (!json.center) {
        throw new Error('Invalid response format');
      }
      const { letters, words, center } = cleanGameData(json);
      setCenter(center);
      setLetters(letters);
      setWords(words);
    } catch (error) {
      setError("Something went wrong");
    }
  };
 
  const getDefinition = async (word: String) => {
    try {
      const json = await fetchDefinition(word);
      if (json.title) {
        setAnswers((prevAnswers) => [...prevAnswers, { meanings: [{partOfSpeech: '', definitions: [""]}], word: word, phonetic: ""}])
        throw (json);
      } else {
        const cleanedDefinition = cleanDefinitionData(json[0]);
        setDefinition(cleanedDefinition);  
        setAnswers((prevAnswers) => [...prevAnswers, cleanedDefinition]);  
      }
    } catch (error : any) {
      setError(`${error.message}`);
    }
  };

  //Submission Functions
  const handleSubmit = ()  : void => {
    setError('');
    checkGuess(currentGuess);
    setGuess('');
  };

  const checkGuess = (guess : String) : void => {
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

  const updateCurrentGuess = (letter : String)  : void => {
    setGuess([currentGuess, letter].join(''));
  };

  const randomizeLetters = () : void => {
    const shuffledLetters = letters.slice().sort(() => {
      return 0.5 - Math.random();
    });
    setLetters(shuffledLetters);
  };

  //Functions for Word Cards
  const unfavorite = (wordToUnfavorite : DefinitionProps) => {
    const updatedFavorites = favorites.filter(word => word !== wordToUnfavorite);
    setFavorites([...updatedFavorites]);
  };

  const addFavorite = (newDefinition : DefinitionProps ) => {
    if (!favorites.includes(newDefinition)) {
      setFavorites([...favorites, newDefinition]);
    };
  };

  const checkFavorites = (word : String) => {
    return favorites.find(fav => fav.word === word ) ? true : false
  };
  
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path ="/favorites" render={() => (
          <Favorites favorites ={favorites}/>
          )}
        />
        <Route exact path = "/stats" render={()=> (
          <Stats total={words} correctAnswers={answers}/>
          )}
        />
        <Route exact path ="/" 
          render = { () => (
            <section className ='home-display'>
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
                  addFavorite= {addFavorite}
                  unfavorite = {unfavorite}
                  checkFavorites = {checkFavorites}
                />
                { !error && <DefinitionCard definition = {definition} key ={Date.now()}/> }
                { error && <ErrorMessage message= {error} /> }
              </aside>
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
