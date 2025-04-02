import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useOrder } from "../../services/ordersService";
import { useCustomeRoutes, useCustomeRoute } from '../../services/RoutesService';
import { useUpdateOrder } from '../../services/ordersService';
import { SelectRouteOptions } from '../../utilities/operationsPageUtils';


export default function EditOrder() {
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    const { updateOrder } = useUpdateOrder();
    const { orderId } = useParams();
    const { order } = useOrder(orderId);
    const { routes } = useCustomeRoutes();
    const [formData, setFormData] = useState({
        route: "",
        weight: "",
        errorsRoute: "",
        errorsWeigth: "",
        errorsServer: "",
        });
    useEffect(() => {
        if (order.order_route && order.weight) {
            setFormData((prevFormData) => ({ ...prevFormData, "route": order.order_route, "weight": order.weight }))
        }
    }, [order]);
    const {route : currentR} = useCustomeRoute(formData.route) 

    const formChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const createHandler = async (event) => {
        event.preventDefault();
        setDisabled(true);
        let errorMsg = "";
        setFormData((prevFormData) => ({ ...prevFormData, "errorsRoute": errorMsg }));
        setFormData((prevFormData) => ({ ...prevFormData, "errorsWeigth": errorMsg }));
        setFormData((prevFormData) => ({ ...prevFormData, "errorsServer": errorMsg }));
        let errorsFlag = false;

        if (formData.route === "Select Route") {
            let routeErrorMsg = "Please Select a Route"
            setFormData((prevFormData) => ({ ...prevFormData, "errorsRoute": routeErrorMsg }));
            errorsFlag = true
        }
        if (!formData.weight || formData.weight < 0) {
            let weigthErrorMsg = "Please Enter Positive Weight"
            setFormData((prevFormData) => ({ ...prevFormData, "errorsWeigth": weigthErrorMsg }));
            errorsFlag = true
        }
        if (!errorsFlag) {
            let orderCost = event.target.cost.value;
            const updatedOrder = {
                "weight": formData.weight,
                "cost": orderCost,
                "order_route": formData.route,
                "order_user": order.order_user,
            }
            
            const response = await updateOrder(updatedOrder, orderId);
            if (response.id){
                setDisabled(false);
                navigate(`/orders`);
            } else {
                let serverErrorMsg = response.message;
                setFormData((prevFormData) => ({ ...prevFormData, "errorsServer": serverErrorMsg }));
                setDisabled(false);
            };
        }
        setDisabled(false);
    }

    return(
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Edit Order</h1>
                <form className={localStyles.form_flex} onSubmit={createHandler}>
                    <label htmlFor="route">Route:</label>
                    <select 
                        name="route" 
                        id="route"
                        value={formData.route} 
                        onChange={formChangeHandler}
                        required
                    >
                        <option value="Select Route"> -- Select Route -- </option>
                        {routes.map((route) => {
                            return <SelectRouteOptions key={route.id} route={route} />;
                        })}
                    </select>
                    <p id={localStyles.errors_p}>{formData.errorsRoute}</p>

                    <label htmlFor="weight">Weight:</label>
                    <input 
                        type="number"
                        name="weight"
                        id="weight"
                        placeholder="Weight in kg"
                        value={formData.weight} 
                        onChange={formChangeHandler}
                        min='0.1' step='0.1'
                        
                    />
                    <p id={localStyles.errors_p}>{formData.errorsWeigth}</p>

                    <label htmlFor="cost">Cost:</label>
                    <input 
                        type="number"
                        name="cost"
                        id="cost"
                        value={formData.weight && formData.route !== "Select Route" ? (
                            formData.weight * currentR.cost_per_kg ? (formData.weight * currentR.cost_per_kg):(0)
                        ):(
                            0
                        )
                        }
                        onChange={formChangeHandler}
                        placeholder="Cost in BGN"
                        readOnly
                    />
                    <p id={localStyles.errors_p}>{formData.errorsServer}</p>

                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={disabled} className={globalStyles.a_button_inside}>Update</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                    </div>
                </form>
            </section>
        </section>
    )}