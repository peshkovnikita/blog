import cl from '../styles/App.module.scss'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import { Rate } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useAppSelector } from '../hooks/redux.ts'
import { articleAPI } from '../services/articleService.ts'
import { useEffect } from 'react'

const Article = (props) => {

    const { token, username, image } = useAppSelector(state => state.auth)
    const [ favoriteArticle, favoriteRes ] = articleAPI.useFavoriteArticleMutation()
    const [ unfavoriteArticle, unfavoriteRes ] = articleAPI.useUnfavoriteArticleMutation()

    const { slug, title, description, tagList, author, createdAt, favorited, favoritesCount, onRefetch } = props

    const onFavorite = () => favoriteArticle(slug)
    const onUnfavorite = () => unfavoriteArticle(slug)

    const tags = tagList.length ?
        tagList.map((tag, index) => <li key={index}>{tag}</li>)
        : null

    let isNotLogin = !token

    useEffect(() => {
        if (favoriteRes.isSuccess || unfavoriteRes.isSuccess) {
            onRefetch?.()
        }
    }, [favoriteRes?.data?.article?.favorited, unfavoriteRes?.data?.article?.favorited])

    return (
            <li className={cl.articleItem}>
                <div className={cl.articleData}>
                    <div className={cl.articleTitle}>
                        <Link to={`/articles/${slug}`}>
                            <h3>{title}</h3>
                        </Link>
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
                    <ul className={cl.tagList}>
                        { tags }
                    </ul>
                    <p className={cl.articleDescription}>
                        { description }
                    </p>
                </div>
                <div className={cl.authorInfo}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span className={cl.username}>{ author.username }</span>
                            <span className={cl.date}>{ format(parseISO(createdAt), 'MMMM d, yyyy') }</span>
                        </div>
                        <img src={ author.username === username ? image : author.image } alt='avatar'/>
                    </div>

                </div>
            </li>
    )
}

export default Article