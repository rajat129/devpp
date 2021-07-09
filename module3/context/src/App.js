import React ,{useState} from 'react';
import Settings from './Setting';
import Profile from './Profile';

export const ThemeContext = React.createContext();

export function App() {

const [lightheme,settheme] = useState(true);

function toggle(){
  settheme((lightheme) => !lightheme);
}

  return (
    <ThemeContext.Provider value={lightheme}>
      <div className="App">
        <button onClick={toggle}>click here</button> 
        <Settings></Settings>
        <Profile></Profile>
      </div>
    </ThemeContext.Provider>
  );
}
