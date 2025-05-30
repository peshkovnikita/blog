import cl from '../styles/App.module.scss'
import Article from './Article.tsx'
import { useEffect } from 'react'

import Footer from './Footer.tsx'
import { articleAPI } from '../services/articleService.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { setArticlesCount } from '../store/reducers/ArticleSlice.ts'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Alert } from 'antd'

const ArticleList = () => {
    const dispatch = useAppDispatch()
    const { currentPage } = useAppSelector((state) => state.page)

    const limit = 5
    const offset = (currentPage - 1) * limit

    const { data, isLoading, isError, refetch } = articleAPI.useFetchAllArticlesQuery(
        { limit, offset },
        { refetchOnMountOrArgChange: true }
    )

    const allArticles = data?.articles.map((article) => (
        <Article key={article.slug} {...article} onRefetch={refetch}/>
    ))

    useEffect(() => {
        if(data) dispatch(setArticlesCount(data.articlesCount))
    }, [data])

    return(
        <>
            <ul className={cl.articleList}>
                { isLoading && <Spin indicator={<LoadingOutlined spin />} size='large' /> }
                { isError && <Alert message='Network Error' type='error' showIcon /> }
                { allArticles }
            </ul>
            { !isLoading ? <Footer /> : null }
        </>
    )
}

export default ArticleList