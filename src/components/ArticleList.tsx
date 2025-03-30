import cl from '../styles/App.module.scss'
import Article from './Article.tsx'
import { useEffect, useState } from 'react';

import {getArticles} from '../services/RealWorldAPI.ts';
import {useAppDispatch, useAppSelector} from '../hooks/redux.ts';

import { ConfigProvider, Pagination } from 'antd';
const PaginationStyles = {
    token: {
        colorPrimary: '#FFFFFF'
    },
    components: {
        Pagination: {
            itemActiveBg: '#1890FF',
            itemActiveColor: '#FFFFFF',
            itemBg: 'transparent',
            itemColor: '#262626',
        }
    }
}

const ArticlesPagination =
    <ConfigProvider theme={ PaginationStyles }>
        <Pagination align='center' defaultCurrent={1} total={50} />
    </ConfigProvider>

const ArticleList = () => {
    const dispatch = useAppDispatch()
    const { allArticles } = useAppSelector(store => store.articleReducer)
    const [articlesList, setList] = useState([])

    useEffect(() => { dispatch(getArticles()) }, [dispatch]);

    useEffect(() => { setList(allArticles) }, [allArticles]);

    const articles = allArticles.length ?
        articlesList.map(article => <Article key={article.createdAt} {...article}/> )
        : null

    return(
        <ul className={cl.articleList}>
            { articles }
            { articles ? ArticlesPagination : null  }
        </ul>
    )
}

export default ArticleList