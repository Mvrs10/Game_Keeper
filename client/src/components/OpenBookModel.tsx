import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import GamesList from "./GamesList";
import Sphere from "./Sphere";
import SnackBar from "./SnackBar";

import type IGame from "../types/Game";

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

    const [zPos, setZPos] = useState<number>(6);
    const [xOffset, setXOffset] = useState<number>(0);
    const [isExiting, setIsExiting] = useState<boolean>(false);

    useFrame((_state, delta) => {
        if (zPos > 0.1) {
            setZPos(zPos - delta * 1);
            camera.position.setZ(zPos);
        }

        if (isExiting) {
            setXOffset(prev => prev - delta * 10);
        }
    })

    const [games, setGames] = useState<IGame[]>([]);

    const [selectedGame, setSelectedGame] = useState<IGame>(initGameState);

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
    },[]);

    useEffect(() => {
        if (xOffset < -10) navigate("/");
    }, [xOffset]);

    return (
        <group position={[xOffset,0,0]}>
            <primitive object={scene} />
            <GamesList games={games} setSelectedGame={setSelectedGame}/>
            <Sphere game={selectedGame}/>
            <SnackBar setIsExiting={setIsExiting}/>
        </group>
    )
}

export default OpenBookModel;