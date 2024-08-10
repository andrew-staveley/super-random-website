import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.js"

function Home() {

    //Validates Login & Creates Session
    const [session, setSession] = useState([])
    useEffect(() => {
        fetch("http://localhost:5555/check_session")
        .then((r) => r.json())
        .then((data) => setSession(data))
    }, [])

    return (
        <>
            <header>
                {<NavBar user={session}/>}
            </header>
            <main>
                <h1>Welcome to the Super Random Webite</h1>
                <h3>Very clearly a work in progress lol.</h3>
                <h4>Welcome user {session}</h4>
            </main>
        </>
    )
}

export default Home;