import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import Map from '../components/MapComponents/MapArea'

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [area, setArea] = useState('')
    const [markerLat, setMarkerLat] = useState('');
    const [markerLng, setMarkerLng] = useState('');
    const coordinates = localStorage.getItem("allCoordinates");


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            data.append('area', area)
            data.append('markerLat', markerLat)
            data.append('markerLng', markerLng)
            data.append('coordinates', coordinates);
            dispatch(createPost(data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form
            className='w-2/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='text-xs text-white opacity-70'>
                Название поля:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Название'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-white opacity-70 mt-16'>
                Описание поля:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Категория, почва, растения и другие подробности'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                />
            </label>

            <div className='flex flex-col w-full mb-6 mt-16 text-center text-orange-500  text-sx'>
                <Map/>
            </div>

            <label className='text-xs text-white opacity-70'>
                Введите ваше местоположение
                <div className="flex">
                    <input
                        type="number"
                        value={markerLat}
                        placeholder='Широта'
                        onChange={(e) => setMarkerLat(e.target.value)}
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700'
                    />
                    <input
                        type="number"
                        value={markerLng}
                        placeholder='Долгота'
                        onChange={(e) => setMarkerLng(e.target.value)}
                        className='mt-1 ml-2 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700'
                    />
                </div>
            </label>



            <label className='text-xs text-white opacity-70 '>
                Введите площадь поля(в квадратных метрах)
                    <input
                        type={"number"}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700'
                    />

            </label>

            <div className='flex gap-8 items-center justify-center mt-10'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Добавить
                </button>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}
