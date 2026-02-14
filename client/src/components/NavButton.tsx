import { Html } from '@react-three/drei';
import { type Dispatch, type SetStateAction } from 'react';
import * as THREE from 'three';

interface INavButton {
    getAllGames: () => Promise<void>,
    getCollection: (isClicked: boolean) => Promise<void>,
    setIsCollectionOpen: Dispatch<SetStateAction<boolean>>
}

const NavButton: React.FC<INavButton> = ({getAllGames, getCollection, setIsCollectionOpen}) => {

    const viewAll = async () => {
        setIsCollectionOpen(false);
        getAllGames();
    }

    const viewCollection = async () => {
        setIsCollectionOpen(true);
        getCollection(true);
    }

    const buttons: { label: string, pos: [number, number, number], action: () => Promise<void> }[] = [
        { label: "All Games", pos: [-2.5, 0.02, -0.3], action: viewAll },
        { label: "My Collection", pos: [-2.5, 0.02, 0.4], action: viewCollection }
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