import { useParams, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useOrder } from "../../services/ordersService";
import { useUpdateOrder } from '../../services/ordersService';


export default function CompleteOrder() {
    const { orderId } = useParams();
    const { order } = useOrder(orderId);
    const navigate = useNavigate();
    const { updateOrder } = useUpdateOrder();

    const completeHandler = async () => {
        const updatedOrder = {
            "weight": order.weight,
            "cost": order.cost,
            "order_status": "Completed",
            "order_route": order.order_route,
            "order_user": order.order_user,
        }
        await updateOrder(updatedOrder, orderId);
        navigate('/staffOrders');
    }

    return(
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Complete Order Page</h1>
                <div className={localStyles.form_flex}>
                    <h2 className={globalStyles.section_heading_h2}>Are you sure you want to Complete Order No: {orderId}</h2>
                    <div className={localStyles.form_buttons_div}>
                        <button className={globalStyles.a_button_inside} onClick={completeHandler}>YES</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>NO</a>
                    </div>
                </div>
            </section>
        </section>
    )}