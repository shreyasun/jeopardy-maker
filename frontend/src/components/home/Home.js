import { React, useState } from 'react'
import Footer from "../footer/Footer"
import Help from "../help/Help"
import { Link } from "react-router-dom"
import "./home.css"
import { PiCardsFill } from "react-icons/pi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai"

const Home = () => {
    const [mode, setMode] = useState("");
    return (
        <div className='home'>
            <div className="home-info">
                <h1>Welcome to Jeopardy Maker!</h1>
                <div className="home-buttons">
                    <div className='button1' type="submit" onClick={() => setMode("help")}><BiSolidHelpCircle />Instructions</div>
                    <Link to="/CardsDeck" style={{textDecoration: "none"}}><div className="button1"><PiCardsFill />Edit Questions</div></Link>
                </div>
                {(mode === "help") ? (
                    <div className='flashcardPopup'>
                        <div className="closePopup" onClick={() => {setMode("");}}><AiFillCloseCircle style={{color: "gold"}}/></div>
                        <Help />
                    </div>
                ) : ""}
            </div>
        <Footer />
        </div>
    )
}

export default Home
