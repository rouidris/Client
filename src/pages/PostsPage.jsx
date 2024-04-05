import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostMap } from '../components/Posts Page/PostMap'
import axios from '../utils/axios'
import Map from "../components/MapComponents/Map";
import MapPolygon from "../components/MapComponents/MapPolygon";
export const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const [markers, setMarkers] = useState([]);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
            console.log("PostsPage.jsx")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (

        <div>
            <div className=" w-full bg-gray-600  ">
                <div className=" w-full  flex flex-row rounded-2xl">
                        <div className='w-65  py-10 flex flex-col m-2 bg-gray-800 rounded-xl'>
                            {posts && posts.map((post, idx) => (
                            <PostMap
                                post={post} key={idx}
                                markers={markers}
                                setMarkers={setMarkers}
                                polygonCoordinates={polygonCoordinates}
                                setPolygonCoordinates={setPolygonCoordinates}
                            />))}
                        </div>
                        <div className='w-full flex flex-col  '>
                            <div className="w-auto h-full flex flex-row rounded-xl m-2 bg-gray-800 p-2">
                                <Map markers={markers} />
                                <MapPolygon polygonCoordinates={polygonCoordinates}/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
