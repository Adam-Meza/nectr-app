export const WordBase = {
  meanings: [{ partOfSpeech: "", definitions: [""] }],
  word: "",
  phonetic: "",
};

export type WordProps = typeof WordBase;

export interface MeaningProps {
  partOfSpeech: string;
  definitions: any;
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
