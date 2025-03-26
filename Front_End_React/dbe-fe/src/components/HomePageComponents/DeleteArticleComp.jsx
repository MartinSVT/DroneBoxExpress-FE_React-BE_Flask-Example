import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import globalStyles from '../../App.module.css'
import localStyles from './ArticleCSS.module.css'
import { useDeleteNewsArticle, useNewsArticleDetails } from "../../services/newsArticlesService";
import { UserContext } from "../../contexts/userContext";

export default function DeleteArticle() {
    const {articleId} = useParams();
    const {newsArticle} = useNewsArticleDetails(articleId)
    const {deleteNewsArticle} = useDeleteNewsArticle();
    const {userId} = useContext(UserContext)
    const navigate = useNavigate();

    const deleteHandler = async () => {
        await deleteNewsArticle(articleId);
        navigate('/home');
    }

    return (
        <>
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >Delete News Article Page</h1>
                {userId === newsArticle.article_user ? (
                    <div className={localStyles.form_flex}>
                        <h2>{newsArticle.article_title}</h2>
                        <p>{newsArticle.article_content}</p>
                        <p>Last Updated At: {newsArticle.updated_date ? (<>{newsArticle.updated_date.split("T", 1)}</>) : (<>Not Updated</>)}</p>
                        <p>Created On: {newsArticle.created_date ? (<>{newsArticle.created_date.split("T", 1)}</>) : (<>Not Created</>)}</p>
                        <br/>
                        <h2 style={{color: "orange", margin: "auto"}}>Delete Confirmation</h2>
                        <div className={localStyles.form_buttons_div}>
                            <button className={globalStyles.a_button_inside} onClick={deleteHandler}>YES</button>
                            <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>NO</a>
                        </div>
                    </div>
                    ):(<h1 className={globalStyles.section_heading} >ACCESS DENIDED!!!</h1>)}
            </section>
        </section>
        </>
    );
}