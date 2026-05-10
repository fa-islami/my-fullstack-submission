import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0);

  const handleGood = () => {
    const goodUpdated = good + 1;
    setGood(good + 1);
    setAll(goodUpdated + neutral + bad);
  };
  const handleNeutral = () => {
    const neutralUpdated = neutral + 1;
    setNeutral(neutral + 1);
    setAll(neutralUpdated + good + bad);
  };
  const handleBad = () => {
    const badUpdated = bad + 1;
    setBad(bad + 1);
    setAll(badUpdated + good + neutral);
  };

  const average = good * 1 + neutral * 0 + (bad * -1) / allFeedback;
  const positive = (good / allFeedback) * 100;
  // console.log(average);
  // console.log(positive);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allFeedback={allFeedback}
        average={average}
        positive={positive}
      />
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, allFeedback, average, positive } = props;

  if (allFeedback === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={allFeedback} />
          <StatisticLine text={"average"} value={average || 0} />
          <StatisticLine
            text={"positive"}
            value={(positive || 0).toString() + " %"}
          />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  console.log(value);

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
