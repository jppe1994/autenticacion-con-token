import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AdminLogin = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (store.adminErrorMessage) {
            setErrorMessage(store.adminErrorMessage);
        }
    }, [store.adminErrorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.adminLogin(email, password);
            navigate("/adminprivate");
        } catch (error) {
            setErrorMessage(store.adminErrorMessage || "El mail o password no son correctos, inténtelo de nuevo");
        }
    };
    
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setErrorMessage("");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to="/">Back home</Link>
        </div>
    );
};

export default AdminLogin;