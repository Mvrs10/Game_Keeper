import { Html } from '@react-three/drei';

import type IGame from '../types/Game';

interface ISphere {
    game: IGame
}

const Sphere: React.FC<ISphere> = ({ game }) => {

    return (
        <group position={[1.0, 0.9, 0.1]}>
            <mesh>
                {/* SphereGeometry parameters: radius, widthSegments, heightSegments */}
                <sphereGeometry args={[0.6, 150, 150]} />
                <meshStandardMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.3}
                    roughness={0}
                    metalness={0.5}
                />
            </mesh>

            {/* Label inside the sphere */}
            {game._id === "undefined" ? null : <Html center>
                <div className="sphere">
                    <h2><strong>{game.title}</strong></h2>
                    <div>Genre: {game.genre}</div>
                    <div>Developer: {game.developer}</div>
                    <div>Platforms: {game.platform}</div>
                    <div>Rating: {game.rating}/5</div>
                    <div>Release on: {game.releaseYear}</div>
                    <div>Description: {game.description}</div>
                </div>
            </Html>}
        </group>
    );
};

export default Sphere;