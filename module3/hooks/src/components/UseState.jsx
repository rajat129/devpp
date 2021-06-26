// imrs sfc
import React, { useState } from 'react';

const UseState = () => {
    
    const [count,setCount] = useState(1);

    return ( <div>
        <p>{count}</p>
        <button onClick={()=>{ setCount(count+1) }}>+</button>
        <button onClick={()=>{ setCount(count-1) }}>-</button>
    </div> );
}
 
export default UseState;