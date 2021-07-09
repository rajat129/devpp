import React, { useContext } from 'react';
import { ThemeContext } from './App';

const Settings = () => {

    const theme = useContext(ThemeContext);

    const style = {
        backgroundColor : theme ? "lightgrey" : "black",
        color : "black"
    };

    return ( 
        <div style={style}>Settings pannel</div>
    );
}
 
export default Settings;