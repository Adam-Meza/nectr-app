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
