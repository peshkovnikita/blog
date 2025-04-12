import cl from "../styles/App.module.scss"
import { Rate } from "antd"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"

import { articleAPI } from "../services/articleService.ts"
import { useParams } from 'react-router'
import { format, parseISO } from "date-fns"
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
    const { slug } = useParams()

    const { data } = articleAPI.useGetArticleQuery(slug)

    if(data) {
        const { title, body, description, tagList, author, createdAt, favorited, favoritesCount } = data?.article

        const tags = tagList.length ?
            tagList.map((tag, index) => <li key={index}>{tag}</li>)
            : null

        return(
            <div className={cl.articlePage}>
                <div className={cl.articleData}>
                    <div className={cl.articleTitle}>
                        <h3>{title}</h3>
                        <Rate disabled character={ favorited ?
                            <HeartFilled style={{ color: '#FF0707' }}/> :
                            <HeartOutlined style={{ color: '#404040' }} />
                        } style={{ marginRight: '6px', alignContent: 'center' }} count={1} />
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
                    <div>
                        <span className={cl.username}>{ author.username }</span>
                        <span className={cl.date}>{ format(parseISO(createdAt), 'MMMM d, yyyy') }</span>
                    </div>
                    <img src={author.image} alt='avatar'/>
                </div>
            </div>
        )
    }
}

export default ArticlePage