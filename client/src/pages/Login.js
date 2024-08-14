import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm.js"
import "../styles/TheStyleFile.css"

function Login() {
    const navigate = useNavigate()

    useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then(() => navigate("/feed"));
            }
        });
    }, []);

    return (
        <>
            <header className="navBarMimic">
            </header>
            <main>
                <h2>Log In Below</h2>
                    <LoginForm />
                <h3>Don't have an account?</h3>
                <button id="logInButton" className="button">{<Link to="/signup" style={{textDecoration: "none"}}>Start Here</Link>}</button>
            </main>
        </>
    )
}

export default Login;