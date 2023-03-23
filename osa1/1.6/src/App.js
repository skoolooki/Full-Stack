import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Stats = (props) => {
  const total = props.good + props.neutral + props.bad
  let average = (props.good - props.bad) / total
  if (total === 0) {
    average = 0
  }
  const positive = props.good / total * 100 
  if (total === 0){
    return (
      <p>No feedback given yet</p>
    )
  }
  return (
    <div>
    <StatisticLine name="good" value={props.good}/>
    <StatisticLine name="neutral" value={props.neutral}/>
    <StatisticLine name="bad" value={props.bad}/>
    <StatisticLine name="total" value={total}/>
    <StatisticLine name="average" value={average}/>
    <StatisticLine name="positive" value={positive}/>
    </div> 
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.name}: {props.value}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>Statistics:</h1>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
