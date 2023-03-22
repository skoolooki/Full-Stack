import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Stats = (props) => {
  return (
    <div>
    <p>good: {props.good}</p> 
    <p>neutral: {props.neutral}</p> 
    <p>bad: {props.bad}</p>
    <p>total: {props.total}</p>
    <p>average: {props.average}</p>
    </div> 
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setTotal(total + 1)
    setGood(good + 1)
    setAverage((good - bad) / total)
  }

  const handleNeutralClick = () => {
    console.log(neutral)
    setTotal(total + 1)
    setNeutral(neutral + 1)
    setAverage((good - bad) / total)
  }

  const handleBadClick = () => {
    console.log(bad)
    setTotal(total + 1)
    setBad(bad + 1)
    setAverage((good - bad) / total)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>Statistics:</h1>
      <Stats good={good} neutral={neutral} bad={bad} total={total} average={average}/>
    </div>
  )
}

export default App
