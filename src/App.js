import React, { Component } from 'react'
import ToDoList from './Components/ToDoList'
import InputTask from './Components/InputTask'
import uuid from 'react-uuid'
import Buttons from './Components/Buttons'
import './App.css'

class App extends Component{
    constructor(props){
      super(props)
      this.state = {
        allTasks:[
          { id: uuid(), toDo: "Call mom", isDone: false, buttonName: "Done" },
          { id: uuid(), toDo: "Buy food", isDone: false, buttonName: "Done" },
          { id: uuid(), toDo: "Do homework", isDone: false, buttonName: "Done" }
        ],
        inputValue: "",
        show: "active"
      }
    }


    //Getting value from input 
    onChange = event =>{
      this.setState({inputValue:event.target.value})
    }
    
     
    // Adding task to the list 
    addTask = () =>{
      const { inputValue, allTasks } = this.state
      if(inputValue === ""){
        return 
      }
        for (let i=0; i<allTasks.length; i++){
          console.log(allTasks[i].toDo, "inside")
          if(allTasks[i].toDo.toUpperCase()===inputValue.toUpperCase()){
              this.setState({inputValue:""})
              return
          }
       }
          const newTask = {
            id: uuid(),
            toDo: inputValue,
            isDone: false,
            buttonName: "Done"
          };
          this.setState({
            allTasks: [...this.state.allTasks, newTask],
            inputValue:""
          }); 
      }
    

  
    // Deleting a task from the todo list

    onDelete = id => {
      const { allTasks} = this.state 
      let filteredTask = allTasks.filter(task=>{
        if(id !== task.id){
          return task
        }
      })
      this.setState({
        allTasks:filteredTask
      })
    }
//Appying stile to the done task 

    onDone = id =>{
      const { allTasks } = this.state
      let doneTasks = allTasks;
      doneTasks.filter(task => {
        if(id === task.id){
          task.isDone = !task.isDone
          console.log(task.isDone, "done")
        }
        return task
      })
      
      this.setState({allTasks:doneTasks})
    }


    // Show only Completed tasks
    showCompleted = () =>{
      const { allTasks } = this.state
      let completed = allTasks;
      completed = completed.filter(task =>task.isDone)

      console.log("debugg")
      debugger
      this.setState({
        allTasksCopy:allTasks,
        allTasks:completed
      })
        console.log("allTasksCopy", this.state.allTasksCopy)
    }



    // Show only Completed tasks
    showActive = () =>{
      const { allTasksCopy } = this.state
      let active = allTasksCopy;
      active = active.filter(task =>!task.isDone)

      this.setState({
        allTasks:active
      })
    }
     //Showing all tasks
    
    showAll = () =>{
      const all = this.state.allTasksCopy
      all.push(this.state.allTasks)
      console.log(this.state.allTasksCopy, "allTasksCopy")
      this.setState({allTasks:all})
      
    }


    render(){
     
      return(
        <div className="container">
            <InputTask onChange={this.onChange} inputValue={this.state.inputValue} addTask={this.addTask}/>
            <ToDoList allTasks={this.state.allTasks} onDelete={this.onDelete} onDone={this.onDone}/>
            <Buttons  show={this.state.show} showAll={this.showAll} showCompleted={this.showCompleted} showActive={this.showActive}/>
        </div>
      )
    }
}


export default App;



