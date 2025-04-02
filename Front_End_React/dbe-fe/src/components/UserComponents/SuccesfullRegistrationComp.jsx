import { Link, useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'


export default function SuccsefulRegister() {
    const navigate = useNavigate();
    const {user} = useParams();

    return (
        <section className={globalStyles.main_section}>
                <section className={globalStyles.home_section}>
                <h1 className={globalStyles.section_heading}>You Have Registered Succesfully</h1>
                <article className={globalStyles.news_article}>
                    <h2>Hello {user}</h2>
                    <p>You have succesfully registerd your account, further details have been send to the email address that has been entered with your registration</p>
                <div className={localStyles.form_buttons_div}>
                    <Link className={globalStyles.a_button_inside} to="/login">Login</Link>
                    <Link className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</Link>
                </div>
                </article>
            </section>
        </section>
    )
}