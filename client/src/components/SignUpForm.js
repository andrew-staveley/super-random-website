import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/TheStyleFile.css"

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [error, setError] = useState([])
    const nav = useNavigate()
    
    function usernameHandler(e) {
        setUsername(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function passwordConfirmationHandler(e) {
        setPasswordConfirmation(e.target.value)
    }

    function nameHandler(e) {
        setName(e.target.value)
    }

    function bioHandler(e) {
        setBio(e.target.value)
    }

    function handleLogin() {
        nav("/feed")
    }

    function submitHandler(e) {
        e.preventDefault()
        if (password === passwordConfirmation) {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    bio,
                }),
            }).then((r) => {
                if (r.ok) {
                    r.json().then(() => handleLogin())
                } else {
                    r.json().then((err) => setError(err.error))
                }
            })
        } else {
            setError(['Passwords do not match'])
        }
        
    }
    return (
        <div>
            <form onSubmit={submitHandler} id="signupForm">
                <h4 style={{color: "red"}}>{error}</h4>
                <label>Username <input type="text" name="username" value={username} onChange={usernameHandler} id="signupUsername"/></label>
                <label>Password <input type="password" name="password" value={password} onChange={passwordHandler} id="signupPassword"/></label>
                <label>Password Confirmation <input type="password" name ="passwordConfirmation" value={passwordConfirmation} onChange={passwordConfirmationHandler} id="signupConfirmation"/></label>
                <label>Name <input type="text" name="name" value={name} onChange={nameHandler} id="signupName"/></label>
                <label>Bio <input type="text" name="bio" value={bio} onChange={bioHandler} id="signupBio"/></label>
                <button type="submit" className="button" id="signupButton">Sign Up</button>
            </form>
        </div>
        
    )

}

export default SignUpForm;