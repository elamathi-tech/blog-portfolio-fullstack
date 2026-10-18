
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

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
            navigate('/login');
        } catch (error) {
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <nav className="site-navbar">
            <h2 className="navbar-brand">Personal</h2>

            <div className="navbar-links">
                <Link to="/home">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/home#about">About</Link>

                {user ? (
                    <button className="button-style" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button
                        className="button-style"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
