import { React, useState } from 'react'
import Footer from "../footer/Footer"
import Help from "../help/Help"
import { Link } from "react-router-dom"
import { UserAuth } from '../../context/AuthContext'
import "./home.css"
import { PiCardsFill } from "react-icons/pi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"

const Home = () => {
    const [mode, setMode] = useState("");
    const { user } = UserAuth();
    // Handling user logout
    const { logOut } = UserAuth();
    const handleLogOut = async () => {
        try {
        await logOut()
        } catch (error) {
        console.log(error)
        }
    }
    return (
        <div className='home'>
            <div style={{display: "flex"}}>
                <div className="button1" style={{margin: "20px"}}onClick={handleLogOut}><CgProfile />Log Out</div>
            </div>
            <div className="home-info">
                <h1>Welcome, {user?.displayName}, to Jeopardy Maker!</h1>
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
