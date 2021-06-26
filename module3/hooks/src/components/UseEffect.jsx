import React, { useState, useEffect } from 'react';
import UseState from './UseState';

const UseEffect = () => {

    const [disp,setdisp] = useState("posts");

    useEffect(() => {
        console.log("changes done");
    }, [disp]);

    return ( <div>
        <button onClick={()=>{ setdisp("posts") }}>posts</button>
        <button onClick={()=>{ setdisp("comments") }}>comments</button>
        <button onClick={()=>{ setdisp("albums") }}>albums</button>
        <div>
            <h1>{disp}</h1>
        </div>
    </div> );
}
 
export default UseEffect;