import { useNavigate } from "react-router-dom"
function ErrorPage() {
    const navigate = useNavigate()

    function redirect() {
        return navigate("/feed")
    }
    
    return (
        <main>
            <h1>There was an error processing your request</h1>
            <button className="button" onClick={redirect}>Return Home</button>
        </main>
    )
}

export default ErrorPage;