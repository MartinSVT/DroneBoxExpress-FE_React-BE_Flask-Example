import { useActionState } from "react";
import { useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'
import { useRegister } from "../../services/userService";

export default function Register() {
    const { registerUser } = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        if (values.password1 != values.password2) {
            let errorString = "Passwords fields must be the same"
            values.errorString = errorString
            return values;
        }

        const response = await registerUser(values.username, values.email, values.firstName, values.lastName, values.password1, values.password2);
    
        if (response.username){
            navigate(`/successfulregister/${response.username}`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, registrationAction, isPending] = useActionState(
        registerHandler, 
        {username: "", email: "",  firstName: "", lastName: "", password1 : "", password2: ""}
    );

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Registration Page</h1>
                <form className={localStyles.form_flex} action={registrationAction}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username..."
                        defaultValue={formState.username}
                    />   
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email adress..."
                        defaultValue={formState.email}
                    />
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name..."
                        defaultValue={formState.firstName}
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name..."
                        defaultValue={formState.lastName}
                    />
                    <label htmlFor="password1">New Password:</label>
                    <input
                        type="password"
                        name="password1"
                        id="password1"
                        placeholder="*******"
                        defaultValue={formState.password1}
                    />
                    <label htmlFor="password2">Repeat Password:</label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="*******"
                        defaultValue={formState.password2}
                    />
                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Register</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a> 
                    </div>
                    <p id={localStyles.errors_p}>{formState.errorString}</p>
                </form>
            </section>
        </section>
    );
}