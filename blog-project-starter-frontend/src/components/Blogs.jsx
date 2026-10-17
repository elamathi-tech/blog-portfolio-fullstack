import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from './common/Footer';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_UID = "NGWGJCY7pKVusIsvBKiTE91Bmyz1";

function Blogs() {

    const [blogs, setBlogs] = useState([]);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAdmin(user?.uid === ADMIN_UID);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("http://localhost:5000/api/blogs").then((res) => {
            console.log(res.data)
            setBlogs(res.data)
        }).catch(() => {
            console.log("Error fetching data")
        })
    }, [])



    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');


    const handleLike = async (blog_id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`);
            // After successfully updating the likes count in the backend, fetch the updated list of blogs
            if (response.status === 200) {
                axios.get("http://localhost:5000/api/blogs").then((res) => {
                    console.log(res.data)
                    setBlogs(res.data)
                }).catch(() => {
                    console.log("Error fetching data")
                })
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };

    const handleEdit = async (blog) => {
        const newTitle = prompt("Enter the new blog title:", blog.newTitle);
        if (newTitle === null) return;

        const newContent = prompt("Enter the new blog content:", blog.newContent);
        if (newContent === null) return;

        const user = auth.currentUser;
        if (!user) {
            alert("Please log in first.");
            return;
        }

        try {
            const token = await user.getIdToken();

            await axios.patch(
                `http://localhost:5000/api/blogs/${blog._id}`,
                { newTitle, newContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const response = await axios.get("http://localhost:5000/api/blogs");
            setBlogs(response.data);
            alert("Blog updated successfully.");
        } catch (error) {
            alert(error.response?.data?.message || "Could not update blog.");
        }
    };



    const handleDelete = async (blog_id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        const user = auth.currentUser;

        if (!user) {
            alert("Please log in first.");
            return;
        }

        try {
            const token = await user.getIdToken();

            await axios.delete(
                `http://localhost:5000/api/blogs/${blog_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const response = await axios.get(
                "http://localhost:5000/api/blogs"
            );

            setBlogs(response.data);
            alert("Blog deleted successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Could not delete blog."
            );
        }
    };



    const handleNewBlogSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const user = auth.currentUser;

        if (!user) {
            alert("Please log in first.");
            return;
        }

        try {
            const token = await user.getIdToken();

            await axios.post(
                "http://localhost:5000/api/blogs",
                { newTitle, date, newContent, likes: 0 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const response = await axios.get("http://localhost:5000/api/blogs");
            setBlogs(response.data);

            setNewTitle('');
            setNewContent('');

        } catch (error) {
            alert(error.response?.data?.message || "Could not add blog. Please check admin access.");
        }
    };

    return (
        <div className="blog-section py-14">
            <h2 className="text-center text-5xl font-bold mb-14">Latest  <span className='text-orange-400'>Blogs</span> 📚</h2>

            {/* Blog creation form */}
            {isAdmin && (
                <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                    <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Blog Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="p-2 border rounded"
                            required
                        />
                        <textarea
                            placeholder="Blog Content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="p-2 border rounded"
                            rows="4"
                            required
                        />
                        <button type="submit" className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600">
                            Add Blog
                        </button>
                    </form>
                </div>
            )}

            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
                        <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
                        <span className="text-blue-500 cursor-pointer" onClick={() => handleLike(blog._id)}>Like</span>
                        <span className="ml-2">{blog.likes} Likes</span>
                        {isAdmin && (
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Blogs