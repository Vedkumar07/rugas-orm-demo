import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup(){
  const navigate=useNavigate();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[name,setName]=useState();
    const handleSubmit=async (e)=>{
        e.preventDefault();
      await fetch("http://localhost:8000/admin/signup",{
            method:"POST",
            credentials: "include", 
             headers: {
                 "Content-Type": "application/json", 
              },
          
            body:JSON.stringify({
                email,
                password,
                name
            }),
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            console.log("Signin now")
            navigate("/auth");
            alert("now Signin");

        })
        .catch((error)=>{
            console.log(error);
        });
    }
    return(
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
                  Signup in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium ">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>    
                  </div>

                  <div>
                    <label htmlFor="Password" className="block text-sm/6 font-medium ">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="Password"
                        name="Password"
                        type="Password"
                        required={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>    
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium ">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        required={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>    
                  </div>

                  <div>
                    <button
                      type="submit"
                      onClick={(e)=>{handleSubmit(e)}}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Signup
                    </button>
                  </div>
                </form>
                </div>
            </div>
        </>
    )
}
export function Signin(){
    const navigate=useNavigate();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:8000/admin/signin', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });
  
          console.log("Raw response:", response);
  
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const res = await response.json();
          console.log("Parsed response:", res);
  
          if (!res.token) {
              console.error("No token found in response:", res);
              return;
          }
  
          document.cookie = `TOKEN=${res.token}`;
          if (res.token) {
            navigate("/UserListed", { state: { response: res } });
            console.log("done");

            
        } else {
            console.error("Token not found. Response:", res);
        }
        
      } catch (error) {
          console.error("Error during sign-in:", error);
      }
  }
  
    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
                Sign-in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium ">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium ">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    onClick={(e)=>{handleSubmit(e)}}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}