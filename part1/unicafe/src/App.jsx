import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  let totalScore = good + neutral + bad;
  let avgFormula = good * 1 + neutral * 0 + bad * -1;
  let positive = good / totalScore;

  return (
    <div>
      <h1>statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalScore} />
          <StatisticLine text="average" value={avgFormula / totalScore} />
          <StatisticLine text="positive" value={positive * 100} />
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>
            {value} {text === "positive" ? "%" : null}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} label="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button handleClick={() => setBad(bad + 1)} label="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
