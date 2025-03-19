import globalStyles from '../../App.module.css'
import NewsArticle from "./NewsArticleComp";
import { useNewsArticles } from "../../services/newsArticlesService";
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

export default function Home() {
    const { articles } = useNewsArticles();
    
    return (
        <>
            <section className={globalStyles.main_section}>
                <section className={globalStyles.home_section}>
                <h1 className={globalStyles.section_heading}>Latest News and Updates</h1>
                    {articles ? (
                        <>
                        {articles.map(article => <NewsArticle
                                key={article.id}
                                {...article}
                                />
                            )
                        }
                        </>
                    ) : (
                        <article className={globalStyles.news_article}>
                            <h1 className={globalStyles.section_heading}> There are currently no articles</h1>
                        </article>
                    )}
                </section>
            </section>
        </>
    );
}