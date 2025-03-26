import globalStyles from '../../App.module.css'
import localStyles from './LoginCompCSS.module.css'
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/userContext";
import { useContext, useActionState } from "react";
import { useDeleteUser } from '../../services/userService';


export default function DeleteUser() {
    let { userLogoutHandler } = useContext(UserContext)
    const navigate = useNavigate()
    const {deleteUser} = useDeleteUser();

    const deleteHandler = async () => {
        const response = await deleteUser();

        if (response === 204){
            userLogoutHandler();
        } else {
            navigate(`/profile`);
        };
    };

    const [_, deleteAction, isPending] = useActionState(deleteHandler);

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Profile Delete Page</h1>
                <form className={localStyles.form_flex} action={deleteAction}>
                    <h2 className={globalStyles.section_heading_h2}>Are you sure you want to Delete your Profile</h2>
                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>YES</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>NO</a>
                    </div>
                </form>
            </section>
        </section>
    )
}