import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import GamesList from "./GamesList";
import Sphere from "./Sphere";
import SnackBar from "./SnackBar";
import NavButton from "./NavButton";
import UserLabel from "./UserLabel";

import type IGame from "../types/Game";
import { AuthorizationContext, type AuthorizationContextType } from "../context/AuthorizationContext";


const initGameState: IGame = {
    _id: "undefined",
    title: "N/A",
    genre: "N/A",
    platform: "N/A",
    releaseYear: -1,
    developer: "N/A",
    rating: -1,
    description: "N/A",
    image: "0",
}

const OpenBookModel = () => {
    const { scene } = useGLTF('/models/BookOpen.glb');

    const { camera } = useThree();

    const navigate = useNavigate();
    const { isAuthorized, userName, userId }: AuthorizationContextType = useContext(AuthorizationContext);

    const zPos = useRef<number>(6);
    const [xOffset, setXOffset] = useState<number>(0);
    const [isExiting, setIsExiting] = useState<boolean>(false);

    useFrame((_state, delta) => {
        if (zPos.current > 0.1) {
            zPos.current -= delta * 1;
            camera.position.setZ(zPos.current);
        }

        if (isExiting) {
            setXOffset(prev => prev - delta * 10);
        }
    })

    const [games, setGames] = useState<IGame[]>([]);

    const [selectedGame, setSelectedGame] = useState<IGame>(initGameState);

    const searchGames = async (query: string) => {
        try {
            if (query.trim() === "") {
                const response = await axios.get<IGame[]>('/api/games');
                setGames(response.data);
                return;
            }
            const response = await axios.get<IGame[]>(
                `/api/games/search?q=${query}`
            );
            setGames(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get<IGame[]>('/api/games');
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        if (xOffset < -10) navigate("/");
    }, [xOffset]);

    return (
        <group position={[xOffset, 0, 0]}>
            <primitive object={scene} />
            <UserLabel username={userName}/>
            {isAuthorized ? <NavButton setGames={setGames} userId={userId} /> : null}
            <GamesList games={games} setSelectedGame={setSelectedGame} isAuthorized={isAuthorized} />
            <Sphere game={selectedGame} />
            <SnackBar setIsExiting={setIsExiting} onSearch={searchGames} />
        </group>
    )
}

export default OpenBookModel;