import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useCustomeRoute } from '../../services/RoutesService';
import { useAirport } from '../../services/AirportsService';


export default function OrderItem({
    id,
    weight,
    cost,
    order_route
}) {
    const { route } = useCustomeRoute(order_route);
    const { airport : originAirport } = useAirport(route.origin_airport);
    const { airport : destinationAirport } = useAirport(route.destination_airport);

    return (
        <article className={localStyles.orders_card}>
        <p>Order No.: { id }</p>
        <p>Weight: { weight } kg</p>
        <p >From &#187; { originAirport.airport_name }</p>
        <p>To &#187; { destinationAirport.airport_name }</p>
        <p>Price: { cost.toFixed(2) } BGN</p>
        <div className={localStyles.orders_div_buttons}>
            <Link className={globalStyles.a_button_inside} to={`/orderDetails/${id}`}>Details</Link>
        </div>
        </article>
    )
}