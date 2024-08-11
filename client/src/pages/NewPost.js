import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.js"

function NewPost() {
    const nav = useNavigate()
    const [session, setSession] = useState([])
    const [type, setType] = useState([])

    useEffect(() => {
        fetch("/check_session").then((r) => {
        if (r.ok) {
            r.json().then((user) => setSession(user));
                }
        })
    }, []);

    if (!session) nav('/');

    function typeHandler(e) {
        setType(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault()
    }

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>Create a something new.</h1>
                <form onSubmit={submitHandler}>
                    <label>Write something here.<input type="text" name="newpost" onChange={typeHandler}/></label>
                </form>
            </main>
        </>
    )
}

export default NewPost;