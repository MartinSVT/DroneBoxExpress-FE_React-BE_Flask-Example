import { useContext } from 'react'
import { Link, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useOrders } from "../../services/ordersService";
import OrderItem from "./OrderItemComp";
import { UserContext } from '../../contexts/userContext';

export default function ListOrders() {
    // To add server filter option to get orders by id
    const { userId } = useContext(UserContext)
    const { orders } = useOrders();
    const userOrders = orders.filter((order) => order.order_user === userId)
    const navigate = useNavigate();

    return (
        <section className={globalStyles.main_section}>
            <h1 className={globalStyles.section_heading}>Orders Page</h1>
            <section className={localStyles.orders_section}>
                <div className={localStyles.orders_navigation}>
                    <Link className={globalStyles.a_button} id="create-order-btn" to={"/addOrder"}>Create Order</Link>
                    <a className={globalStyles.a_button} onClick={() => navigate(-1)}>Back</a>
                </div>
                <div className={localStyles.orders_info}>  
                    <div className={localStyles.orders_details}>
                        <section>
                            <h2 className={globalStyles.section_heading_h2}>Scheduled Orders</h2>
                                {orders ? (
                                        <>
                                        {userOrders
                                        .filter((order) => order.order_status === "Scheduled")
                                        .map(order => <OrderItem key={order.id} {...order}/>)
                                        }
                                        </>
                                    ) : (
                                        <div>
                                            There are no Scheduled Orders
                                        </div>
                                    )}
                        </section>
                        <section>
                            <h2 className={globalStyles.section_heading_h2}>Completed Orders</h2>
                            {orders ? (
                                        <>
                                        {userOrders
                                        .filter((order) => order.order_status === "Completed")
                                        .map(order => <OrderItem key={order.id} {...order}/>)
                                        }
                                        </>
                                    ) : (
                                        <div>
                                            There are no Completed Orders
                                        </div>
                                    )}
                        </section>
                    </div>
                </div>
            </section>
        </section>
    )
}