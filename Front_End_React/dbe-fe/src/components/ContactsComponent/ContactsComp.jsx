import globalStyles from '../../App.module.css'

export default function Contacts() {

    return (
        <section className={globalStyles.main_section}>
            <section className={globalStyles.home_section}>
                <article className={globalStyles.news_article}>
                    <h1 className={globalStyles.section_heading}>Contact Details</h1>
                    <p>Address: Sofia, Bulgaria</p>
                    <p>PO: 1000</p>
                    <p>Phone: +359 000 00 00 00</p>
                    <p>Email: martin1987bg@gmail.com</p>
                    <h3>This website is purely for testing no actual orders can and will be delivered</h3>
                </article>
            </section>
        </section>
    )
}