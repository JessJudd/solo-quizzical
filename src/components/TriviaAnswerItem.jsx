export const TriviaAnswerItem = ({
  answerScreen,
  correctAnswer,
  answerId,
  questionId,
  setAnswerScreen,
  shuffledAnswerItem,
}) => {
  const handleChange = (value) => {
    console.log("[fx]handleChange()");

    const answerScreenNew = structuredClone(answerScreen);

    answerScreenNew.userAnswerList[questionId] = value;

    setAnswerScreen(answerScreenNew);

    // const newAnswers = [...answersOnly];
    // newAnswers[index] = userAnswer;
    // setAnswersOnly(newAnswers);
    // console.log("answersOnly: ", answersOnly);
    // set value as user_answer in answersOnly
  };

  let checkButtonClass;

  // if answer list is being checked
  // then add appropriate button class
  if (answerScreen.isCheckAnswerList) {
    if (shuffledAnswerItem === correctAnswer) {
      checkButtonClass = "correct-class";
    } else if (shuffledAnswerItem === answerScreen.userAnswerList[questionId]) {
      checkButtonClass = "incorrect-class";
    } else {
      checkButtonClass = "";
    }
  }

  return (
    // <div className="quiz-answer-single" key={index}>
    <div
      // className={`quiz-answer-single ${
      //   (userAnswerList[id]?.userAnswer === shuffledAnswerItem &&
      //     userAnswerList[id]?.isCorrect) ||
      //   (userAnswerList[id]?.correctAnswerItem === shuffledAnswerItem &&
      //     shuffledAnswerItem)
      //     ? "correct-class"
      //     : "incorrect-class"
      // }`}
      className={`${checkButtonClass} quiz-answer-single`}
      key={`question-${questionId}-answer${answerId}`}
    >
      <input
        className="answer-input"
        id={`question-${questionId}-answer${answerId}`}
        name={`question-${questionId}`}
        type="radio"
        value={shuffledAnswerItem}
        // checked={answersOnly[index].user_answer === answer ? true : false}
        onChange={(event) => handleChange(event.target.value)}
      />
      <label
        htmlFor={`question-${questionId}-answer${answerId}`}
        className="answer-label"
        name={`question-${questionId}`}
      >
        {shuffledAnswerItem}
      </label>
    </div>
  );
};
