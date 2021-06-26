import React, { useState, useEffect } from 'react';
import firebaseAuth from '../config/firebase';

const Login = () => {

    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");
    const [message,setmessage] = useState("");
    const [user,setuser] = useState(null);

    const handleLogin = async () => {

        try{
            let response = await firebaseAuth.signInWithEmailAndPassword(email,pass);
            let id = response.user.uid;

            if(id){
                setuser(id);
            }
        }catch(err){
            setmessage(err.message);
        }
        
    }

    const handlelogout = async () => {
        await firebaseAuth.signOut();
        setuser(null);
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            console.log(user);

            if(user){
                setuser(user.uid);
            }
        })
    })

    return ( 
        <div>
    {user ? (<div> 
        <h1>Welcome to home page !!! </h1>
        <button onClick={handlelogout}>Logout </button>
    </div>)
        :(<div>
        <h1>
            Firebase login
        </h1>

        <div>
            <div>
                email <input type="text" value={email} onChange={ (e)=> {setemail(e.target.value)}} />
            </div>
            <div>
                pass <input type="text" value={pass} onChange={ (e)=> {setpass(e.target.value)}}/>
            </div>
            <button onClick={handleLogin}>Login</button>
            <h2>{message}</h2>
        </div>
    </div> )}
    </div>
     );
}
 
export default Login;