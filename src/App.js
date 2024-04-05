import { Layout } from './components/StartEnd/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { AddPostPage } from './pages/AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { EditPostPage } from './pages/EditPostPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'
import {PolygonClients} from "./pages/PolygonClients";

function App() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='posts' element={<PostsPage />} />
                <Route path=':id' element={<PostPage />} />
                <Route path=':id/edit' element={<EditPostPage />} />
                <Route path='new' element={<AddPostPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='polygons' element={<PolygonClients />} />
            </Routes>
            <ToastContainer position='bottom-right' />
        </Layout>
    )
}

export default App
