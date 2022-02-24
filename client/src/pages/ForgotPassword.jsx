import React, { useState } from "react";
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/forgot-password",
                {
                    email,
                },
                config
            );
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail('');
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
                                <h1>Forgot Password</h1>
                            </div>
                            <form onSubmit={submitHandler} className="card">
                                <div className="card-body p-6">
                                    <div className="card-title text-center">
                                        <p className="forgotpassword-screen__subtext">
                                            Please enter the email address you
                                            register your account with. We will
                                            send you reset password confirmation
                                            to this email
                                        </p>
                                    </div>
                                    {error && (
                                        <span className="text-danger">
                                            {error}
                                        </span>
                                    )}
                                    {success && (
                                        <span className="text-success">
                                            {success}
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
                                    <div className="form-footer mt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            Send Email
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

export default ForgotPassword;
