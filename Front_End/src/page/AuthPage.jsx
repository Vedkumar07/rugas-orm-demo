import { useState } from "react"
import { Signin, Signup } from "../Component/AuthComPonent";

export function AuthPage(){
    const[state,setState]=useState(false);
    return<div className="flex flex-row h-screen bg-black text-white">
         <div className="mx-9 my-9 px-8">
            <button className="mx-8" onClick={(e)=>{setState(false)}}>Signup</button>
            <button onClick={(e)=>{setState(true)}}>Signin</button>
        </div>
        <div>{state===true?<Signin />:<Signup />}</div> 
        
    </div>
}