import React from 'react'
import { Link } from "react-router-dom"
import { FaLinkedin, FaGithub } from "react-icons/fa"

const Footer = () => {
  return (
    <div style={{"margin": "20px 0"}}>
        <h4>Project created by Shreya Sundar</h4>
        <div style={{display: "flex", gap: "20px", justifyContent: "center"}}>
            <Link to="https://linkedin.com/in/shreyasundar" target="_blank" style={{textDecoration: "none"}}><FaLinkedin style={{color: "gold"}}/></Link>
            <Link to="https://github.com/shreyasun" target="_blank" style={{textDecoration: "none"}}><FaGithub style={{color: "gold"}}/></Link>
        </div>
    </div>
  )
}

export default Footer
