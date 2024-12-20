"use client"
import React, { useEffect, useState } from "react";
import { apiRequest } from '@/app/services/api';

function SkeletonCardLoader() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col space-y-4 p-4 bg-white shadow rounded animate-pulse"
                    >
                        {/* Image */}
                        <div className="h-32 w-full bg-gray-300 rounded"></div>
                        {/* Title */}
                        <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
                        {/* Text */}
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                ))}
        </div>
    );
}

export default function Content() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getPosts = async () => {
        try {
            const data = await apiRequest('/posts');
            setPosts(data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getPosts();
    }, [])

    if (loading) return <SkeletonCardLoader />;
    
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post: any) => (
                    <div
                        key={post.id}
                        className="border rounded-md p-4 shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-700">{post.body}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
