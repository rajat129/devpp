import React, { Component } from 'react';

import Inputbox from "./components/Inputbox/Inputbox.jsx";
import TodoLists from "./components/TodoLists/TodoLists.jsx";

class App extends Component {
  state = { 
    todos : [
      {id:"1" , todo:"learn js"},
      {id:"2" , todo:"learn css"},
      {id:"3" , todo:"learn html"},
      {id:"4" , todo:"learn react"},
      {id:"5" , todo:"learn sql"},
    ]
  }

  deletetodo = (id) => {
    let todos = this.state.todos;

    let updatedtodo = todos.filter(function(todo){
      return todo.id!=id;
    })

    // console.log(updatedtodo);
    this.setState({
      todos : updatedtodo
    })
  }

  addtodo = (todo) => {
    let todos = this.state.todos;
    let updatedtodo = [ ...this.state.todos , {id : this.state.todos.length+1 , todo : todo} ];

    this.setState({
      todos : updatedtodo
    })

    // console.log(this.state.todos);
    // console.log(updatedtodo);
  }

  render() { 

    let todos = this.state.todos;
    let deletetodo = this.deletetodo;
    let addtodo = this.addtodo;

    return (
      <div className="App">
        <Inputbox addtodo={addtodo}></Inputbox>
        <TodoLists todos = {todos} deletetodo={deletetodo}></TodoLists>
      </div>
    );
  }
}
 
export default App;

