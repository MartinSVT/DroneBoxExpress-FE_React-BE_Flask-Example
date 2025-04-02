import { useActionState } from "react";
import { useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'
import { useChangePass } from "../../services/userService";


export default function ChangePassword() {
    const { changePass } = useChangePass();
    const navigate = useNavigate()

    const changePasswordHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        if (values.password1 != values.password2) {
            let errorString = "Passwords fields must be the same"
            values.errorString = errorString
            return values;
        }
        const passwordData = {
            "old_password": values.oldPassword,
            "new_password1": values.password1,
            "new_password2": values.password2 
        }
        const response = await changePass(passwordData);
    
        if (response === 204){
            navigate("/editProfile")
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, changePasswordAction, isPending] = useActionState(
        changePasswordHandler, 
        {oldPassword : "", password1 : "", password2: ""}
    );

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Change Password Page</h1>
                <form className={localStyles.form_flex} action={changePasswordAction}>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="*******"
                        defaultValue={formState.oldPassword}
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

                    <p id={localStyles.errors_p}>{formState.errorString}</p>

                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Change</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>  
                    </div>
                </form>
            </section>
        </section>
    )
}