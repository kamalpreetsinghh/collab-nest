export const capitalizeWords = (inputString: string) => {
  const words = inputString.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const result = capitalizedWords.join(" ");

  return result;
};

export const isBase64DataURL = (value: string): boolean => {
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  return base64Regex.test(value);
};
