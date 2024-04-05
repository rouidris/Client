import React, {useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../components/Main/PostItem'
import { getAllPosts} from '../redux/features/post/postSlice'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getAllUsers} from "../redux/features/auth/authSlice";
import {ClientsPost} from "../components/Admin/ClientsPost";
export const PolygonClients = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    console.log("PolygonClientssss")


    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className=" m-10">
                    <p className='flex mx-auto text-white text-4xl font-bold  m-5  text-center'>
                        Поля пользователей:
                    </p>

                    <div className='grid grid-cols-5 w-full  p-1  ' >
                        {posts?.map((post, idx) => (
                            <ClientsPost key={idx} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
