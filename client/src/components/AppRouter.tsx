import { Routes, Route } from "react-router-dom";

import Home from "./Home.tsx";
import Content from "./Content.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game-keeper" element={
                <ProtectedRoute>
                    <Content />
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default AppRouter;