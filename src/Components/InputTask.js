import React, { Component } from 'react';
import '../App.css'

class InputTask extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <div className="inputBox">
                <h1>TO-DO-LIST</h1>
                <input type="text" placeholder="new task" className="input"
                    value = {this.props.inputValue}
                    onChange={this.props.onChange}
                /><button onClick={this.props.addTask} className="btnAdd" >ADD</button>
            </div>
        )
    }
    }
    
export default InputTask;