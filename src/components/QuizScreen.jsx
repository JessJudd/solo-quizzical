import he from "he";

import { TriviaQuestion } from "./TriviaQuestion.jsx";
import { useState } from "react";

export const QuizScreen = ({
  quizData,
  setShowQuizQuestions,
  setResetQuiz,
}) => {
  const [userAnswerList, setUserAnswerList] = useState([{}, {}, {}, {}, {}]);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const quizTotal = quizData.length;
  const numCorrectAnswers = userAnswerList.filter(
    (answer) => answer.isCorrect == true
  ).length;

  const checkAnswers = () => {
    const userAnswerListNew = structuredClone(userAnswerList);
    console.log("userAnswerListNew: ", userAnswerListNew);

    userAnswerListNew.forEach(({ userAnswer }, index) => {
      console.log("[index]: ", [index]);
      console.log("userAnswerList[index]: ", userAnswerList[index]);

      if (userAnswer === quizData[index].correctAnswerItem) {
        userAnswerListNew[index].isCorrect = true;
      } else {
        let decoded_correct_answer = he.decode(
          quizData[index].correctAnswerItem
        );
        userAnswerListNew[index].correctAnswerItem = decoded_correct_answer;
        userAnswerListNew[index].isCorrect = false;
      }
      userAnswerListNew[index].validated = true;
    });

    setUserAnswerList(userAnswerListNew);
    setShowQuizResults((oldShowQuizResults) => !oldShowQuizResults);
  };

  const quizQuestions = quizData.map((quizItem) => {
    return (
      <TriviaQuestion
        key={quizItem.id}
        setUserAnswerList={setUserAnswerList}
        userAnswerList={userAnswerList}
        quizItem={quizItem}
        validated={showQuizResults} //
      />
    );
  });

  const handleResetQuiz = () => {
    // return to start screen
    setShowQuizQuestions((prevShowQuizQuestions) => !prevShowQuizQuestions);
    // clear quiz data to run useEffect
    setResetQuiz(true);
  };

  return (
    <section className="screen screen--quiz">
      {/* <div className="quiz-container">{quizElements}</div> */}
      {quizQuestions}
      {!showQuizResults && (
        <button className="button button--quiz" onClick={checkAnswers}>
          Check answers
        </button>
      )}

      {showQuizResults && (
        <div className="quiz-results">
          <p className="results-heading">
            You scored {numCorrectAnswers}/{quizTotal} correct answers.
          </p>
          <button className="button button--results" onClick={handleResetQuiz}>
            Play again
          </button>
        </div>
      )}
    </section>
  );
};
