export const StartScreen = ({ startQuiz }) => {
  return (
    <div className="screen screen--start">
      <h1 className="start-header">Quizzical</h1>
      <p className="start-blurb">So you think you're a weeb?</p>
      <button className="button button--start" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
};
