import { useActionState } from 'react'
import { useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './ArticleCSS.module.css'
import { useCreateNewsArticle } from '../../services/newsArticlesService';

export default function AddArticle() {
    const { create } = useCreateNewsArticle();
    const navigate = useNavigate();

    const createHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let articleData = {
            "article_title": values.article_title,
            "article_content": values.article_content,
        }
        const response = await create(articleData);
    
        if (response.id){
            navigate(`/home`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, createAction, isPending] = useActionState(
        createHandler, 
        {article_title: "", article_content: ""}
    );

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Create an Article</h1>
                <form className={localStyles.form_flex} action={createAction}>
                    <label htmlFor="article_title">News Article Title:</label>
                    <input 
                        type="text"
                        name="article_title"
                        id="article_title"
                        placeholder="Article Title..."
                        defaultValue={formState.article_title}
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
                        defaultValue={formState.article_content}
                        required
                    ></textarea> 
                        

                    <p id={localStyles.errors_p}>{formState.errorString}</p>

                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Create</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                    </div>
                </form>
            </section>
        </section>
    )
}