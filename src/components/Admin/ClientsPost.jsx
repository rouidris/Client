import React, {useCallback, useEffect, useState} from 'react'
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai'
import Moment from 'react-moment'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from "react-toastify";
import axios from "../../utils/axios";
import {useDispatch} from "react-redux";

export const ClientsPost = ({ post }) => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    if (!post) {
        return (
            <div> </div>
        )
    }
    return (
        <Link to={`/${post._id}`}>
            {/*<div className='flex justify-between border-4 rounded-xl border-black h-28 w-64 m-1 p-2' style={{ background: '#54da9e' }}>*/}
            <div className='flex justify-between border-4 rounded-xl border-black h-28 w-64 m-1 p-2 bg-white'>
                <div className='text-black font-bold text-3xl relative'>
                    {post.title}
                    <div className='text-xl  text-black opacity-50 absolute bottom-0 left-0'>
                        {post.username}
                    </div>

                </div>

                <div className='flex'>
                    { post.author && (
                        <div className='flex items-center mt-2'>
                            <button className='flex items-center  text-2xl text-red-500 opacity-70'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments && post.comments.length > 1 ? 1 : post.comments ? post.comments.length : 0}</span>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </Link>
    )
}
