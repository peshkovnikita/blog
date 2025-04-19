import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header.tsx'
import ArticleList from './components/ArticleList.tsx'
import ArticlePage from './components/ArticlePage.tsx'
import SignUp from './components/SignUp.tsx'
import SignIn from './components/SignIn.tsx'
import Profile from './components/Profile.tsx'
import CreateArticle from './components/CreateArticle.tsx'
import EditArticle from './components/EditArticle.tsx'
import { useAppDispatch } from './hooks/redux.ts'
import { setTokenFromStorage } from './store/reducers/AuthSlice.ts'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) dispatch(setTokenFromStorage(token))
    }, []);

    return (
        <>
            <Header />
            <Routes>
                {/*<Route path='/' element={<Navigate to='/articles' replace />} />*/}
                <Route path='/' exact element={<ArticleList />} />
                <Route path='/articles/:slug' element={<ArticlePage />} />
                <Route path='/sign-up' exact element={<SignUp />} />
                <Route path='/sign-in' exact element={<SignIn />} />
                <Route path='/profile' exact element={<Profile />} />
                <Route path='/new-article' exact element={<CreateArticle />} />
                <Route path='/articles/:slug/edit' exact element={<EditArticle />} />
            </Routes>
        </>
    )
}

export default App
