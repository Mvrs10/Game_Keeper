import { Html } from "@react-three/drei";

interface IUserLabel {
    username: string
}
const UserLabel: React.FC<IUserLabel> = ({username}) => {

    return (
        <Html
            transform
            position={[0, 0.3, -1.2]}
            distanceFactor={2.5}
            rotation-x={-Math.PI / 2}
        >
            <div className="username-label">
                <h1>{username || "Guest"}</h1>
            </div>
        </Html>
    )
}

export default UserLabel;
