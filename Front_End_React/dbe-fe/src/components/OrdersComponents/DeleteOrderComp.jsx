import { useContext } from 'react'
import { useParams, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { UserContext } from '../../contexts/userContext';
import { useDeleteOrder } from '../../services/ordersService';


export default function OrderDelete() {
    const { orderId } = useParams();
    const { isStaff } = useContext(UserContext)
    const navigate = useNavigate();
    const { deleteOrder } = useDeleteOrder();

    const deleteHandler = async () => {
        await deleteOrder(orderId);
        if (isStaff) {
            navigate('/staffOrders');
        } else {
            navigate('/orders')
        }
    }

    return(
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Order Delete Page</h1>
                <div className={localStyles.form_flex}>
                    <h2 className={globalStyles.section_heading_h2}>Are you sure you want to Delete Order No: {orderId}</h2>
                    <div className={localStyles.form_buttons_div}>
                        <button className={globalStyles.a_button_inside} onClick={deleteHandler}>Delete</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                    </div>
                </div>
            </section>
        </section>
    )}