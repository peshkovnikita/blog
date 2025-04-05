import { Routes, Route, Navigate } from 'react-router-dom'

import Header from'./components/Header.tsx'
import ArticleList from './components/ArticleList.tsx'
import ArticlePage from './components/ArticlePage.tsx'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/articles' replace />} />
                <Route path='/articles' exact element={<ArticleList />} />
                <Route path='/articles/:slug' element={<ArticlePage />} />
            </Routes>
        </>
    )
}

export default App
