import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'
import { useLogin } from "../../services/userService";
import { UserContext } from "../../contexts/userContext";


export default function Login() {
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();
    const navigate = useNavigate();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        const authResponse = await login(values.username, values.password);
    
        if (authResponse.token){
            userLoginHandler(authResponse);
            navigate('/home');
        } else {
            return authResponse.message;
        };
    };

    const [errorMsg, loginAction, isPending] = useActionState(loginHandler);

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Login Page</h1>
                <form className={localStyles.form_flex} action={loginAction}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Type Username" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="***********" required />
                    
                    <p id={localStyles.errors_p}>{errorMsg}</p>

                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Log in</button>
                        <Link className={globalStyles.a_button_inside} to="/register">Register</Link>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>  
                    </div>
                </form>
            </section>
        </section>
    );
}