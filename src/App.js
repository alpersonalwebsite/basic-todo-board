import React, { Component } from 'react';
import './App.css'

class App extends React.PureComponent {

 state = {
  toDo: [
    { id: '1', title: 'Title 1...', description: 'Description 1...' },
    { id: '2', title: 'Title 2...', description: 'Description 2...' },
    { id: '3', title: 'Title 3...', description: 'Description 3...' }
  ],
  inProgress: [
    { id: '4', title: 'Title 4...', description: 'Description 4...' },
    { id: '5', title: 'Title 5...', description: 'Description 5...' }
  ],
  done: [
    { id: '6', title: 'Title 6...', description: 'Description 6...' }
  ],
  title: '',
  description: '',
  type: 'toDo'
 }

 // Since this never changes, we are going to set it as a property of our class and not part of the state
listOfStatus = {
   toDo: 'To Do',
   inProgress: 'In Progress',
   done: 'Done'
 };

// List
listOfStatusKeys = Object.keys(this.listOfStatus)


 // Control inputs
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

   // Add by default to To Do but user can change it
   addTaskHandler = (event) => {
     event.preventDefault();
     let newTask = {};
     newTask.id = Date.now();
     newTask.title = this.state.title;
     newTask.description = this.state.description;

     let category = this.state.type

     this.setState({
      [category]: [...this.state[category], newTask],
       title: '',
       description: ''
     })
  }
  
  // Remove
  removeTaskHandler = (taskId, taskType) => {
    let newStatusState = [...this.state[taskType]];
    newStatusState = newStatusState.filter(element => element.id !== taskId) 
    this.setState({
      [taskType]: newStatusState
    })
  }

  // Move from one to other column (first and last should not move)
  moveTask = (event, currentColumn, prevOrNext) => {
    event.preventDefault();
    console.log(event.target, currentColumn, prevOrNext)
  }


 render() {
   console.log('APP')
  let listOfCategories = null;
  if (this.listOfStatus) {
    listOfCategories = this.listOfStatusKeys.map((element, index) => {
      return <ListOfTasks key={element} type={element}
      tasks={this.state[element]} onClickRemove={this.removeTaskHandler}
      onMoveTask={this.moveTask} listOfStatus={this.listOfStatus}>
      
      {this.listOfStatus[element]}
      </ListOfTasks>
    })
  }
  
  return (
    <div className="App">
      <h1>List</h1>
      <div className="container">
        {listOfCategories}
      </div>
      <h1>Add Task</h1>
      <div className="container"> 
        <AddTask onSubmit={this.addTaskHandler} 
        onInputChange={this.changeHandler} 
        type={this.state.type}
        title={this.state.title}
        description={this.state.description}
        listOfStatus={this.listOfStatus}  
        />
      </div>
    </div>
  );
 }
}

const ListOfTasks = React.memo(props => {
  console.log('LISTOFTASKS')
  return (
    <div className="column border padding25">
      <h3>{props.children}</h3>
        {
          props.tasks.map((element, index) => {
            return <Task key={index} type={props.type}
            onClickRemove={props.onClickRemove}
            onMoveTask={props.onMoveTask}
            >{element}</Task>
          })
        }
    </div>
  )
})


const Task = React.memo(props => {
  console.log('TASK')
  return (
    <div style={{ marginBottom: 10 }}>
      <div>{props.children.title}</div>
      <div>{props.children.description} 
        <button style={{ cursor: 'pointer' }} 
          onClick={() => props.onClickRemove(props.children.id, props.type)}>[Remove me]
        </button>
        <div>
          <button onClick={(event) => props.onMoveTask(event, 'currentColumn', 'prevOrNext')}
          name={props.type}
          >Move</button>
        </div>
      </div>
    </div>
  )
})

const AddTask = props => {

  const listOfStatusKeys = Object.keys(props.listOfStatus)

  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          <label>Type:</label>
          <select name='type' onChange={props.onInputChange} value={props.type} >
            {
              listOfStatusKeys.map(element => {
                return <option key={element} value={element}>{props.listOfStatus[element]}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Title:</label><input type='text' name='title' 
          onChange={props.onInputChange} value={props.title} />
        </div>
        <div>
          <label>Description:</label><input type='text' name='description' 
          onChange={props.onInputChange} value={props.description}  />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </div>
  )
}


export default App;
