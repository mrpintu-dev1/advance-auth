import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };


        try {
            const { data } = await axios.post(
                "/api/auth/login",
                {
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
                setError("");
            }, 5000);
        }
    };
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
                                        Login to your Account
                                    </div>
                                    {error && (
                                        <span className="text-danger">
                                            {error}
                                        </span>
                                    )}
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
                                            <Link
                                                to="/forgot-password"
                                                className="float-right small"
                                            >
                                                I forgot password
                                            </Link>
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
                                    <div className="form-footer mt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                    <div className="text-center text-muted mt-3">
                                        Don't have account yet?{" "}
                                        <Link to="/register">Sign up</Link>
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

export default Login;
