export interface WordProps {
  meanings: MeaningProps[];
  phonetic: String;
  word: String;
};

export interface MeaningProps {
  partOfSpeech: String;
  definitions: any;
};

export interface GameDataFetchProps {
  center : String;
  letters : String;
  wordlist : String[];
  words: Number;
};

export const cleanDefinitionData = (definition : WordProps) => {
  const selectedMeanings = definition.meanings.map((meaning : MeaningProps) => {
    return {
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions[0].definition
    };
  });
  
  return {
    word: definition.word,
    phonetic: definition.phonetic,
    meanings: selectedMeanings
  };
};

export const cleanGameData = (data: GameDataFetchProps) => {
  return {
    center: data.center.toUpperCase(),
    letters: data.letters.toUpperCase().split(''),
    words: data.wordlist,
    amountOfWords: data.words
  };
};