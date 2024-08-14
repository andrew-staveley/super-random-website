import { NavLink, useNavigate } from "react-router-dom"
import "../styles/TheStyleFile.css"

function NavBar({session}) {
    const navigate = useNavigate()
    function logOutHandler(e) {
        e.preventDefault()
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              navigate("/")
            }
          });
    }
    return (
        <nav className="navBar">
            <NavLink to="/feed" className="button">Home</NavLink>
            <NavLink to="/new" className="button">New Post</NavLink>
            <NavLink to="/account" className="button">{session.name}'s Dashboard</NavLink>
            {session ? <button className="button" onClick={logOutHandler}>Log Out</button> : null}
        </nav>
    )
};

export default NavBar;