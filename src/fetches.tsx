export const fetchDefinition = async (word : String) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const json = await response.json();

    if (response.status >= 400 && response.status <= 599) {
      throw new Error('Network response was not OK');
    }

    return json;
  } catch (error) {
    throw error;
  }
};

export const fetchLetters = async () => {
  try {
    const response = await fetch('https://freebee.fun/cgi-bin/today');
    const json = await response.json();

    if (response.status >= 400 && response.status <= 599) {
      throw new Error('Network response was not OK');
    }

    return json;
  } catch (error) {
    throw error;
  }
};
