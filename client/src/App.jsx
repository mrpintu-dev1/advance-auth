import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Dashboard from "./pages/home/Dashboard";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Registration/>} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/reset-password/:resetToken' element={<ResetPassword/>} />
            </Routes>
        </Router>
    );
};

export default App;
