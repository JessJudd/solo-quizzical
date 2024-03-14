import "./App.css";
import { useEffect, useState } from "react";
import he from "he";

import { StartScreen } from "./components/StartScreen.jsx";
import { QuizScreen } from "./components/QuizScreen.jsx";

function App() {
  const [showQuizQuestions, setShowQuizQuestions] = useState(false); // false on initial load
  const [quizData, setQuizData] = useState([]); // state, yes or no?
  const [resetQuiz, setResetQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuizQuestions((prevShowQuizQuestions) => !prevShowQuizQuestions);
  };

  const fetchQuizData = async () => {
    //https://javascript.plainenglish.io/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript-7f42515b1a05
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple"
      );
      const text = await response.text();
      const data = JSON.parse(text);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  };

  const setupQuiz = (quiz) => {
    const quizList = quiz.map(
      ({ correct_answer, incorrect_answers, question }, index) => {
        const shuffledAnswerList = incorrect_answers.map((answer) =>
          he.decode(answer)
        );
        shuffledAnswerList.splice(
          Math.floor(Math.random() * 4),
          0,
          he.decode(correct_answer)
        );

        return {
          correctAnswerItem: he.decode(correct_answer),
          id: index,
          question,
          shuffledAnswerList,
        };
      }
    );

    setQuizData(quizList);
  };

  useEffect(() => {
    //https://react.dev/learn/synchronizing-with-effects#fetching-data
    let ignore = false;
    async function startFetching() {
      const json = await fetchQuizData();
      if (!ignore) {
        setupQuiz(json);
      }
    }

    startFetching();

    return () => {
      // cleanup function
      ignore = true;
    };
  }, [resetQuiz]);

  console.log("/** app rendered **/");

  return (
    <main>
      {showQuizQuestions ? (
        <QuizScreen
          quizData={quizData}
          setShowQuizQuestions={setShowQuizQuestions}
          resetQuiz={resetQuiz}
          setResetQuiz={setResetQuiz}
        />
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </main>
  );
}

export default App;
