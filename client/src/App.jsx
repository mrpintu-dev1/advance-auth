import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Dashboard from "./pages/home/Dashboard";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/auth/PrivateRoute';
import ProtectedLogin from './components/auth/ProtectedLogin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedLogin>
                            <Login />
                        </ProtectedLogin>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedLogin>
                            <Registration />
                        </ProtectedLogin>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedLogin>
                            <ForgotPassword />
                        </ProtectedLogin>
                    }
                />
                <Route
                    path="/reset-password/:resetToken"
                    element={
                        <ProtectedLogin>
                            <ResetPassword />
                        </ProtectedLogin>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
