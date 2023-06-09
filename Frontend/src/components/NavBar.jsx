import { Link } from "react-router-dom"

function NavBar () {
    return (
      <nav>
        <Link to="/">Home</Link> {" | "}
        <Link to="/about">About</Link> {" | "}
        <Link to="/login">Login</Link> {" | "}
        <Link to="/profile">Profile</Link> {" | "}
        <Link to="/services">Services</Link> {" | "}
        <Link to="/signup">Sing Up</Link>
      </nav>
    );
}

export default NavBar