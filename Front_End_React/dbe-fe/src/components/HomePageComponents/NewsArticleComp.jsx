import { Link } from 'react-router'
import globalStyles from '../../App.module.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

export default function NewsArticle({
    id,
    article_title,
    article_content,
    created_date,
    updated_date,
    article_user,
}) {
    const {username, userId, token, isStaff} = useContext(UserContext)

    return (
        <article className={globalStyles.news_article}>
            <h2>{ article_title }</h2>
            <div>{ article_content }</div>
            <p>Last Updated At: {updated_date ? (<>{updated_date.split("T", 1)}</>) : (<>Not Updated</>)}</p>
            <p>Created On: { created_date.split("T", 1) }</p>
                {article_user == userId ? (
                    <div>
                        <Link to={`/editArticle/${id}`} className={globalStyles.a_button_inside}>Edit Article</Link>
                        <Link to={`/deleteArticle/${id}`} className={globalStyles.a_button_inside}>Delete Article</Link>
                    </div>
                ) : <></>}
        </article>
    )
}