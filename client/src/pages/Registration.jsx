import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                setError('')
            }, 5000)
            return setError('Password do not match');
        }

        try {
            const { data } = await axios.post(
                "/api/auth/register",
                {
                    username,
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("authToken", data.token);
            navigate("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('')
            }, 5000);
        }
    }

    return (
        <div className="page">
            <div className="page-single">
                <div className="container">
                    <div className="row my-auto">
                        <div className="col-4 col-login mx-auto my-auto mt-5">
                            <div className="text-center mb-6 text-light">
                                <h1>User Login</h1>
                            </div>
                            <form onSubmit={submitHandler} className="card">
                                <div className="card-body p-6">
                                    <div className="card-title text-center">
                                        Registration
                                    </div>
                                    {error && <span className='text-danger'>{error}</span>}
                                    <div className="form-group">
                                        <label className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="confirm Password"
                                        />
                                    </div>
                                    <div className="form-footer mt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="text-center text-muted mt-3">
                                        Already have an account?{" "}
                                        <Link to="/login">Sign in</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
