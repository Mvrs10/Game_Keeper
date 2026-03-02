import { Html } from "@react-three/drei";

interface IUserLabel {
    username: string;
    level: number;
    avatar: string;
}

const UserLabel: React.FC<IUserLabel> = ({ username, level, avatar }) => {
    // Logic fix: If username exists and isn't empty, user is logged in
    const isLoggedIn = username && username.trim() !== "";

    return (
        <Html
            transform
            position={[0, 0.3, -1.2]}
            distanceFactor={2.5}
            rotation-x={-Math.PI / 2}
        >
            <div className={`user-label-container ${isLoggedIn ? 'authenticated' : 'guest'}`}>
                <div className="avatar-badge">
                    <img src={`/images/${avatar || 'pawn'}.webp`} className="user-profile-img" alt="avatar" />
                    {isLoggedIn && <span className="level-bubble">{level}</span>}
                </div>
                
                <div className="text-content">
                    <span className="username-text">
                        {isLoggedIn ? username : "Guest Player"}
                    </span>
                    {isLoggedIn && <div className="xp-bar-mini"></div>}
                </div>
            </div>
        </Html>
    );
}

export default UserLabel;