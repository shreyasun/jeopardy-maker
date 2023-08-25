import React from 'react'
import "./header.css"
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiCards } from "react-icons/pi";



const Header = () => {
  return (
    <div className="header">
        <Link to="/CardsDeck"><div className="button1"><PiCards />My Question Sets</div></Link>
        <h1>This is Jeopardy!</h1>
        <Link to="/myAccount"><div className="button1"><CgProfile />My Account</div></Link>
    </div>
  )
}

export default Header
