import he from "he";

export const TriviaQuestion = ({
  setUserAnswerList,
  quizItem,
  userAnswerList,
  validated,
}) => {
  const { correctAnswerItem, id, question, shuffledAnswerList } = quizItem;

  const handleChange = (event) => {
    const { value } = event.target;

    const userAnswerListNew = structuredClone(userAnswerList);

    if (userAnswerList[id]) {
      userAnswerListNew[id].userAnswer = value;
    } else {
      userAnswerListNew[id] = {
        userAnswer: value,
        isCorrect: false,
      };
    }

    setUserAnswerList(userAnswerListNew);
  };

  const isAnswerCorrect = (clickedAnswer) => {
    const {
      userAnswer,
      isCorrect,
      correctAnswerItem: correctAnswer,
      validated,
    } = userAnswerList[id] ? userAnswerList[id] : "";
    let newClass;

    if (
      (validated && userAnswer === clickedAnswer && isCorrect) ||
      clickedAnswer === correctAnswer
    ) {
      newClass = "correct-answer";
    } else if (validated && userAnswer === clickedAnswer && !isCorrect) {
      newClass = "wrong-answer";
    } else {
      newClass = "";
    }

    return newClass;
  };

  const triviaAnswerDisplay = shuffledAnswerList.map(
    (shuffledAnswerItem, index) => {
      return (
        <div
          className={`quiz-answer-single ${isAnswerCorrect(
            shuffledAnswerItem
          )}`}
          key={index}
        >
          <input
            className="answer-input"
            id={`question-${id}-answer${index}`}
            name={`question-${id}`}
            type="radio"
            value={shuffledAnswerItem}
            onChange={!validated ? (event) => handleChange(event) : null}
            disabled={validated ? true : false}
          />
          <label
            htmlFor={`question-${id}-answer${index}`}
            className="answer-label"
            name={`question-${id}`}
          >
            {shuffledAnswerItem}
          </label>
        </div>
      );
    }
  );

  let answersValidated =
    validated && userAnswerList.length == 5 ? "quiz-validated" : "";

  return (
    <section className="quiz-item">
      <h4 className="quiz-question">{he.decode(question)}</h4>
      <div className={`quiz-answers ${answersValidated}`}>
        {triviaAnswerDisplay}
      </div>
    </section>
  );
};
