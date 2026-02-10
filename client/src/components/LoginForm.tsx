import { Html } from "@react-three/drei";

import React, { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface ILoginForm {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setGlowGem: React.Dispatch<React.SetStateAction<boolean>>,
    setIsFailed: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<ILoginForm> = ({ setIsFormOpen, setGlowGem, setIsFailed }) => {
    const handleFormClose = () => {
        setIsFormOpen(false);
        setGlowGem(false);
        setIsFailed(false);
    }

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("api/auth/login", { username, password });
            if (response.status === 200){
                handleFormClose();
                navigate("/game-keeper");
            }
            else {
                setIsFailed(true);
            }
            
        } catch (err){
            setIsFailed(true);
            console.log(err);
        }
    }
    
    return (
        <Html
            transform
            position={[-1.8, 0.8, 0]}
            center
            distanceFactor={2}
            rotation-x={-Math.PI / 2}
        >
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form-control">
                    <label>Username</label>
                    <button type="button" className="btn-close-form btn-login" onClick={() => handleFormClose()}>X</button>
                </div>                
                <input type="text" value={username} onChange={e => setUserName(e.target.value)} required/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="submit" className="btn-login">Let's go</button>
            </form>
        </Html>
    )
}

export default LoginForm;