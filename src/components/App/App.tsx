import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Gameboard } from "../Gameboard/Gameboard";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Scoreboard } from "../Scoreboard/Scoreboard";
import { DefinitionCard } from "../DefinitionCard/DefinitionCard";
import { About } from "../About/About";
import {
  cleanDefinitionData,
  WordProps,
  WordBase,
  fetchDefinition,
} from "../../utilites";
import { Dropdown } from "../Dropdown/Dropdown";
import "./App.css";

const App = () => {
  const [error, setError] = React.useState<string>(""),
    [center, setCenter] = React.useState<string>(""),
    [letters, setLetters] = React.useState<string[]>([]),
    [currentGuess, setGuess] = React.useState<string>(""),
    [windowWidth, setWindowWidth] = React.useState(window.innerWidth),
    [answers, setAnswers] = React.useState<WordProps[]>([]),
    [definition, setDefinition] = React.useState<WordProps>(WordBase);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Fetch Calls
  React.useEffect(() => {
    setNewGame();

    return window.addEventListener("resize", handleResize);
  }, []);

  const getRandomLetter: (lettersToCompare: string[], vowel: boolean) => any = (
    lettersToCompare: string[],
    vowel: boolean
  ) => {
    const letters = vowel ? "AEIOU" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = Math.floor(Math.random() * letters.length);
    const letter = letters[index];

    if (lettersToCompare?.includes(letter))
      return getRandomLetter(lettersToCompare, vowel);
    else return letter;
  };

  const clearBoard = () => {
    setError("");
    setAnswers([]);
    setGuess("");
    setDefinition(WordBase);
  };

  const createGameData = () => {
    const center = getRandomLetter([], false);
    let letters: string[] = [];
    let i = 0;

    while (i < 6) {
      const vowel = i < 2 ? true : false;
      const letter = getRandomLetter([center, ...letters], vowel);
      letters.push(letter);
      i++;
    }

    return {
      center: center,
      letters: letters,
    };
  };

  const setNewGame = () => {
    const gameData = createGameData();

    clearBoard();
    setCenter(gameData.center);
    setLetters(gameData.letters);
  };

  const getDefinition = async (word: string) => {
    try {
      const data = await fetchDefinition(word);
      if (!data.ok) {
        throw data;
      }

      const json = await data.json();
      return cleanDefinitionData(json[0]);
    } catch (error: any) {
      return false;
    }
  };

  //Gameplay Funcitons
  const handleSubmit = (): void => {
    setError("");
    checkGuess(currentGuess);
    setGuess("");
  };

  const checkGuess = async (guess: string) => {
    const definition = await getDefinition(guess);
    setGuess("");

    if (guess.length < 4) {
      setError("Guesses must be at least 4 letters!");
      return;
    } else if (!guess.includes(center)) {
      setError("Guess must contain the middle letter!");
      return;
    } else if (answers.find((answer) => answer.word === guess)) {
      setError("You already got that word!");
      return;
    } else if (definition) {
      setAnswers((prevAnswers) => [...prevAnswers, definition]);
      setDefinition(definition);
      return;
    } else {
      setError("Please enter a valid word!");
      return;
    }
  };

  const deleteLastLetter = (): void => {
    setGuess(currentGuess.slice(0, -1));
  };

  const updateCurrentGuess = (letter: string): void => {
    setGuess([currentGuess, letter].join(""));
  };

  const randomizeLetters = (): void => {
    const shuffledLetters = letters.slice().sort(() => 0.5 - Math.random());
    setLetters(shuffledLetters);
  };

  const gameBoardProps = {
    currentGuess: currentGuess,
    letters: letters,
    center: center,
    handleSubmit: handleSubmit,
    updateCurrentGuess: updateCurrentGuess,
    deleteLastLetter: deleteLastLetter,
    randomizeLetters: randomizeLetters,
  };

  return (
    <div className="App">
      <Header startNewGame={setNewGame} />
      <Switch>
        <Route exact path="/about" render={() => <About />} />
        <Route
          exact
          path="/"
          render={() => (
            <section className="home-display">
              <section className="main-content-wrapper">
                <Gameboard props={gameBoardProps} />
                <aside>
                  <Scoreboard answers={answers} />
                  {!error && (
                    <DefinitionCard definition={definition} key={Date.now()} />
                  )}
                  {error && <ErrorMessage message={error} />}
                </aside>
                {windowWidth < 850 && <Dropdown answers={answers} />}
              </section>
            </section>
          )}
        />
        <Route
          exact
          path="/*"
          render={() => <ErrorMessage message={"Nothing to see here!"} />}
        />
      </Switch>
    </div>
  );
};

export default App;
