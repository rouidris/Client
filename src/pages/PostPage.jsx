import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import MapPolygon from "../components/MapComponents/MapPolygon";
import {createRequest} from "../redux/features/request/requestSlice";
import {CommentItem} from "../components/CommentItem";
import {RequestItem} from "../components/RequestItem";
import {createComment, getPostComments} from "../redux/features/comment/commentSlice";

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('Клиент отправил заявку на костультацию по этому полю')
    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);



    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Поле было удалено')
            navigate('/polygons')
        } catch (error) {
            console.log(error)
        }
    }
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])
    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])
    const handleServerResponse = async () => {
        try {
            const coordinates = await post.coordinates; // Дождитесь выполнения post.coordinates
            console.log(coordinates)
            setPolygonCoordinates(coordinates);
        } catch (error) {
            // Обработка ошибки при получении координат
            console.error('Ошибка при получении координат', error);
        }
    };
    const handleSubmit = async () => {
        try {
            const postId = params.id;
            await dispatch(createComment({ postId, comment }));
            setComment('заново отправил');
            setFormSubmitted(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPost()
    }, [fetchPost])
    useEffect(() => {
        fetchComments()
    }, [fetchComments])


    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <div >
            <div className='flex mx-8 p-6 bg-gray-600 mt-2 rounded-sm justify-between'>
                <div className=' w-1/3 flex flex-col p-2 bg-gray-800 rounded-2xl'>
                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-white opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-white opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>

                    <div className='text-white text-2xl mx-4'>{post.title}</div>
                    <div className="flex justify-between border-2 border-gray-300 rounded-2xl p-2 bg-gray-800 mt-8  ">
                        <p className='text-white opacity-70 text-xs pt-2'>
                            {post.text}
                        </p>
                        <p className='text-white opacity-70 text-xs pt-4 flex justify-end items-end h-full'>
                            {post.area} m2
                        </p>
                    </div>
                    <button  onClick={handleServerResponse} className="my-2 rounded-2xl py-6" style={{ cursor: 'pointer' , backgroundColor: "white" }}>
                        Вывести поле
                    </button>

                    <div className='flex h-full justify-end items-end'>
                        {user?.role === 'admin' ? (
                            // Для администратора
                            <div className='flex gap-3 mt-4'>
                                <button className='flex  text-white '>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex  text-white '
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        ) : (
                            // Для обычного пользователя
                            user?._id === post.author && (
                                <div className='flex '>
                                    <form
                                        className='flex '
                                        onSubmit={(e) => e.preventDefault()}
                                    >
                                        <button
                                            type='submit'
                                            onClick={handleSubmit}
                                            className={`flex justify-center items-center px-2 mx-2 text-white rounded-sm ${
                                                formSubmitted ? 'bg-green-600' : 'bg-red-600'
                                            }`}
                                        >
                                            {formSubmitted ? 'Заявка отправлена' : 'Отправить заявку'}
                                        </button>
                                    </form>
                                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                        <Link to={`/${params.id}/edit`}>
                                            <AiTwotoneEdit />
                                        </Link>
                                    </button>
                                    <button
                                        onClick={removePostHandler}
                                        className='flex items-center justify-center gap-2 text-white opacity-50'
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className=" w-full flex rounded-2xl ">
                    <div className='w-full flex flex-col rounded-2xl m-2 bg-gray-900'>
                        <div className="w-auto h-full flex items-center">
                            <MapPolygon polygonCoordinates={polygonCoordinates}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}