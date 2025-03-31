import { useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useDeleteRoute } from "../../services/RoutesService";

export default function DeleteRoute() {
    const { routeId } = useParams();
    const { deleteRoute } = useDeleteRoute();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        await deleteRoute(routeId);
        navigate('/operations');
    }

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >Route Delete Page</h1>
                <div className={localStyles.form_flex}>
                    <h3 className={globalStyles.section_heading_h3}>Are you sure you want to delete the Current Route!</h3>
                    <div className={localStyles.form_buttons_div}>
                            <button className={globalStyles.a_button_inside} onClick={deleteHandler}>YES</button>
                            <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>NO</a>
                    </div>
                </div>
            </section>
        </section>
    )}