import globalStyles from '../../App.module.css'
import localStyles from './AddArticleCSS.module.css'

export default function AddArticle() {

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Create an Article</h1>
                <form className={localStyles.form_flex}>
                    <label for="article_title">News Article Title:</label>
                    <input 
                        type="text"
                        name="article_title"
                        id="article_title"
                        placeholder="Article Title..."
                        formControlName="article_title"
                    />

                    <label for="article_content">News Article Content:</label>
                    <textarea 
                        rows="10"               
                        type="text"
                        name="article_content"
                        id="article_content"
                        placeholder="Article Content..."
                        formControlName="article_content"></textarea> 

                    <div className={localStyles.form_buttons_div}>
                        <button className={globalStyles.a_button_inside}>Create</button>
                        <a className={globalStyles.a_button_inside}>Back</a>
                    </div>
                </form>
            </section>
        </section>
    )
}