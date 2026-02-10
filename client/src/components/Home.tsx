//import React from 'react'
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import { Suspense } from 'react';

import CameraController from './CameraController'; // custom component handling camera
import BookModel from './BookModel';

const Home = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <Canvas camera={{ position: [0, 4, 0.1], fov: 60 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <BookModel />
                    </Stage>
                </Suspense>
                <CameraController />
            </Canvas>
        </div>
    );
}

export default Home