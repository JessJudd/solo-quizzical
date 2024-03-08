import he from "he";
import { nanoid } from "nanoid";

import { useState, useCallback, useMemo } from "react";

import { TriviaAnswers } from "./TriviaAnswers.jsx";

// export const TriviaQuestion = ({
//   answersOnly,
//   setAnswersOnly,
//   quizItem,
//   index,
// }) => {
export const TriviaQuestion = ({
  // answersOnly,
  // setAnswersOnly,
  setUserAnswerList,
  quizItem,
  userAnswerList,
  // index,
}) => {
  // const id = nanoid();
  const { correctAnswerItem, id, question, shuffledAnswerList } = quizItem;

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

  const handleChange = (event) => {
    console.log("[fx]handleChange()");
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

    // const newAnswers = [...answersOnly];
    // newAnswers[index] = userAnswer;
    // setAnswersOnly(newAnswers);
    // console.log("answersOnly: ", answersOnly);
    // set value as user_answer in answersOnly
  };

  console.log("userAnswerList QUESTION", userAnswerList);
  console.log("id QUESTION", id);
  console.log("userAnswerList[id]?.isCorrect", userAnswerList[id]?.isCorrect);
  const triviaAnswerDisplay = shuffledAnswerList.map(
    (shuffledAnswerItem, index) => {
      return (
        // <div className="quiz-answer-single" key={index}>
        <div
          className={`quiz-answer-single ${
            (userAnswerList[id]?.userAnswer === shuffledAnswerItem &&
              userAnswerList[id]?.isCorrect) ||
            (userAnswerList[id]?.correctAnswerItem === shuffledAnswerItem &&
              shuffledAnswerItem)
              ? "correct-class"
              : "incorrect-class"
          }`}
          key={index}
        >
          <input
            className="answer-input"
            id={`question-${id}-answer${index}`}
            name={`question-${id}`}
            type="radio"
            value={shuffledAnswerItem}
            // checked={answersOnly[index].user_answer === answer ? true : false}
            onChange={(event) => handleChange(event)}
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

  return (
    <section className="quiz-item">
      <h4 className="quiz-question">{he.decode(question)}</h4>
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
