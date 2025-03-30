import cl from '../styles/App.module.scss'
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const Article = ({ title, body: articleText, tagList, author, createdAt, favorited, favoritesCount }) => {
    const tags = tagList.length ?
        tagList.map((tag, index) => <li key={index}>{tag[index]}</li>)
        : null

    const formatText = (str) => {
        if(str.length <= 299) return str
        return `${str.slice(0, 277)}...`
    }

    return (
            <li className={cl.articleItem}>
                <div className={cl.articleData}>
                    <div className={cl.articleTitle}>
                        <h3>{title}</h3>
                        <Rate character={ favorited ?
                            <HeartFilled style={{ color: '#FF0707' }}/> :
                            <HeartOutlined style={{ color: '#404040' }} />
                        } style={{ marginRight: '6px', alignContent: 'center' }} count={1} />
                        <span>{ favoritesCount }</span>
                    </div>
                    <ul className={cl.tagList}>{ tags }</ul>
                    <p>{ formatText(articleText) }</p>
                </div>
                <div className={cl.authorInfo}>
                    <div>
                        <span className={cl.username}>{ author.username }</span>
                        <span className={cl.date}>{ format(parseISO(createdAt), 'MMMM d, yyyy') }</span>
                    </div>
                    <img src={author.image} alt='avatar'/>
                </div>
            </li>
    )
}

export default Article