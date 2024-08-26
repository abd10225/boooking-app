import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  const{ user} = useContext(AuthContext);
  return (
    <nav className="nav">
      <div className="navbar">
        <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
    

          
          {user ? user.username :   ( <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>)}
        </div>
    </div>
  </nav>
  )
}

export default Navbar