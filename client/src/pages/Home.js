import { Link } from "react-router-dom"
import "../styles/TheStyleFile.css"

function Home() {
    return (
        <>
            <header>
                <div class="navbarMimic">
                </div>
            </header>
            <main>
                <h1>Welcome to Twitter 2.0</h1>
                <h3>Very clearly a work in progress lol.</h3>
                <h4>Welcome to the party Loser</h4>
                <button class="button"><Link to={"/login"} >Enter Here</Link></button>
            </main>
        </>
    )
}

export default Home;