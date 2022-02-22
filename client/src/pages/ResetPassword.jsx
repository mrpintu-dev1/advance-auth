import React, { useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import logo from "../assets/images/brand/logo.png";

const ResetPassword = () => {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Password do not match");
        }

        try {
            const { data } = await axios.put(
                `/api/auth/reset-password/${params.resetToken}`,
                {
                    password,
                },
                config
            );
            setSuccess(data.data);
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
                            <div className="text-center mb-6">
                                <img src={logo} className="h-6" alt="Logo" />
                            </div>
                            <form onSubmit={submitHandler} className="card">
                                <div className="card-body p-6">
                                    <div className="card-title text-center">
                                        Registration
                                    </div>
                                    {error && (
                                        <span className="text-danger">
                                            {error}
                                        </span>
                                    )}
                                    {success && (
                                        <span className="text-danger">
                                            {success}
                                        </span>
                                    )}
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
                                                setConfirmPassword(
                                                    e.target.value
                                                )
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
                                            Reset Password
                                        </button>
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

export default ResetPassword;
