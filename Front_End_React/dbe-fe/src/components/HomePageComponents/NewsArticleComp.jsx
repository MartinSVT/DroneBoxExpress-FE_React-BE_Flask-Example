import globalStyles from '../../App.module.css'

export default function NewsArticle({
    id,
    article_title,
    article_content,
    created_date,
    updated_date,
    article_user,
}) {

    return (
        <article className={globalStyles.news_article}>
            <h2>{ article_title }</h2>
            <div>{ article_content }</div>
            <p>Last Updated At: {updated_date ? (<>{updated_date.split("T", 1)}</>) : (<>Not Updated</>)}</p>
            <p>Created On: { created_date.split("T", 1) }</p>
                <div>
                    <a className={globalStyles.a_button_inside}>Edit Article</a>
                    <a className={globalStyles.a_button_inside}>Delete Article</a>
                </div>
        </article>
    )
}