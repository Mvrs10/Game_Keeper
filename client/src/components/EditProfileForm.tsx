import { Html } from "@react-three/drei";
import { useState } from "react";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

interface EditProfileProps {
    userId: string;
    currentProfile?: {
        level: number;
        avatar: string;
    };
    onClose: () => void;
}

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userId: ID!, $level: Int, $avatar: String) {
    updateUserProfile(userId: $userId, level: $level, avatar: $avatar) {
      _id
      level
      avatar
    }
  }
`;

const EditProfileForm: React.FC<EditProfileProps> = ({ userId, currentProfile, onClose }) => {
    const [level, setLevel] = useState(currentProfile?.level || 1);
    const [avatar, setAvatar] = useState(currentProfile?.avatar || "pawn");

    const [updateProfile, { loading }] = useMutation(UPDATE_USER_PROFILE, {
        onCompleted: () => onClose(), // Close form after successful update
        onError: (err) => console.error("Update failed:", err),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({
            variables: {
                userId,
                level: parseInt(level.toString()),
                avatar
            }
        });
    };

    const avatarOptions = ["pawn", "rook", "knight", "bishop", "queen", "king"];
    
    return (
        <Html
            transform
            position={[0, 0.3, -0.1]}
            center
            distanceFactor={2}
            rotation-x={-Math.PI / 2}
        >
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form-control">
                    <label>Edit Profile</label>
                    <button type="button" className="btn-close-form btn-login" onClick={onClose}>X</button>
                </div>

                <label>Level</label>
                <input 
                    type="number" 
                    value={level} 
                    onChange={e => setLevel(parseInt(e.target.value))} 
                    required 
                />

               <label>Rank (Avatar)</label>
                <select 
                    className="login-form-select"
                    value={avatar} 
                    onChange={e => setAvatar(e.target.value)}
                >
                    {avatarOptions.map(option => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                    ))}
                </select>

                <button type="submit" className="btn-login" disabled={loading}>
                    {loading ? "Saving..." : "Update Profile"}
                </button>
            </form>
        </Html>
    );
};

export default EditProfileForm;