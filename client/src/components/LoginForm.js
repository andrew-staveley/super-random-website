import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/TheStyleFile.css"

function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function usernameHandler(e) {
        e.preventDefault()
        setUsername(e.target.value)
    }

    function passwordHandler(e) {
        e.preventDefault()
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content_Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then(() => navigate('/feed'))
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id="loginForm">
                <h4 style={{color: "red"}} >{error}</h4>
                <input type="text" name="username" id="loginUsername" value={username} onChange={usernameHandler} placeholder="Username"/>
                <input type="password" name="password" id="loginPassword" value={password} onChange={passwordHandler} placeholder="Password"/>
                <button type="submit" class="button" id="loginButton">Log In</button>
            </form>
        </div>   
    )
}

export default LoginForm;