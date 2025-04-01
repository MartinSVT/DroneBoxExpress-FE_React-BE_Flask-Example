import { useContext } from 'react'
import {Link, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useCustomeRoute } from '../../services/RoutesService';
import { useAirport } from '../../services/AirportsService';
import { useOrder } from "../../services/ordersService";
import { UserContext } from '../../contexts/userContext';

export default function OrderDetails() {
    const { orderId } = useParams();
    const { order } = useOrder(orderId);
    const { route } = useCustomeRoute(order.order_route);
    const { airport : originAirport } = useAirport(route.origin_airport);
    const { airport : destinationAirport } = useAirport(route.destination_airport);
    const { username, userId, isStaff } = useContext(UserContext)

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}> Order Details </h1>
                <div className={localStyles.form_flex}>
                    {isStaff || order.order_user === userId ? (
                        <>{order.id ? (
                            <>
                            <p className={localStyles.main_order_card_item}>
                                <span>Order No.:</span>
                                <span>{ orderId }</span>
                            </p>
                            <p className={localStyles.main_order_card_item}>
                                <span>Weight:</span>
                                <span>{ order.weight }</span>
                            </p>
                            <p className={localStyles.main_order_card_item}>
                                <span>From &#187;</span>
                                <span>{ originAirport.airport_name }</span>
                            </p>
                            <p className={localStyles.main_order_card_item}>
                                <span>To &#187;</span>
                                <span>{ destinationAirport.airport_name }</span>
                            </p>
                            <p className={localStyles.main_order_card_item}>
                                <span>Price:</span>
                                <span>{ order.cost }</span>
                            </p>
                            <p className={localStyles.main_order_card_item}>
                                <span>Order Status:</span>
                                <span>{ order.order_status }</span>
                            </p>
                            {isStaff ? (
                                <>
                                <p className={localStyles.main_order_card_item}>
                                    <span>Profile:</span>
                                    <span>{ order.order_user }</span>
                                </p>
                                <div className={localStyles.form_buttons_div}>
                                    {order.order_status === "Scheduled"? (
                                        <>
                                        <Link className={globalStyles.a_button_inside} to={`/completeOrder/${orderId}`}>Complete</Link>
                                        <Link className={globalStyles.a_button_inside} to={`/deleteOrder/${orderId}`}>Delete</Link>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    <Link className={globalStyles.a_button_inside} to={"/staffOrders"}>Back</Link>
                                </div>
                                </>
                            ): (
                                <>
                                <p className={localStyles.main_order_card_item}>
                                    <span>Profile:</span>
                                    <span>{username}</span>
                                </p>
                                <div className={localStyles.form_buttons_div}>
                                    {order.order_status === "Scheduled"? (
                                        <>
                                        <Link className={globalStyles.a_button_inside} to={`/editOrder/${orderId}`}>Edit</Link>
                                        <Link className={globalStyles.a_button_inside} to={`/deleteOrder/${orderId}`}>Delete</Link>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    <Link className={globalStyles.a_button_inside} to={"/orders"}>Back</Link>
                                </div>
                                </>
                                )}
                            </>
                            ) : (
                            <div>
                                {order.message}
                            </div>
                        )}</>
                        ) : (
                        <p>You do NOT have access to this resources </p>
                    )}
                </div>
            </section>
        </section>
    )
}