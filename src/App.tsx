import { Routes, Route, Navigate } from 'react-router-dom'

import Header from'./components/Header.tsx'
import ArticleList from './components/ArticleList.tsx'
import ArticlePage from './components/ArticlePage.tsx'
import SignUp from './components/SignUp.tsx'
import SignIn from './components/SignIn.tsx'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/articles' replace />} />
                <Route path='/articles' exact element={<ArticleList />} />
                <Route path='/articles/:slug' element={<ArticlePage />} />
                <Route path='/sign-up' exact element={<SignUp />} />
                <Route path='/sign-in' exact element={<SignIn />} />
            </Routes>
        </>
    )
}

export default App
