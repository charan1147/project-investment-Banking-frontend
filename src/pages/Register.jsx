import React, { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register } from "../services/api";


function Register(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const {register}=useContext(AuthContext)
    const navigate=useNavigate()

    const errorMessage={
        "user already exists":"this email is already registered"
    }

    const handelSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        const result=await register(name,email,password)
        if(result.success){
            navigate("/investments")
        }else{
            setError(errorMessage[result.message]||result.message )
        }
    }
    return (
      <div>
        <form onSubmit={handelSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <label>password:</label>
          <input
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <button type="submit">Register</button>
          </div>
          {error&&<p>{error}</p>}
        </form>
      </div>
    );
}

export default Register