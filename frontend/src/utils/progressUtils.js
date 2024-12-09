export const saveProgress = (key, progress) => {
  localStorage.setItem(key, JSON.stringify(progress));
};

export const loadProgress = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data || { currentQuestionIndex: 0, timeLeft: 120, correctAnswersCount: 0 };
};
