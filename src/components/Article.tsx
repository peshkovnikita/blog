import cl from '../styles/App.module.scss'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

import { Rate } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import {useAppSelector} from "../hooks/redux.ts";

const Article = ({ slug, title, description, tagList, author, createdAt, favorited, favoritesCount }) => {

    const { username, image } = useAppSelector(state => state.auth)

    const tags = tagList.length ?
        tagList.map((tag, index) => <li key={index}>{tag}</li>)
        : null

    let isNotLogin = !(localStorage.getItem('token'))

    return (
            <li className={cl.articleItem}>
                <div className={cl.articleData}>
                    <div className={cl.articleTitle}>
                        <Link to={`/articles/${slug}`}>
                            <h3>{title}</h3>
                        </Link>
                        <Rate disabled={ isNotLogin } character={ favorited ?
                            <HeartFilled style={{ color: '#FF0707' }}/> :
                            <HeartOutlined style={{ color: '#404040' }} />
                        } style={{ marginRight: '6px', alignContent: 'center' }} count={1} />
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