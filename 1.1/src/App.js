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
      {realProps.forEach(value => {
        <div>
        <p>{value.name}</p>
        <p>{value.exercises}</p>
        </div>
    })}
    </div>
  )
}

// const Total = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <p>Number of exercises: {props.total}</p>
//     </div>
//   )
// }

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course}/>
      <Content parts = {parts}/>
      {/* <Total total={part1.exercises + part2.exercises + part3.exercises}/> */}
    </div>
  )
}

export default App