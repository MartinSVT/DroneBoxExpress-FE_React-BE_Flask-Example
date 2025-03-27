import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'


export default function Airport({
    id,
    airport_name,
    longitude,
    latitude,
}) {

    return (
        <article className={localStyles.ops_card} >
            <p>Name: {airport_name }</p>
            <p>Longitude: {longitude }</p>
            <p>Latitude: {latitude }</p>
            <div className={localStyles.ops_div_buttons}>
                <Link className={globalStyles.a_button_inside} to={`/editAirport/${id}`}>Edit</Link>
                <Link className={globalStyles.a_button_inside} to={`/deleteAirport/${id}`}>Delete</Link>
            </div>
        </article>
    )
}