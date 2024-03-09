import he from "he";
import { nanoid } from "nanoid";

import { useState, useCallback, useMemo } from "react";

import { TriviaAnswers } from "./TriviaAnswers.jsx";
import { TriviaAnswerItem } from "./TriviaAnswerItem.jsx";

// export const TriviaQuestion = ({
//   answersOnly,
//   setAnswersOnly,
//   quizItem,
//   index,
// }) => {
export const TriviaQuestion = ({
  // answersOnly,
  // setAnswersOnly,
  answerScreen,
  correctAnswer,
  questionId,
  questionText,
  setAnswerScreen,
  shuffledAnswerList,
  // index,
}) => {
  // const id = nanoid();
  // const { correctAnswerItem, id, question, shuffledAnswerList } = quizItem;

  console.log("TriviaQuestion rendered");

  // const [randomIndex, setRandomIndex] = useState(null);
  // console.log("randomIndex: ", randomIndex);

  // const [rng, setRng] = useState(generateRandomIndex());
  // console.log("rng: ", rng);

  // const getRandomIndex = () => {
  //   let newIndex = Math.floor(Math.random() * 4);
  //   setRandomIndex(newIndex);
  //   console.log("randomIndex: ", randomIndex);
  // };
  // const randomIndex = useMemo(() => {
  //   // getRandomIndex();
  //   return Math.floor(Math.random() * 4);
  // }, [index]);
  // console.log("randomIndex/index: ", [randomIndex, index]);

  //console.log([randomIndex, index]);

  // return (
  //   <section className="quiz-item">
  //     <h4 className="quiz-question">{he.decode(question)}</h4>
  //     <TriviaAnswers
  //       index={index}
  //       answersOnly={answersOnly}
  //       setAnswersOnly={setAnswersOnly}
  //       incorrectAnswers={quizItem.incorrect_answers}
  //     />
  //   </section>
  // );

  const triviaAnswerDisplay = shuffledAnswerList.map(
    (shuffledAnswerItem, answerId) => {
      return (
        <TriviaAnswerItem
          answerId={answerId}
          answerScreen={answerScreen}
          correctAnswer={correctAnswer}
          key={answerId}
          questionId={questionId}
          setAnswerScreen={setAnswerScreen}
          shuffledAnswerItem={shuffledAnswerItem}
        />
      );
    }
  );

  return (
    <section className="quiz-item">
      <h4 className="quiz-question">{he.decode(questionText)}</h4>
      <div className="quiz-answers">{triviaAnswerDisplay}</div>
      {/* <TriviaAnswers
        index={index}
        answersOnly={answersOnly}
        setAnswersOnly={setAnswersOnly}
        incorrectAnswers={quizItem.incorrect_answers}
      /> */}
    </section>
  );
};
