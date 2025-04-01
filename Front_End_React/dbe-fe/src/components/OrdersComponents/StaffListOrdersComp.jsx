import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useOrders } from "../../services/ordersService";
import OrderItem from "./OrderItemComp";

export default function StaffListOrders() {
    const { orders } = useOrders();

    return (
        <section className={globalStyles.main_section}>
            <h1 className={globalStyles.section_heading}>Orders Page</h1>
            <br/>
            <div>
                <div className={localStyles.orders_details}>
                    <section>
                        <h2 className={globalStyles.section_heading_h2}>Scheduled Orders</h2>
                            {orders ? (
                                    <>
                                    {orders
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
                                    {orders
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
    )
}
