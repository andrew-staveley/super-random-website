import { useEffect, useState } from "react"
import NavBar from "../components/NavBar.js"
import { useNavigate } from "react-router-dom"
import PostItem from "../components/PostItem.js"


function Feed() {
    const [session, setSession] = useState([ null])
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => setSession(user));
                } else {
                    navigate('/login')
                }
            })
        }, [])

    useEffect(() => {
        fetch('/posts').then((r) => {
            if (r.ok) {
                r.json().then((posts) => setPosts(posts))
            }
        })
    }, [])

    return (
        <>
            <header>
                <NavBar session={session}/>
            </header>
            <main>
                {posts.map((post) => <PostItem key={post.id} post={post} />)}
            </main>
        </>
    )
}

export default Feed;