import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/TheStyleFile.css"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const nav = useNavigate()
    
    //Validates Session Data for Auto Login
    const [session, setSession] = useState([])

    useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setSession(user));
            }
        });
    }, []);

    if (session) nav('/feed');

    //Sets Username and Passwords
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
                r.json().then(() => nav("/feed"))
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
                <h1>Hello</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Username <input type="text" name="username" onChange={usernameHandler}/></label>
                        <label>Password <input type="text" name="password" onChange={passwordHandler}/></label>
                        <button type="submit" class="button">Log In</button>
                    </form>
                    {errors.map((err) => (
                        <h4>{err}</h4>
                    ))}
                <h3>Don't have an account?</h3>
                <button class="button">{<Link to="/signup">Start Here</Link>}</button>
            </main>
        </>
    )
}

export default Login;