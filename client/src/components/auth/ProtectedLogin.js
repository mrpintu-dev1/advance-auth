import { Navigate } from "react-router-dom";

const ProtectedLogin = ({ children }) => {
    const token = localStorage.getItem("authToken");

    return !token ? children : <Navigate to="/" />;
};

export default ProtectedLogin;
