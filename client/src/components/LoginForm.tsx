import { Html } from "@react-three/drei";

import React, { useContext, useState, type Dispatch, type SetStateAction } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { AuthorizationContext, type AuthorizationContextType } from "../context/AuthorizationContext";

interface ILoginForm {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setGlowGem: React.Dispatch<React.SetStateAction<string>>,
    setIsFailed: Dispatch<SetStateAction<boolean>>,
    setIsExiting: Dispatch<SetStateAction<boolean>>
}

const LoginForm: React.FC<ILoginForm> = ({ setIsFormOpen, setGlowGem, setIsFailed, setIsExiting }) => {
    const { setIsAuthorized, setUsername, setUserId }: AuthorizationContextType = useContext(AuthorizationContext);

    const handleFormClose = () => {
        setIsFormOpen(false);
        setGlowGem("");
        setIsFailed(false);
        setIsExiting(true);
    }

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mode, setMode] = useState<string>("login");

    const switchMode = () => {
        if (mode === "login") setMode("register");
        else setMode("login")
    }
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitter = (e.nativeEvent).submitter as HTMLButtonElement;
        const action = submitter?.value;
        console.log(action);
        try {
            switch (action) {
                case "login":
                    const loginRes = await axios.post("/api/auth/login", { username, password });
                    if (loginRes.status === 200) {
                        const token = loginRes.data.token;
                        const decoded = jwtDecode<{ _id: string, username: string }>(token);
                        setUsername(decoded.username);
                        setUserId(decoded._id);
                        setIsAuthorized(true);
                        handleFormClose();
                    }
                    else {
                        setIsFailed(true);
                    }
                    break;
                case "register":
                    let regRes = await axios.post("/api/users/", { username, password });
                    if (regRes.status === 201) {
                        console.log(regRes.data);
                        setGlowGem("HealthyGreen");
                        await new Promise(_r => setTimeout(_r, 5000));
                        regRes = await axios.post("/api/auth/login", { username, password });
                        if (regRes.status === 200) {
                            setIsAuthorized(true);
                            handleFormClose();
                        }
                    }
                    else {
                        setIsFailed(true);
                    }
                    break;
                default:
                    break;

            }
        } catch (err) {
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
                <input type="text" value={username} onChange={e => setUserName(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                {mode === "login" ? <><button type="submit" name="action" value="login" className="btn-login">Let's go</button>
                    <button type="button" className="btn-login" onClick={switchMode}>Wait! I need an account</button> </>
                    : <button type="submit" name="action" value="register" className="btn-login">Create an account</button>}

            </form>
        </Html>
    )
}

export default LoginForm;