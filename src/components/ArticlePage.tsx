import cl from '../styles/App.module.scss'
import { Rate, Button, Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import { articleAPI } from '../services/articleService.ts'
import { useParams } from 'react-router'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useAppSelector } from '../hooks/redux.ts'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ArticlePage = () => {
    const { slug } = useParams()

    const { data, refetch } = articleAPI.useGetArticleQuery(
        slug,
        { refetchOnMountOrArgChange: true }
    )

    const { token, username, image } = useAppSelector(state => state.auth)

    const [ favoriteArticle, favoriteRes ] = articleAPI.useFavoriteArticleMutation()
    const [ unfavoriteArticle, unfavoriteRes ] = articleAPI.useUnfavoriteArticleMutation()

    const onFavorite = () => favoriteArticle(slug)
    const onUnfavorite = () => unfavoriteArticle(slug)

    const navigate = useNavigate()
    const [ deleteArticle ] = articleAPI.useDeleteArticleMutation()

    const onDeleteArticle = async (articleSlug) => {
        try {
            await deleteArticle(articleSlug).unwrap()
            navigate('/')
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const onEditArticle = () => navigate(`/articles/${slug}/edit`)

    const confirm: PopconfirmProps['onConfirm'] = () => onDeleteArticle(slug)

    useEffect(() => {
        refetch()
    }, [favoriteRes?.data?.article?.favorited, unfavoriteRes?.data?.article?.favorited])

    if(data) {
        const { title, body, description, tagList, author, createdAt, favorited, favoritesCount } = data?.article

        const tags = tagList.length ?
            tagList.map((tag, index) => <li key={index}>{tag}</li>)
            : null

        let isNotLogin = !token

        return(
            <div className={cl.articlePage}>
                <div className={cl.articleData}>
                    <div className={cl.articleTitle}>
                        <h3>{title}</h3>
                        <Rate
                            disabled={ isNotLogin }
                            character={ favorited ?
                                <HeartFilled style={{ color: '#FF0707' }}/> :
                                <HeartOutlined style={{ color: '#404040' }} />
                            }
                            onChange={favorited ? onUnfavorite : onFavorite}
                            style={{ marginRight: '6px', alignContent: 'center' }}
                            count={1}
                        />
                        <span>{ favoritesCount }</span>
                    </div>
                    <ul className={cl.tagList}>{ tags }</ul>
                    <p className={cl.articleDescription}>
                        { description }
                    </p>
                    <div className={cl.articleBody}>
                        <ReactMarkdown>{body}</ReactMarkdown>
                    </div>
                </div>
                <div className={cl.authorInfo}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span className={cl.username}>{ author.username }</span>
                            <span className={cl.date}>{ format(parseISO(createdAt), 'MMMM d, yyyy') }</span>
                        </div>
                        <img src={ author.username === username ? image : author.image } alt='avatar'/>
                    </div>
                    {
                        author.username === username ?
                            <div style={{ marginTop: 30 }} >
                                <Popconfirm title='Delete article' onConfirm={confirm} description='Are you sure to delete this article?' okText='Yes' cancelText='No' >
                                    <Button variant='outlined' color='danger' size='large' style={{ marginRight: 12 }} >
                                        Delete
                                    </Button>
                                </Popconfirm>
                                <Button onClick={onEditArticle} variant='outlined' color='green' size='large'>
                                    Edit
                                </Button>
                            </div> :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default ArticlePage