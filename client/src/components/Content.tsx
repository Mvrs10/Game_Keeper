import { Canvas } from '@react-three/fiber';
import { Stage} from '@react-three/drei';
import { Suspense } from 'react';

import CameraController from './CameraController'; // custom component handling camera
import OpenBookModel from './OpenBookModel';

const Content = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <Canvas camera={{position: [0,4,6], fov: 40}}>
                <Suspense fallback={null}>
                    <Stage environment="forest" intensity={0.5}>
                        <OpenBookModel />
                    </Stage>
                </Suspense>
                <CameraController />
            </Canvas>
        </div>
    )
}

export default Content;