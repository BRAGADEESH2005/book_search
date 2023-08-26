import React from "react";
import "./contactUs.css";
import Navbar from "../navbar/navbar";

export default function ContactUs(){
    return(
        <div className="contact-us">
            <Navbar />
            <h1>Contact Us</h1>
            <ul>
                <li>Mail:Mail@gmail.com</li>
                <li>Phone Number:99999 99999</li>
                <li>Instagram:InstagramID</li>
                <li>Facebook:FacebookID</li>
            </ul>
        </div>
    )
}