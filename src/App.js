import React, { Component } from 'react';
import ToDoList from './Components/ToDoList';
import InputTask from './Components/InputTask';
import uuid from 'react-uuid';
import Buttons from './Components/Buttons';
import './App.css';
import axios from 'axios';

class App extends Component{
    constructor(props){
      super(props)
      this.state = {
        allTasks:[
          // { id: uuid(), title: "Call mom", completed: false, buttonName: "Done" },
          // { id: uuid(), title: "Buy food", completed: false, buttonName: "Done" },
          // { id: uuid(), title: "Do homework", completed: false, buttonName: "Done" }
        ],
        inputValue: "",
        show: "active"
      }
    }


    componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
         .then(response => this.setState({allTasks:response.data}))
    }


    //Getting value from input 
    onChange = event =>{
      this.setState({inputValue:event.target.value})
    }
    
    // Adding task to the list 

    addTask = ()=>{
      const { inputValue, allTasks } = this.state
      axios.post('https://jsonplaceholder.typicode.com/todos', 
                { title:inputValue, 
                  completed: false})
            .then(response => this.setState({
                 allTasks: [...this.state.allTasks, response.data],
                 inputValue:""})
                 )     
    }

    onDelete = id => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => this.setState({
        allTasks: [...this.state.allTasks.filter(task => task.id !== id) ]
      }))
    }


    // addTask = () =>{
    //   const { inputValue, allTasks } = this.state
    //   if(inputValue === ""){
    //     return 
    //   }
    //     for (let i=0; i<allTasks.length; i++){
    //       if(allTasks[i].toDo.toUpperCase()===inputValue.toUpperCase()){
    //           this.setState({inputValue:""})
    //           return
    //       }
    //    }
    //       const newTask = {
    //         id: uuid(),
    //         title: inputValue,
    //         completed: false,
    //         buttonName: "Done"
    //       };

    //       this.setState({
    //         allTasks: [...this.state.allTasks, newTask],
    //         inputValue:""
    //       }); 
    // }
    

    // Deleting a task from the todo list
    // onDelete = id => {
    //   const { allTasks} = this.state 
    //   let filteredTask = allTasks.filter(task=>{
    //     if(id !== task.id){
    //       return task
    //     }
    //   })
    //   this.setState({
    //     allTasks:filteredTask
    //   })
    // }
//Appying stile to the done task 

    onDone = id =>{
      const { allTasks } = this.state
      allTasks.filter(task => {
        if(id === task.id){
          task.completed = !task.completed
          console.log(task.isDone, "done")
        }
        return task
      })
      
      this.setState({allTasks})
    }


    // Show only Completed tasks
    showCompleted = () =>{
      const { allTasks } = this.state
      let completed = allTasks.filter(task =>task.isDone)

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
      const all = this.state.allTasks
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



