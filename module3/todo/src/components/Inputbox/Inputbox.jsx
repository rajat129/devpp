// shortcuts = > imrc , cc

import React, { Component } from 'react';

class InputBox extends Component {
    state = { 
        inputval : ""
    }

    handleonchange = (e) => {

        let value = e.target.value;
        this.setState({
            inputval : value
        });
    }

    handleadd = () => {

        let addtodo = this.props.addtodo;

        let val = this.state.inputval;
        addtodo(val);
        this.setState({
            inputval : ""
        })

    }

    render() { 
        return ( 
            <div className="input-group m-4 container">
                <input className="form-control" type="text" value={this.state.inputval} onChange={this.handleonchange}/>
                <button className="btn btn-primary" onClick={this.handleadd}>Add todo</button>
            </div>
        );
    }
}
 
export default InputBox;