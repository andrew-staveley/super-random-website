import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <header>
            </header>
            <main>
                <h1>Welcome to Twitter 2.0</h1>
                <h3>Very clearly a work in progress lol.</h3>
                <h4>Welcome Loser</h4>
                <Link to={"/login"}>Enter Here</Link>
            </main>
        </>
    )
}

export default Home;