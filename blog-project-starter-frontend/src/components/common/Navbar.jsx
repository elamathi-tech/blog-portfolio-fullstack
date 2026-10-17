import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="py-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Personal</h2>
            <div className="flex items-center">
                <Link className="list-none px-5" to="/home">Home</Link>
                <Link className="list-none px-5" to="/blogs">Blogs</Link>
                <Link className="list-none px-5">About</Link>

                {user ? (
                    <button className="button-style" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="button-style" onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar