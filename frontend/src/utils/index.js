export const getSavedQuizProgress = (storageKey) => {
  const savedData = JSON.parse(localStorage.getItem(storageKey));
  return {
    currentQuestionIndex: savedData?.currentQuestionIndex ?? 0,
    timeLeft: savedData?.timeLeft,
    correctAnswersCount: savedData?.correctAnswersCount ?? 0,
    examSessionId: savedData?.examSessionId ?? null,
  };
};

export const saveQuizProgress = (storageKey, progress) => {
  localStorage.setItem(storageKey, JSON.stringify(progress));
};

export const mapSubjectToPath = (subject) => {
  const subjectPaths = {
    "General Principles of Financial Planning": "gpquestions",
    "Risk Management and Insurance Planning": "rmquestions",
    "Investment Planning": "ipquestions",
    "Tax Planning": "tpquestions",
    "Retirement Savings and Income Planning": "rsquestions",
    "Estate Planning": "epquestions",
  };
  return subjectPaths[subject] || "";
};
