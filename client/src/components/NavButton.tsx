import { Html } from '@react-three/drei';
import * as THREE from 'three';

const NavButton = () => {
    const buttons: { label: string, pos: [number, number, number] }[] = [
        { label: "All Games", pos: [-2.5, 0.02, -0.3] },
        { label: "My Collection", pos: [-2.5, 0.02, 0.4] }
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
                            <button type="button" className="nav-btn">{btn.label}</button>
                        </div>
                    </Html>
                </group>
            ))}
        </>

    );
};

export default NavButton;