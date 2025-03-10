// Login Component - ask for credentials to authenticate user and creates a cookie
//                   authenticated users are redirected to main App

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"
import { userLogin } from "./utilities/dbFunctions";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({username: "", password: ""}) // hook for the login form
    const [postResponse, setPostResponse] = useState("");   // hook for API responses
    const {register, handleSubmit, formState: { errors } } = useForm({})  // form validation

    const handleOnChange = (evt) => {                       // to see form changing as user writes
        const { name, value } = evt.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }

    const onLogin = async (evt) => {                   //  handles login proccess
        evt.preventDefault;
        userLogin(formData)                             // function to login passing form data
        .then((result)=>{                               // if true, means access granted
        if(result.answer)
            {
                Cookies.set("jwt-cookie",result.token)  // creates a cookie based on token returned
                navigate("/main")                       // reditecs user to main Groceries App
            }
        else
        { setPostResponse(result.msg); setFormData({username:"",password:""})}               // if false, let he user know
        })
    }

    return ( 
        <div className="login">
            <h1>Groceries App</h1>
            <form action="" onSubmit={handleSubmit(onLogin)}>
                <label htmlFor="username">Username </label>
                <input 
                    type="text" 
                    {...register("username",{required: "you must enter a username"})}
                    id="username"
                    onChange={handleOnChange}
                    value={formData.username}

                />
                <p>{errors.username?.message}</p>
                <label htmlFor="password">Password </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={handleOnChange}
                    value={formData.password}

                />
                <br />
                <button>Login</button>
                
                <p>Not a member yet? click <Link to="/register"> here</Link> to join</p>
               
            </form>
            {<p className="logintext">{postResponse}</p>}
        </div>
    );
}