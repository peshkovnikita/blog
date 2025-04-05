import cl from '../styles/App.module.scss'
import Article from './Article.tsx'
import { useState } from 'react'

import { fetchAllArticles } from '../services/RealWorldAPI.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'

import type { PaginationProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, Pagination, Spin, Alert } from 'antd'
import { articleAPI } from '../services/articleService.ts'
const paginationStyles = {
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

const ArticleList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 5
    const offset = (currentPage - 1) * limit;

    const { data, isLoading, isError } = articleAPI.useFetchAllArticlesQuery({ limit, offset })

    const allArticles = data?.articles.map((article) => (
        <Article key={article.slug} {...article} />
    ));

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page)
    };

    return(
        <ul className={cl.articleList}>
            { isLoading && <Spin indicator={<LoadingOutlined spin />} size='large' /> }
            { isError && <Alert message='Network Error' type='error' showIcon /> }
            { allArticles }
            { allArticles &&
                <ConfigProvider theme={ paginationStyles }>
                    <Pagination align='center'
                                defaultPageSize={limit}
                                current={currentPage}
                                onChange={onChange}
                                total={data?.articlesCount}
                                showSizeChanger={false}
                    />
                </ConfigProvider>
            }
        </ul>
    )
}

export default ArticleList