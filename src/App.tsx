import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header.tsx'
import ArticleList from './components/ArticleList.tsx'
import ArticlePage from './components/ArticlePage.tsx'
import SignUp from './components/SignUp.tsx'
import SignIn from './components/SignIn.tsx'
import Profile from './components/Profile.tsx'
import {useAppDispatch, useAppSelector} from './hooks/redux.ts'
import { setTokenFromStorage } from './store/reducers/AuthSlice.ts'

function App() {
    const dispatch = useAppDispatch()
    const { currentPage } = useAppSelector((state) => state.page)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) dispatch(setTokenFromStorage(token))
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to={`/articles/${currentPage}`} replace />} />
                <Route path={`/articles/${currentPage}`} exact element={<ArticleList />} />
                <Route path='/articles/:slug' element={<ArticlePage />} />
                <Route path='/sign-up' exact element={<SignUp />} />
                <Route path='/sign-in' exact element={<SignIn />} />
                <Route path='/profile' exact element={<Profile />} />
            </Routes>
        </>
    )
}

export default App
