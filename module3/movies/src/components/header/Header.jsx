import React, { Component } from 'react';
import "./Header.css";

class Header extends Component {
    state = { 
        value : ""
    }

    changeInputValue = (e) => {
        let val = e.target.value;
        this.setState({
            value : val
        })
        
    }

    searchFunc = (e) => {
        if(e.key==="Enter"){
            console.log("pressed enter");
            this.props.setMovie(this.state.value);
            this.setState({
                value : ""
            })
        }
    }

    render() { 
        return ( 
            <div className="header">
                <div className="logo">
                    <img src="logo.svg" alt="" />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="seacrh" onChange={this.changeInputValue} onKeyPress={this.searchFunc}/>
                </div>
            </div>
         );
    }
}
 
export default Header;