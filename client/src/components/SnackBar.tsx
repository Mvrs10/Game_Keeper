import { Html } from "@react-three/drei";
import type { Dispatch, SetStateAction } from "react";

interface ISnackBar {
    setIsExiting: Dispatch<SetStateAction<boolean>>
}

const SnackBar: React.FC<ISnackBar> = ({setIsExiting}) => {

    const returnHome = () => {
        setIsExiting(true);
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
                        <form className="form-search-game">
                            <input type="text" name="Search a game" />
                            <button type="submit" className="btn-search-game">Search</button>
                        </form>
                    </div>

                </Html>
    )
}

export default SnackBar;