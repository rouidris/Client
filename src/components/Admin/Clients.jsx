import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers} from "../../redux/features/auth/authSlice";
import { ClientsPost } from './ClientsPost'

import { useNavigate } from 'react-router-dom';

export const Clients = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const { users } = useSelector((state) => state.auth);
    const [posts, setPosts] = useState({ data: [] });


    const fetchMyPosts = async (userId) => {
        try {
            const { data } = await axios.get(`http://localhost:3002/api/auth/users/${userId}`);
            console.log("Fetched posts:", data);
            setPosts({ data });
            console.log("Posts state after setting:", posts);
        } catch (error) {
            console.log(error);
        }
    };
    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        console.log(userId);
        if (userId) {
            fetchMyPosts(userId);
        } else {
            console.log("что-то пошло не так");
        }
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div>
            {/*<div className="w-full border-white rounded-2xl border-4 " style={{ background: 'linear-gradient(260deg, #047373, #31e5cd)' }}>*/}
            <div className="w-full border-white rounded-2xl border-4 bg-gray-600">
                <div className="w-full flex flex-row  ">
                    <div className='w-40 py-10 flex flex-col m-2 border-1 border-black'>
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className={`border border-gray-700 bg-white text-black p-2 m-2 ${
                                    selectedUserId === user._id ? 'bg-blue-500' : ''
                                }`}
                                onClick={() => handleUserClick(user._id)}
                            >
                                {user.username}
                            </div>
                        ))}
                    </div>
                    <div className='flex-grow border-1 mt-16 border-black  text-white p-4'>
                        {Array.isArray(posts.data.userPosts) && posts.data.userPosts.length > 0 ? (
                            <div className='grid grid-cols-5 gap-4 p-1'>
                                {posts.data.userPosts.map((userPost) => (
                                    <ClientsPost key={userPost._id} post={userPost} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">Поля ещё не созданы...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};