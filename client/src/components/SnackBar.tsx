import { Html } from "@react-three/drei";
import { type Dispatch, type SetStateAction, useContext, useState } from "react";

import { AuthorizationContext, type AuthorizationContextType } from "../context/AuthorizationContext";
import axios from "axios";

interface ISnackBar {
    setIsExiting: Dispatch<SetStateAction<boolean>>,
    onSearch: (query: string) => void
}

const SnackBar: React.FC<ISnackBar> = ({ setIsExiting, onSearch }) => {
    const [query, setQuery] = useState("");
    const { setIsAuthorized, setUsername, setUserId }: AuthorizationContextType = useContext(AuthorizationContext);

    const returnHome = async () => {
        await axios.post("/api/auth/logout");

        setIsExiting(true);
        setIsAuthorized(false);
        setUserId("");
        setUsername("");
        setQuery("");
    }

    return (
        <Html
            transform
            position={[0.9, 0.8, -0.7]}
            center
            distanceFactor={2}
            rotation-x={-Math.PI / 2}
        >
            <div className="snack-bar">
                <button className="btn-home" onClick={returnHome}>
                    <img src="./home.png" alt="home" />
                </button>
                <form className="form-search-game" onSubmit={e => { e.preventDefault(); onSearch(query); }}>
                    <input type="text" placeholder="Search a game" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
                    <button type="submit" className="btn-search-game">Search</button>
                </form>
            </div>

        </Html>
    )
}

export default SnackBar;