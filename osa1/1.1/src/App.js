const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}



const Content = (props) => {
  var realProps = props.parts
  return (
    <div>
      {realProps.map(part =>
        <div key={part.name}>
          <p>{part.name}</p>
          <p>{part.exercises}</p>
        </div>
        )}
    </div>
  )
}

const Total = (props) => {
  var realProps = props.total
  var exerciseValue = 0
  realProps.forEach(value => {
    exerciseValue = exerciseValue + value.exercises
  })
  return (
    <div>
      <p>Total amount of exercises: {exerciseValue}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts = {course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App