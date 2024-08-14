import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.js"
import PostItem from "../components/PostItem.js"

function Account() {
    const navigate = useNavigate()
    const [session, setSession] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("/check_session").then((r) => {
        if (r.ok) {
            r.json().then((user) => setSession(user));
                } else{
                    navigate("/")
                }
        })
    }, []);

    useEffect(() => {
        fetch("/userpost").then((r) => {
            if (r.ok) {
                r.json().then((posts) => setPosts(posts));
            }
        })
    }, [])

    return (
        <>
            <header>
                <NavBar session={session}/>
            </header>
            <main>
                <h1>Welcome to your account dashboard, {session.username}.</h1>
                <h2>Name: {session.name}</h2>
                <h3>Bio: {session.bio}</h3>
                <h4>Posts you've created</h4>
                {posts.map((post) => <PostItem key={post.id} post={post} />)}
            </main>
        </>
    )
}

export default Account;