import { useEffect, useState } from "react"
import NavBar from "../components/NavBar.js"
import { useNavigate } from "react-router-dom"
import PostItem from "../components/PostItem.js"


function Feed() {
    const [session, setSession] = useState([])
    const [posts, setPosts] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => setSession(user));
                }
            })
        }, [])

    if (!session) {
        nav('/')
    }

    useEffect(() => {
        fetch('/posts').then((r) => {
            if (r.ok) {
                r.json().then((posts) => setPosts(posts))
            }
        })
    }, [])

    return (
        <>
            <NavBar session={session}/>
            <main>
                {posts.map((post) => <PostItem key={post.id} post={post}/>)}
            </main>
        </>
    )
}

export default Feed;