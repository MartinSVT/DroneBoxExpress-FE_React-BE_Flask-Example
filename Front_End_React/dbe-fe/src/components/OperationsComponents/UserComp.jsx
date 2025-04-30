import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'


export default function UserComp({
    id,
    username,
    email,
    first_name,
    last_name,
    is_staff,
}) {

    return (
        <article className={localStyles.ops_card} >
            <p>Username: { username }</p>
            <p>Email: { email }</p>
            <p>Staff Status: { is_staff ? 'True': "False" }</p>
            <div className={localStyles.ops_div_buttons}>
                <Link className={globalStyles.a_button_inside} to={`/editAirport/${id}`}>Edit</Link>
                <Link className={globalStyles.a_button_inside} to={`/deleteUser/${id}`}>Delete</Link>
            </div>
        </article>
    )
}