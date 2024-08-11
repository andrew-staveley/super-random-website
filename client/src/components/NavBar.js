import { NavLink } from "react-router-dom"
import "../styles/TheStyleFile.css"

function NavBar({session}) {
    return (
        <nav className="navbar">
            <NavLink to="/feed" className="button">Home</NavLink>
            <NavLink to="/new" className="button">New Post</NavLink>
            {session ? <NavLink to="/account" className="button">{session.name}'s' Dashboard</NavLink> : <NavLink to="/login" class="button">Log In</NavLink>}
        </nav>
    )
};

export default NavBar;