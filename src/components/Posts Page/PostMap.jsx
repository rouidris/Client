import React, {useState} from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import {Link, useNavigate} from 'react-router-dom';
import {PostItem} from "../Main/PostItem";
import {PostPage} from "../../pages/PostPage";

export const PostMap = ({ post, markers, setMarkers, setPolygonCoordinates}) => {
    const navigate = useNavigate()

    if (!post) {
        return (
            <div> </div>
        );
    }

    const handleClick = () => {
        // Добавляем маркеры в состояние markers в родительском компоненте
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            { lat: post.markerLat, lng: post.markerLng },
        ]);
    };

    const handleServerResponse = async () => {
        try {
            const coordinates = await post.coordinates; // Дождитесь выполнения post.coordinates
            setPolygonCoordinates(coordinates);
        } catch (error) {
            // Обработка ошибки при получении координат
            console.error('Ошибка при получении координат', error);
        }
    };



    return (
        <div className='flex flex-col  p-1 m-2 bg-gray-600 rounded-xl'>
            <PostItem key={post.id} post={post} />
            <div className="flex flex-row justify-between my-2">
                <button onClick={handleClick} className="mx-2 w-full rounded-2xl px-4" style={{ cursor: 'pointer' , backgroundColor: "white" }}>
                    Точка
                </button>
                <button  onClick={handleServerResponse} className=" mx-2 w-full rounded-2xl p-4" style={{ cursor: 'pointer' , backgroundColor: "white" }}>
                    Поле
                </button>
            </div>

        </div>
    );
};
