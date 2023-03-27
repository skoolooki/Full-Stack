const Course = (props) => {
    const handleTotal = (courseId) => {
      let total = 0
      props.courses[courseId - 1].parts.map(parts =>
        total = total + parts.exercises  
      )
      return (total)
    }
    return (
      <div>
        {props.courses.map(thisCourse =>
          <div key={thisCourse.id}>
          <h1 key={thisCourse.id}>{thisCourse.name}</h1>
          {thisCourse.parts.map(parts =>
            <p key={parts.id}>{parts.name} {parts.exercises}</p>
          )}
          <p>total of {handleTotal(thisCourse.id)} exercises</p>
          </div>
        )}
      </div>
    )
}

export default Course