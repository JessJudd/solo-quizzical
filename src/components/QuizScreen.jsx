import he from "he";

import { nanoid } from "nanoid";
import { TriviaQuestion } from "./TriviaQuestion.jsx";
import { useState } from "react";

// export const QuizScreen = ({ answersOnly, setAnswersOnly, quizData }) => {
export const QuizScreen = ({ quizData }) => {
  // const [answerScreen, setanswerScreen] = useState({
  //   isCheckAnswerList: false,
  //   userAnswerList: [],
  // });
  const [answerScreen, setAnswerScreen] = useState({
    isCheckAnswerList: false,
    userAnswerList: [],
  });
  console.log("QuizScreen rendered");

  // const checkAnswers = () => {
  //   console.log("[checkAnswers]");
  //   answersOnly.map((answer) => {
  //     console.log(answer.user_answer === answer.correct_answer);
  //     // if true set answer to green
  //     // if false set useranswer to red, set correctanswer to green
  //   });
  // };
  // const checkAnswers = () => {
  //   console.log("[checkAnswers]");
  //   const userAnswerListNew = structuredClone(userAnswerList);

  //   userAnswerListNew.forEach(({ userAnswer }, index) => {
  //     console.log(
  //       "quizData[index].correctAnswerItem: ",
  //       quizData[index].correctAnswerItem
  //     );
  //     if (userAnswer === quizData[index].correctAnswerItem) {
  //       userAnswerListNew[index].isCorrect = true;
  //     } else {
  //       userAnswerListNew[index].correctAnswerItem =
  //         quizData[index].correctAnswerItem;
  //     }
  //   });

  //   setUserAnswerList(userAnswerListNew);
  // };
  const checkAnswers = () => {
    console.log("[checkAnswers]");
    const answerScreenNew = structuredClone(answerScreen);

    answerScreenNew.isCheckAnswerList = true;

    setAnswerScreen(answerScreenNew);
  };

  // const quizQuestions = quizData.map((quizItem, index) => {
  //   const id = nanoid();
  //   return (
  //     <TriviaQuestion
  //       key={id}
  //       answersOnly={answersOnly}
  //       setAnswersOnly={setAnswersOnly}
  //       quizItem={quizItem}
  //       index={index}
  //     />
  //   );
  // });
  // const quizQuestions = quizData.map((quizItem, index) => {

  const quizQuestions = quizData.map(
    ({ correctAnswer, questionId, questionText, shuffledAnswerList }) => {
      // const id = nanoid();
      return (
        <TriviaQuestion
          // answersOnly={answersOnly}
          // setAnswersOnly={setAnswersOnly}
          answerScreen={answerScreen}
          correctAnswer={correctAnswer}
          key={questionId}
          questionId={questionId}
          questionText={questionText}
          setAnswerScreen={setAnswerScreen}
          shuffledAnswerList={shuffledAnswerList}
          // index={index}
        />
      );
    }
  );

  // const quizElements = quizData.map((quizItem) => {
  //   i++;
  //   const { question, correct_answer, incorrect_answers } = quizItem;
  //   const id = nanoid();
  //   const quizNum = `q${i}`;

  //   const rng = Math.floor(Math.random() * 4);

  //   const allAnswers = incorrect_answers.map((answer) => {
  //     return he.decode(answer);
  //   });
  //   const decoded_correct_answer = he.decode(correct_answer);
  //   correctAnswers[quizNum] = decoded_correct_answer;
  //   allAnswers.splice(rng, 0, decoded_correct_answer);

  //   let n = 0;
  //   const answerElements = allAnswers.map((answer) => {
  //     n++;
  //     return (
  //       <div className="quiz-answer-single" key={n}>
  //         <input
  //           className="answer-input"
  //           name={quizNum}
  //           id={answer}
  //           type="radio"
  //           value={answer}
  //           onChange={(event) => handleChange(event)}
  //         />
  //         <label htmlFor={answer} className="answer-label" name={quizNum}>
  //           {answer}
  //         </label>
  //       </div>
  //     );
  //   });

  //   return (
  //     <section className="quiz-item" key={id}>
  //       <h4 className="quiz-question">
  //         {he.decode(question)} ({rng}={decoded_correct_answer})
  //       </h4>
  //       <div className="quiz-answers">{answerElements}</div>
  //     </section>
  //   );
  // });

  return (
    <section className="screen screen--quiz">
      {/* <div className="quiz-container">{quizElements}</div> */}
      {quizQuestions}
      <button className="button button--quiz" onClick={checkAnswers}>
        Check answers
      </button>

      {/* <div className="quiz-results">
        <p className="results-heading">You scored 5/5 correct answers.</p>
        <button className="button button--results">Play again</button>
      </div> */}
    </section>
  );
};
