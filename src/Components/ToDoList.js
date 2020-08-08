import React, { Component } from 'react';
import '../App.css'
import { FaRegTrashAlt } from 'react-icons/fa';



class ToDoList extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
            <div className = "todosBox">
               <ul>
                {this.props.allTasks.map(task => {
                    const { id, title, completed} = task;
                        return (
                        <li key={id} className ={completed ? "crossed" : " "}>
                           
                            <input type="checkbox" onClick={()=>this.props.onDone(id)} className="checkBox"/>
                             {title}
                             <FaRegTrashAlt onClick={()=>this.props.onDelete(id)} className="delete"/>
                        </li> 
                    );
                })}
               </ul>
            </div>
            </div>
        )
    }
  
}


export default ToDoList;
