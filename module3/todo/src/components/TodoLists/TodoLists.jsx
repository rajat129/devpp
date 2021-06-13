import React, { Component } from 'react';

class TodoLists extends Component {
    state = {  }
    render() { 
        let todos = this.props.todos;
        let deletetodo = this.props.deletetodo;
        return ( 
        <div className="container">
            <h1> todos list</h1>

            {todos.map(function(todo){
                return <div key={todo.id} className="input-group m-4">
                    <div className="form-control">{todo.todo}</div>
                    <button className="btn btn-danger" onClick={ ()=> {deletetodo(todo.id); } }>delete</button>
                </div>
            })}

            

        </div> );
    }
}
 
export default TodoLists;