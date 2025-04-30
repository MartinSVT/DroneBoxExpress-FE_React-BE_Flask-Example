import { useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useStaffDeleteUser } from '../../services/userService';


export default function StaffDeleteUser() {
    const { userId } = useParams();
    const { deleteUser } = useStaffDeleteUser();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        await deleteUser(userId);
        navigate('/operations');
    }
   
    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >User Delete Page</h1>
                <div className={localStyles.form_flex}>
                    <h3 className={globalStyles.section_heading_h3}>Are you sure you want to delete the Current User!</h3>
                    <h3 className={globalStyles.section_heading_h3}>This will delete all associated Orders</h3>
                    <div className={localStyles.form_buttons_div}>
                            <button className={globalStyles.a_button_inside} onClick={deleteHandler}>YES</button>
                            <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>NO</a>
                    </div>
                </div>
            </section>
        </section>
    )}