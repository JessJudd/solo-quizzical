import he from "he";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export const TriviaAnswers = ({
  answersOnly,
  setAnswersOnly,
  incorrectAnswers,
  index,
}) => {
  const [randomIndex, setRandomIndex] = useState(generateRandomIndex);
  console.log("randomIndex: ", randomIndex);

  // let randomIndex;

  // const generateRandomIndex = () => {
  function generateRandomIndex() {
    console.log("[fx]generateRandomIndex()");
    return Math.floor(Math.random() * 4);
  }

  const handleChange = (event, index) => {
    console.log("[fx]handleChange()");
    const { value } = event.target;

    const userAnswer = { ...answersOnly[index], user_answer: value };

    const newAnswers = [...answersOnly];
    newAnswers[index] = userAnswer;
    setAnswersOnly(newAnswers);
    console.log("answersOnly: ", answersOnly);
    // set value as user_answer in answersOnly
  };

  const { correct_answer } = answersOnly[0];
  const decoded_correct_answer = he.decode(correct_answer);
  console.log("correct_answer: ", decoded_correct_answer);

  // const randomIndex = Math.floor(Math.random() * 4);

  const quizAnswers = incorrectAnswers.map((answer) => {
    return he.decode(answer);
  });
  quizAnswers.splice(randomIndex, 0, decoded_correct_answer);

  console.log("quizAnswers: ", quizAnswers);

  const answerElements = quizAnswers.map((answer, n) => {
    const answerId = nanoid();
    const name = `question-${index}-answer-${n}`;
    return (
      <div className="quiz-answer-single" key={answerId}>
        <input
          className="answer-input"
          name={name}
          id={answer}
          type="radio"
          value={answer}
          checked={answersOnly[index].user_answer === answer ? true : false}
          onChange={(event) => handleChange(event, index)}
        />
        <label htmlFor={answer} className="answer-label" name={name}>
          {answer}
        </label>
      </div>
    );
  });

  return <div className="quiz-answers">{answerElements}</div>;
};
