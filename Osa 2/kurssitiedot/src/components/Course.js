import React from 'react'

const Course = ({ courses }) => {
    const allCourses = () => courses.map(course => {
      const parts = () => course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
      const sum = () => course.parts.reduce((sum, part) => {
        return sum + part.exercises
      }, 0)
  
      return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={parts()} />
          <p>Yhteensä {sum()} tehtävää</p>
        </div> 
      )
    })
  
    return (
      <div>
        {allCourses()}
      </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    ) 
  }

  const Content = (props) => {
    return (
      <div>
        <Part parts={props.parts} />
      </div> 
    ) 
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.parts}
      </div>
    )
  }

  export default Course;
  