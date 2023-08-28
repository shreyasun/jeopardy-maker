import React, { useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { GoogleButton } from "react-google-button"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate("/Home")
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user !== null){
            navigate("/Home")
        }
    }, [user])

    return (
        <div className="login">
            <div className="loginCard">
                <h1>Welcome to Jeopardy Maker!</h1>
                <h2>Login to use this app.</h2>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    )
}

export default Login
