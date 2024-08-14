import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.js"
import PostForm from "../components/PostForm.js"

function NewPost() {
    const [session, setSession] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/check_session").then((r) => {
        if (r.ok) {
            r.json().then((user) => setSession(user));
                } else {
                    navigate("/")
                }
        })
    }, []);

    return (
        <>
            <header>
                <NavBar session={session}/>
            </header>
            <main>
                <PostForm />
            </main>
        </>
    )
}

export default NewPost;