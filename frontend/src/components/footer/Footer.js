import React from 'react'
import { Link } from "react-router-dom"
import { FaLinkedin, FaGithub } from "react-icons/fa"

const Footer = () => {
  return (
    <div style={{padding: "20px 0"}}>
        <h5>Project created by Shreya Sundar</h5>
        <div style={{display: "flex", gap: "20px", justifyContent: "center"}}>
            <Link to="https://linkedin.com/in/shreyasundar" target="_blank" style={{textDecoration: "none"}}><FaLinkedin style={{color: "gold"}}/></Link>
            <Link to="https://github.com/shreyasun" target="_blank" style={{textDecoration: "none"}}><FaGithub style={{color: "gold"}}/></Link>
        </div>
        <h5>View Code on <Link to="https://github.com/shreyasun/jeopardy-maker" target="_blank" style={{textDecoration: "none", color: "white"}}>Github</Link></h5>
    </div>
  )
}

export default Footer
