import React from "react";
import { Link } from "react-router-dom";

const Greeting = ({currentUser, logout}) => {

    const greetingContent = (currentUser ? (
        <>
            <h3>Welcome, {currentUser.username}</h3>
            <button onClick={logout}>Logout</button>
        </>
    ) : (
        <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </>
    )
    )

    return (
        <div>
            {greetingContent}
        </div>
    )
}

export default Greeting;