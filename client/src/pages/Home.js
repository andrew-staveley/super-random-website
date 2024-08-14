import { Link } from "react-router-dom"
import "../styles/TheStyleFile.css"

function Home() {
    return (
        <>
            <header className="navBarMimic">
            </header>
            <main id="homePage">
                <h1>Welcome to Twitter 2.0</h1>
                <h3>Very clearly a work in progress lol.</h3>
                <h4>Welcome to the party Loser</h4>
                <button className="button"><Link to={"/login"} style={{textDecoration: "none"}}>Enter Here</Link></button>
            </main>
        </>
    )
}

export default Home;