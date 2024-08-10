import { NavLink } from "react-router-dom"

function NavBar({session}) {
    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            {session ? <NavLink to="/account">Account</NavLink> : <NavLink to="/login">Log In</NavLink>}
        </nav>
    )
};

export default NavBar;