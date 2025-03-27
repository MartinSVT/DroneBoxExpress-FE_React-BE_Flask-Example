import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useAirport } from "../../services/AirportsService";


export default function RouteComp({
    id,
    cost_per_kg,
    origin_airport,
    destination_airport,
}) {
    const { airport : airport1 } = useAirport(origin_airport);
    const { airport : airport2 } = useAirport(destination_airport);

    return (
        <article className={localStyles.ops_card} >
            <p>From &#187; {airport1.airport_name}</p>
            <p>To &#187; {airport2.airport_name}</p>
            <p>Cost per kilogram: {cost_per_kg} BGN</p>
            <div className={localStyles.ops_div_buttons}>
                <Link className={globalStyles.a_button_inside} to={`/editRoute/${id}`}>Edit</Link>
                <Link className={globalStyles.a_button_inside} to={`/deleteRoute/${id}`}>Delete</Link>
            </div>
        </article>
    )
}