import { Route, Routes } from 'react-router-dom';
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default AppRoutes;