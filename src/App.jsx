import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";

import { StartScreen } from "./components/StartScreen.jsx";
import { QuizScreen } from "./components/QuizScreen.jsx";

/*

- Keep track of some state that indicates if the initial screen or the quiz should be displayed
- two screens - start & questions/answers
- Open Trivia Database API
- Tally correct answers
- Style and polish the app

HINTS
- Strange characters in the question -> HTML entity
- Use a library to decode the HTML entities -> use the decode method
- There's an entire array dedicated to incorrect answers -> Make a new array with all of the answers, randomly insert the correct_answer into the array with the incorrect_answers
- Look up how to shuffle items into an array at random or how to insert an item randomly into an array
- Limit answer choice to 1 and style selected answer 
  (1) track the selected answer index inside each question object
  -OR-
  (2) use an html form with radio inputs using the same name attribute to automatically allow only one selection -> style the radio input like a button

*/

function generateRandomIndex() {
  console.log("[fx]generateRandomIndex()");
  return Math.floor(Math.random() * 4);
}

function App() {
  const [showQuizQuestions, setShowQuizQuestions] = useState(false); // false on initial load
  const [quizData, setQuizData] = useState([]); // state, yes or no?

  // const [answersOnly, setAnswersOnly] = useState([]); // ignore for now

  // console.log("answersOnly: ", answersOnly);

  const startQuiz = () => {
    console.log("[fx]startQuiz()");
    // on click
    setShowQuizQuestions((prevShowQuizQuestions) => !prevShowQuizQuestions);
  };

  const fetchQuizData = async () => {
    console.log("[fx]fetchQuizData()");
    //https://javascript.plainenglish.io/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript-7f42515b1a05
    try {
      // const response = await fetch(
      //   "https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple"
      // );
      const response = await fetch(
        "https://opentdb.com/api.php?amount=2&category=31&difficulty=easy&type=multiple"
      );
      const text = await response.text();
      const data = JSON.parse(text);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  };

  const setupQuiz = (quiz) => {
    console.log("quiz: ", quiz);
    // save all quiz data to state -> question, does it need to be state?
    // setQuizData(quiz); // save api response to state

    const quizList = quiz.map(
      (
        {
          category,
          correct_answer,
          difficulty,
          incorrect_answers,
          question,
          type,
        },
        index
      ) => {
        const shuffledAnswerList = incorrect_answers.map((answer) =>
          he.decode(answer)
        );
        shuffledAnswerList.splice(
          Math.floor(Math.random() * 4),
          0,
          he.decode(correct_answer)
        );

        return {
          correctAnswer: he.decode(correct_answer),
          questionId: index,
          questionText: question,
          shuffledAnswerList,
        };
      }
    );

    setQuizData(quizList);

    // const newAnswers = quiz.map((quizItem, index) => {
    //   const answers = {};

    //   answers.id = index; // quiz question index
    //   answers.correct_answer = quizItem.correct_answer;
    //   answers.user_answer = "";
    //   // answers.isCorrect = '';

    //   return answers;
    // });

    // setAnswersOnly(newAnswers);
  };

  //open trivia db -> otdb
  // const handleQuizData = (otdbQuiz) => {
  //   let i = 0;
  //   otdbQuiz.map((quizItem) => {
  //     console.log("quizItem: ", quizItem);
  //     // i++;
  //     // const quizNum = `q${i}`;
  //     const { question, correct_answer, incorrect_answers } = quizItem;
  //     setQuizData((oldQuizData) => [
  //       ...oldQuizData,
  //       {
  //         id: i,
  //         question: question,
  //         correctAnswer: correct_answer,
  //         correctAnswerIndex: Math.floor(Math.random() * 4),
  //         answers: incorrect_answers,
  //         userAnswer: "",
  //       },
  //     ]);
  //   });

  //   //   setMeme(prevMeme => ({
  //   //     ...prevMeme,
  //   //     [name]: value
  //   // }));
  // };

  useEffect(() => {
    //https://react.dev/learn/synchronizing-with-effects#fetching-data
    let ignore = false;
    console.log("use effect ran");

    async function startFetching() {
      const json = await fetchQuizData();
      if (!ignore) {
        console.log("json: ", json);
        // handleQuizData(json);
        // setQuizData(json);
        setupQuiz(json);
      }
    }

    startFetching();

    return () => {
      // cleanup function
      ignore = true;
    };
  }, []);

  console.log("/** app rendered **/");

  return (
    <main>
      {showQuizQuestions ? (
        <QuizScreen
          quizData={quizData}
          // answersOnly={answersOnly}
          // setAnswersOnly={setAnswersOnly}
        />
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </main>
  );
}

export default App;
