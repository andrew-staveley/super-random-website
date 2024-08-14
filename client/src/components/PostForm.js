import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PostForm() {
    const [content, setContent] = useState([])
    const [error, setError] = useState([])
    const navigate = useNavigate()

    function contentHandler(e) {
        setContent(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault()
        fetch("/userpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
            }),
        }).then((r) => {
            if (r.ok) {
                return navigate("/feed")
            } else {
                r.json().then((err) => setError(err.errrors));
            }
        })
    }

    return (
        <div id="newPostForm">
            <h1>Create a something new.</h1>
            <form onSubmit={submitHandler}>
                <h4 style={{color: "red"}}>{error}</h4>
                <input type="text" name="newpost" id="newPostBox" onChange={contentHandler} placeholder="Write something here."/>
                <button className="button" type="submit">Submit Here</button>
            </form>
        </div>
    )
}

export default PostForm;