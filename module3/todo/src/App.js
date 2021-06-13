import React, { Component } from 'react';

import Inputbox from "./components/Inputbox/Inputbox.jsx";
import TodoLists from "./components/TodoLists/TodoLists.jsx";

class App extends Component {
  state = {  }
  render() { 
    return (
      <div className="App">
        <Inputbox></Inputbox>
        <TodoLists></TodoLists>
      </div>
    );
  }
}
 
export default App;

