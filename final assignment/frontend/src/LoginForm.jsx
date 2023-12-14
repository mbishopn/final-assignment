import axios from "axios"
import { useState } from "react"


export default function LoginUser() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [postResponse, setPostResponse] = useState("");

   

    const handleOnChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const postToDo = async (user) => {
        const postUser = { ...user };
        await axios
        .post("http://localhost:3000/login", postUser)
        .then((response) => setPostResponse(response.data))
    };

    const postUser = async (evt) => {
        evt.preventDefault();
        console.log("here!");
        postToDo(formData);
        setFormData({
            username: "",
            password: "",
        });
    }

    const handleLogin = (message) => {
        return message == "Successful Login"
        ? navigate("/main") 
        : console.log("No")
    }
    return ( 
        <div className="login">
            <h1>Groceries App</h1>
            <form action="" onSubmit={postUser}>
                <label htmlFor="username">Username </label>
                <input 
                type="text" 
                name="username" 
                id="username"
                onChange={handleOnChange}
                value={formData.username}
                required 
                />
                <p></p>
                <label htmlFor="password">Password </label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={handleOnChange}
                value={formData.password}
                required
                />
                <br />
                <button onClick={() => handleLogin(postResponse)}>Login</button>
                
                <p>not a member yet? click <a href="/register"> here</a> to join</p>
               
            </form>
            {<p className="logintext">{postResponse}</p>}
        </div>
    );
}