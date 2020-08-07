import React, { Component } from 'react'
import '../App.css'

const Buttons = props =>{
    return(
        <div className = "btnBox">
            <button  className="btn"onClick = {props.showAll} > ALL</button>
            <button  className="btn"onClick = {props.showActive} > ACTIVE</button>
            <button  className="btn"onClick = {props.showCompleted} > DONE</button>
        </div>
    )
}

export default Buttons;