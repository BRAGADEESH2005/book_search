import React from "react";
import "./navbar.css"
export default function Navbar(){
    return(
        <nav className="navbar">
            <h1>The Book Store</h1>
            <div className="links">
            <a href="/">Home</a>
            <a href="/about-us">About Us</a>
            <a href="/contact-us">Contact Us</a>
            </div>
        </nav>
    )
}