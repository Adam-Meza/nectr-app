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

export const fetchDefinition = async (word: String) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.status >= 400 && response.status <= 599) {
      throw new Error("Network response was not OK");
    }

    return response;
  } catch (error) {
    throw error;
  }
};
