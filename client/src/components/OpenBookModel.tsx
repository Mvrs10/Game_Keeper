import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { gql } from "@apollo/client";
import { useQuery } from '@apollo/client/react';

import GamesList from "./GamesList";
import Sphere from "./Sphere";
import SnackBar from "./SnackBar";
import NavButton from "./NavButton";
import UserLabel from "./UserLabel";
import EditProfileForm from "./EditProfileForm";

import type IGame from "../types/Game";
import type IUserProfile from "../types/UserProfile";
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

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      _id
      userId
      level
      avatar
    }
  }
`;

const OpenBookModel = () => {
    const { scene } = useGLTF('/models/BookOpen.glb');

    const { camera } = useThree();

    const navigate = useNavigate();
    const { isAuthorized, userName, userId }: AuthorizationContextType = useContext(AuthorizationContext);

    const zPos = useRef<number>(6);
    const posRef = useRef<THREE.Group>(null);
    const [isExiting, setIsExiting] = useState<boolean>(false);

    useFrame((_state, delta) => {
        if (zPos.current > 0.1) {
            zPos.current -= delta * 1;
            camera.position.setZ(zPos.current);
        }

        if (isExiting && posRef.current) {
            posRef.current.position.x -= delta * 10;
            if (posRef.current.position.x < -10) {
                navigate("/");
            }
        }
    })

    const [games, setGames] = useState<IGame[]>([]);
    const [favoriteGames, setFavoriteGames] = useState<IGame[]>([]);
    const [isCollectionOpen, setIsCollectionOpen] = useState<boolean>(false);

    const [selectedGame, setSelectedGame] = useState<IGame>(initGameState);

    const getAllGames = async () => {
        try {
            const response = await axios.get<IGame[]>('/api/games');
            setGames(response.data);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    const getCollection = async (isClicked: boolean = false) => {
        try {
            if (userId === "") return;
            const response = await axios.get<IGame[]>(`/api/users/${userId}/games`);
            setFavoriteGames(response.data); //TODO: improve spaghetti logic.
            if (isClicked || isCollectionOpen) setGames(response.data);
        } catch (err) {
            console.log("Error fetching collection:", err)
        }
    }

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
        getCollection();
        getAllGames();        
    }, []);

    /* GraphQL - Lab2 */
    const { data } = useQuery<{ userProfile: IUserProfile }>(GET_USER_PROFILE, {
        variables: { userId },
        skip: !userId, 
    });

    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

    return (
        <group ref={posRef}>
            <primitive object={scene} />
            <UserLabel username={userName} level={data?.userProfile?.level ?? 1} avatar={data?.userProfile?.avatar ?? "pawn"} onClick={() => setIsEditProfile(true)} />
            {isEditProfile && (
                <EditProfileForm
                    userId={userId}
                    currentProfile={data?.userProfile}
                    onClose={() => setIsEditProfile(false)}
                />
        )}
            {isAuthorized ? <NavButton getAllGames={getAllGames} getCollection={getCollection} setIsCollectionOpen={setIsCollectionOpen}/> : null}
            <GamesList games={games} setSelectedGame={setSelectedGame} isAuthorized={isAuthorized} userId={userId} favoriteGames={favoriteGames} setFavoriteGames={setFavoriteGames}/>
            <Sphere game={selectedGame} />
            <SnackBar setIsExiting={setIsExiting} onSearch={searchGames} />
        </group>
    )
}

export default OpenBookModel;