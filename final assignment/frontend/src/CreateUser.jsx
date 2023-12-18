//  Create user component. asks for new user credentials and stores them in the DB

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./utilities/dbFunctions";
import { useForm } from "react-hook-form";

export default function CreateUser() {

  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data
  const {register, handleSubmit, formState: { errors } } = useForm({})

  const [postResponse, setPostResponse] = useState(""); // get API responses

  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    })
  }

  const handleOnSubmit = (evt) => {               // calls createUser function and return is response
    evt.preventDefault;
    createUser(user)
    .then((result)=>setPostResponse(result))
    setUser({                                     // clean the form
      username: "",
      password: "",
    })
  }

  return (
    <div className="login">
      <h2>Create User</h2>
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
        <label htmlFor="username">Username: </label>
        <input
          type="email"
          {...register("username",{required: "you must enter a username"})}
          id="username"
          value={user.username}
          onChange={handleOnChange}
         
        /><p>{errors.username?.message}</p>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          {...register("password",{required: "can't use blank passwords"})}
          id="password"
          value={user.password}
          onChange={handleOnChange}

        /><p>{errors.password?.message}</p>
        <br/>
        <br />
        {postResponse==""?<><button onClick={handleSubmit(handleOnSubmit)} >Submit</button><button onClick={()=>navigate("/")}>Back to Login</button></>:""}
     
        {postResponse==""?"":<button onClick={()=>navigate("/")}>Back to Login</button>}
      </form>
      {postResponse}
      
    </div>
  );
}
