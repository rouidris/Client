import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllPosts} from '../redux/features/post/postSlice'
import MainPost from '../components/Main/MainPost'
import {Footer} from '../components/StartEnd/Footer'
import {Clients} from "../components/Admin/Clients";
export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)
    const {user} = useSelector((state) => state.auth)




    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        // return (
        //     <MainPost/>
        // )
    }


    if (!user || user.role === 'admin') {
        return (
            <div>
                <div >
                    <div>
                        {/*<p className='flex  text-white ml-10 uppercase font-bold text-2xl  m-5 text-center '>*/}
                        {/*    Поля пользователей:*/}
                        {/*</p>*/}
                        <div className='grid grid-cols-1 w-full p-1 '>
                            {posts.length > 0 && <Clients key={0} post={posts[0]} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
                <MainPost/>
                <Footer/>
        </div>
    )
}
