import React from "react";
import { Header } from "../Header/Header";
import { Gameboard } from "../Gameboard/Gameboard";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Switch, Route } from "react-router-dom";
import { fetchDefinition } from "../../fetches";
import { cleanDefinitionData, WordProps } from "../../utilites";
import { Scoreboard } from "../Scoreboard/Scoreboard";
import { DefinitionCard } from "../DefinitionCard/DefinitionCard";
import { About } from "../About/About";
import Dropdown from "../Dropdown/Dropdown";
import "./App.css";

const App = () => {
  const [error, setError] = React.useState<string>(""),
    [loading, setLoading] = React.useState<boolean>(false),
    [center, setCenter] = React.useState<string>(""),
    [letters, setLetters] = React.useState<string[]>([]),
    [currentGuess, setGuess] = React.useState<string>(""),
    [windowWidth, setWindowWidth] = React.useState(window.innerWidth),
    [answers, setAnswers] = React.useState<WordProps[]>([]),
    [definition, setDefinition] = React.useState<WordProps>({
      meanings: [{ partOfSpeech: "", definitions: [""] }],
      word: "",
      phonetic: "",
    });

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Fetch Calls
  React.useEffect(() => {
    setNewGame();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRandomLetter: (lettersToCompare: string[]) => any = (
    lettersToCompare: string[]
  ) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const index = Math.floor(Math.random() * alphabet.length);
    const letter = alphabet[index];

    if (lettersToCompare?.includes(letter)) {
      return getRandomLetter(lettersToCompare);
    } else {
      return letter;
    }
  };

  const clearBoard = () => {
    setError("");
    setAnswers([]);
    setGuess("");
    setDefinition({
      meanings: [{ partOfSpeech: "", definitions: [""] }],
      word: "",
      phonetic: "",
    });
  };

  const createGameData = () => {
    const center = getRandomLetter([]);
    const letters = [1, 2, 3, 4, 5, 6].reduce((acc: string[], num) => {
      const letter = getRandomLetter(acc);
      acc.push(letter);
      return acc;
    }, []);

    return {
      center: center.toUpperCase(),
      letters: letters,
    };
  };

  const setNewGame = () => {
    clearBoard();
    setCenter(createGameData().center);
    setLetters(createGameData().letters);
  };

  const getDefinition = async (word: string) => {
    try {
      const data = await fetchDefinition(word);
      if (!data.ok) {
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          {
            meanings: [{ partOfSpeech: "", definitions: [""] }],
            word: word,
            phonetic: "",
          },
        ]);
        throw data;
      }

      const json = await data.json();
      const cleanedDefinition = cleanDefinitionData(json[0]);
      return cleanedDefinition;
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

    if (guess.length < 4) {
      setError("Guesses must be at least 4 letters!");
      return;
    } else if (answers.find((answer) => answer.word === guess)) {
      setGuess("");
      setError("You already got that word!");
      return;
    } else if (definition) {
      setGuess("");
      setDefinition(definition);
      return;
    } else {
      setError("Please enter a valid word!");
      return;
    }
  };

  // Funcitons for Gameplay Buttons
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

  return (
    <div className="App">
      <Header fetchData={setNewGame} />
      <Switch>
        <Route exact path="/about" render={() => <About />} />
        <Route
          exact
          path="/"
          render={() => (
            <section className="home-display">
              <section className="main-content-wrapper">
                <Gameboard
                  currentGuess={currentGuess}
                  letters={letters}
                  center={center}
                  handleSubmit={handleSubmit}
                  updateCurrentGuess={updateCurrentGuess}
                  deleteLastLetter={deleteLastLetter}
                  randomizeLetters={randomizeLetters}
                />
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
