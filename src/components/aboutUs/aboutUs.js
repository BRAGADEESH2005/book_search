import React from "react";
import "./aboutUs.css";
import Navbar from "../navbar/navbar";

export default function AboutUs(){

    return(
        <div className="about-us">
        <Navbar />
        <h1 >About us</h1>
        <p>
        Greetings! We are students from PSG College of Technology, specializing in Computer Science and Engineering. 
        This project involved crafting a dynamic book store using the Open Library API. 
        Our goal was to connect fellow students with a diverse range of books, fostering a culture of exploration and knowledge-sharing.
        Through technology and collaboration, we've created a platform that embodies our passion for learning and innovation.
        </p>
        </div>
    )
}