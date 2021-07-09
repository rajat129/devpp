import React from 'react';
import { ThemeContext } from './App';
import { useContext } from 'react';

const Profile = () =>   {

    const theme = useContext(ThemeContext);

    const style = {
        backgroundColor : theme ? "black" : "grey",
        color : "grey"
    }

    return ( 
    <div style={style}>Profile panel</div> );
}
 
export default Profile;