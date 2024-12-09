/**
 * Fisher-Yates Shuffle Algorithm
 * Shuffles an array in place.
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
export const fisherYatesShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
