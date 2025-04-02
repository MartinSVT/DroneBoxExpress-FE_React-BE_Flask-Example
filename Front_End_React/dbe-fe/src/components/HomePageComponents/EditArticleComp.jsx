import { useContext, useActionState } from "react";
import { useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './ArticleCSS.module.css'
import { UserContext } from "../../contexts/userContext";
import { useNewsArticleDetails, useUpdateNewsArticle } from "../../services/newsArticlesService";


export default function EditArticle() {
    const {articleId} = useParams();
    const {newsArticle} = useNewsArticleDetails(articleId);
    const {update} = useUpdateNewsArticle();
    const {userId} = useContext(UserContext);
    const navigate = useNavigate();

    const editHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let articleData = {
            "article_title": values.article_title,
            "article_content": values.article_content,
        }
        const response = await update(articleData, articleId);
    
        if (response.id){
            navigate(`/home`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, editAction, isPending] = useActionState(
        editHandler, 
        {article_title: newsArticle.article_title, article_content: newsArticle.article_content}
    );

    return (
        <>
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >Edit an Article</h1>
                {userId === newsArticle.article_user ? (
                    <form className={localStyles.form_flex} action={editAction}>
                        <label htmlFor="article_title">News Article Title:</label>
                        <input 
                            type="text"
                            name="article_title"
                            id="article_title"
                            placeholder="Article Title..."
                            defaultValue={newsArticle.article_title}
                            required
                            maxLength={30}
                        />
    
                        <label htmlFor="article_content">News Article Content:</label>
                        <textarea 
                            rows="10"               
                            type="text"
                            name="article_content"
                            id="article_content"
                            placeholder="Article Content..."
                            defaultValue={newsArticle.article_content}
                            required
                        ></textarea> 
                            
                        <p id={localStyles.errors_p}>{formState.errorString}</p>
    
                        <div className={localStyles.form_buttons_div}>
                            <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Create</button>
                            <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                        </div>
                    </form>
                ):(<h1 className={globalStyles.section_heading} >ACCESS DENIDED!!!</h1>)}
            </section>
        </section>
        </>
    );
}