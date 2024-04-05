import React, {useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout, getMe } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
    }
    if (!user || user.role === 'admin') {
        // Если пользователь не существует или он администратор, редиректим его на другую страницу или выводим соответствующее сообщение
        return (
            <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center p-1 h-10  text-white rounded-sm ml-4 '>
                 Привет, Админ
            </span>


                {isAuth && (
                    <ul className='flex gap-8  p-2 rounded-sm w-1/3 justify-center font-bold'>
                        <li>
                            <NavLink
                                to={'/'}
                                href='/'
                                className='text-white hover:border-b-4 rounded-2xl px-2 py-2 border-red-500'
                                style={({ isActive }) =>
                                    isActive ? { borderBottom: '4px solid white' } : undefined
                                }
                            >
                                Клиенты
                            </NavLink>
                        </li>


                        <li>
                            <NavLink
                                to={'/polygons'}
                                href='/'
                                className='text-white hover:border-b-4 rounded-2xl px-2 py-2 border-red-500'
                                style={({ isActive }) =>
                                    isActive ? { borderBottom: '4px solid white' } : undefined
                                }
                            >
                                Поля клиентов
                            </NavLink>
                        </li>
                    </ul>
                )}

                <div className='flex justify-center items-center bg-red-500 text-white rounded-sm px-4 py-2 mr-4'>
                    {isAuth ? (
                        <button onClick={logoutHandler}>Выйти</button>
                    ) : (
                        <Link to={'/login'}> Войти  </Link>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center p-1 h-10  text-black font-bold rounded-sm ml-4 '>
                {user ? `Привет, ${user.username} !` : 'Привет, Гость!'}
            </span>


            {isAuth && (
                <ul className='flex gap-8  p-2 rounded-sm w-1/3 justify-center font-black uppercase text-white'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className=' hover:border-b-4 rounded-2xl px-2 py-2 border-red-500'
                            style={({ isActive }) =>
                                isActive ? { borderBottom: '4px solid white' } : undefined
                            }
                        >
                            Главная
                        </NavLink>
                    </li>


                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className=' hover:border-b-4 rounded-2xl px-2 py-2 border-red-500'
                            style={({ isActive }) =>
                                isActive ? { borderBottom: '4px solid white' } : undefined
                            }
                        >
                            Мои поля
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className=' hover:border-b-4 rounded-2xl px-2 py-2 border-red-500'
                            style={({ isActive }) =>
                                isActive ? { borderBottom: '4px solid white' } : undefined
                            }
                        >
                            Добавить поле
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='flex justify-center items-center bg-red-500 text-white rounded-sm px-4 py-2 mr-4'>
                {isAuth ? (
                        <button onClick={logoutHandler}>Выйти</button>
                ) : (
                    <Link to={'/login'}> Войти  </Link>
                )}
            </div>
        </div>
    )
}
