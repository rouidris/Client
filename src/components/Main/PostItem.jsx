import React, {useEffect} from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../../redux/features/auth/authSlice'
export const PostItem = ({ post }) => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    if (!post) {
        return (
            <div> </div>
        )
    }
    if (!user || user.role === 'admin') {
        return (
            <Link to={`/${post._id}`}>
                <div className='flex justify-between border-2 border-opacity-50 border-black m-1 p-1' >
                    <div className='text-black text-xl'>
                        {post.title}
                        <div className='text-xs  text-black opacity-50'>
                            {post.username}
                        </div>
                    </div>

                    <div className='flex    '>

                        { post.author && (
                            <div className='flex '>

                            </div>
                        )}
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <Link to={`/${post._id}`}>
            <div className='flex flex-col basis-1/4 flex-grow p-1 bg-gray-600 '>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-xs text-white opacity-50'>
                        {post.username}
                    </div>
                    <div className='text-xs text-white opacity-50'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                <div className='text-white text-2xl font-bold'>{post.title}</div>
                <p className='text-white opacity-60 text-xs pt-4 line-clamp-4'>
                    {post.area} m2
                </p>
            </div>
        </Link>
    )
}
