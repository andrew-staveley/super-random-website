import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [errors, setErrors] = useState([])
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
        if (password !== passwordConfirmation) {
            setErrors(['Passwords do not match'])
        }
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
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <>
            <header>
            </header>
            <main>
                <form onSubmit={submitHandler}>
                    <label>Username <input type="text" name="username" onChange={usernameHandler}/></label>
                    <label>Password <input type="text" name="password" onChange={passwordHandler}/></label>
                    <label>Password Confirmation <input type="text" name ="passwordConfirmation" onChange={passwordConfirmationHandler}/></label>
                    <label>Name <input type="text" name="name" onChange={nameHandler}/></label>
                    <label>Bio <input type="text" name="bio" onChange={bioHandler}/></label>
                    <button type="submit">Sign Up</button>
                </form>
                {errors.map((err) => (
                    <h4>{err}</h4>
                ))}
            </main>
        </>
    )
}

export default SignUp;