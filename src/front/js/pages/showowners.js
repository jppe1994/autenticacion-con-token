// src/views/ShowOwners.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ShowOwners = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchOwners();
    }, [actions]);

    const handleDeleteOwner = async ownerId => {
        await actions.deleteOwner(ownerId);
    };

    return (
        <div className="container">
            <h2>Owners</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.owners.map(owner => (
                        <tr key={owner.id}>
                            <td>{owner.name}</td>
                            <td>{owner.email}</td>
                            <td>
                                <Link to={`/editowner/${owner.id}`} className="btn btn-primary">
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <button onClick={() => handleDeleteOwner(owner.id)} className="btn btn-danger">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};