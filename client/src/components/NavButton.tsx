import { Html } from '@react-three/drei';
import * as THREE from 'three';

import type IGame from '../types/Game';
import type { Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface INavButton {
    setGames: Dispatch<SetStateAction<IGame[]>>,
    userId: string
}

const NavButton: React.FC<INavButton> = ({setGames, userId}) => {

    const getAllGames = async () => {
        try {
            const response = await axios.get<IGame[]>('/api/games');
            setGames(response.data);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    const getCollection = async () => {
        try {
            if (userId === "") return;
            const response = await axios.get<IGame[]>(`/api/users/${userId}/games`);
            setGames(response.data);
        } catch (err) {
            console.log("Error fetching collection:", err)
        }
    }

        const buttons: { label: string, pos: [number, number, number], action: () => Promise<void> }[] = [
        { label: "All Games", pos: [-2.5, 0.02, -0.3], action: getAllGames },
        { label: "My Collection", pos: [-2.5, 0.02, 0.4], action: getCollection }
    ];

    return (
        <>
            {buttons.map((btn, i) => (
                <group key={i} position={btn.pos}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.3, 3]} /> {/* Triangle Trick */}
                        <meshStandardMaterial color="#D9B420" side={THREE.DoubleSide} metalness={1}/>
                    </mesh>
                    <Html center transform distanceFactor={3} rotation-x={-Math.PI / 2}>
                        <div className="nav-btn-container">
                            <button type="button" className="nav-btn" onClick={btn.action}>{btn.label}</button>
                        </div>
                    </Html>
                </group>
            ))}
        </>

    );
};

export default NavButton;