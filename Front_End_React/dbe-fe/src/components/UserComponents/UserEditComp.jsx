import { useContext, useEffect, useState, useActionState } from "react";
import { Link, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'
import { UserContext } from "../../contexts/userContext";
import { useUserDetails } from '../../services/userService';
import { useUpdateUser } from '../../services/userService';


export default function UserEditComp() {
    const { token, userLoginHandler } = useContext(UserContext)
    const { getUserDetails } = useUserDetails();
    const [detailedUserData, setDetailedUserData] = useState({});
    const navigate = useNavigate()
    const {update} = useUpdateUser();

    useEffect(() => {
        async function fetchUserDetails () {
            const userDetails = await getUserDetails(token);
            setDetailedUserData(userDetails);
        };
        fetchUserDetails();
      }, []);

    const editHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let userData = {
            "username": values.username,
            "email": values.email,
            "first_name": values.firstName,
            "last_name": values.lastName
        }
        const response = await update(userData);

        if (response.id){
            userLoginHandler({
                "token": token
            })
            navigate(`/profile`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, editAction, isPending] = useActionState(
        editHandler, 
        {username: '', email: '',  firstName: '', lastName: ''}
    );

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Edit Profile</h1>
                <form className={localStyles.form_flex} action={editAction}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username..."
                    defaultValue={detailedUserData.username}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email adress..."
                    defaultValue={detailedUserData.email}
                />
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name..."
                    defaultValue={detailedUserData.first_name}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name..."
                    defaultValue={detailedUserData.last_name}
                />
                <br></br>
                <Link className={globalStyles.a_button_inside} to="/changePassword">Change Password</Link>
                <p id={localStyles.errors_p}>{formState.errorString}</p>
                <div className={localStyles.form_buttons_div}>
                    <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Save</button>
                    <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                </div>
            </form>
            </section>
        </section>
    )
}