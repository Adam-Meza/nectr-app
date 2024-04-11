/**
 * Props for a whole word:
 *
 * {
 * meanings: MeaningProps[];
 * phonetic: string;
 * word: string;
 * };
 */

export interface WordProps {
  meanings: MeaningProps[];
  phonetic: string;
  word: string;
}

export interface MeaningProps {
  partOfSpeech: string;
  definitions: any;
}

export interface GameDataFetchProps {
  center: string;
  letters: string;
  wordlist: string[];
  words: Number;
}

export const cleanDefinitionData = (definition: WordProps) => {
  const selectedMeanings = definition.meanings.map((meaning: MeaningProps) => {
    return {
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions[0].definition,
    };
  });

  return {
    word: definition.word,
    phonetic: definition.phonetic,
    meanings: selectedMeanings,
  };
};

export const cleanGameData = (data: GameDataFetchProps) => {
  return {
    center: data.center.toUpperCase(),
    letters: data.letters.toUpperCase().split(""),
    words: data.wordlist,
    amountOfWords: data.words,
  };
};
