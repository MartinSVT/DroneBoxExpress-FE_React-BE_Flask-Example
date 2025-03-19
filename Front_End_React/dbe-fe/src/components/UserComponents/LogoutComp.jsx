import globalStyles from '../../App.module.css'
import localStyles from './LogoutCompCSS.module.css'
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";


export default function Logout() {
    const { userLogoutHandler } = useContext(UserContext);
    const navigate = useNavigate()

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Are you sure you want to Log Out</h1>
                <Link className={globalStyles.a_button} onClick={userLogoutHandler} to="/home">Yes</Link>
                <Link className={globalStyles.a_button} onClick={() => navigate(-1)}>No</Link>
            </section>
        </section>
    )
}