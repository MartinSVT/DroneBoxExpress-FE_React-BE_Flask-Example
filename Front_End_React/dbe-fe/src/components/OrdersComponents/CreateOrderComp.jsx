import { useState, useContext } from 'react'
import { useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OrdersCSS.module.css'
import { useCustomeRoutes, useCustomeRoute } from '../../services/RoutesService';
import { useCreateOrder } from '../../services/ordersService';
import { SelectRouteOptions } from '../../utilities/operationsPageUtils';
import { UserContext } from '../../contexts/userContext';

export default function CreateOrder() {
    const [formData, setFormData] = useState({
        route: "Select Route",
        weight: "",
        errorsRoute: "",
        errorsWeigth: "",
        errorsServer: "",
      });
    const { userId } = useContext(UserContext)
    const { routes } = useCustomeRoutes();
    const {route : currentR} = useCustomeRoute(formData.route)
    const { createOrder } = useCreateOrder();
    const navigate = useNavigate();

    const formChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const createHandler = async (event) => {
        event.preventDefault();
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
            let orderData = {
                "weight": Number(formData.weight),
                "cost": orderCost,
                "order_route": Number(formData.route),
                "order_user": userId
            }
            const response = await createOrder(orderData);
            if (response.id){
                navigate(`/orders`);
            } else {
                let serverErrorMsg = response.message;
                setFormData((prevFormData) => ({ ...prevFormData, "errorsServer": serverErrorMsg }));
            };
        }
    };

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading}>Create Order</h1>
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
                            formData.weight * currentR.cost_per_kg
                        ):(
                            ""
                        )
                        }
                        onChange={formChangeHandler}
                        placeholder="Cost in BGN"
                        readOnly
                    />
                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" className={globalStyles.a_button_inside} >Create</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                    </div>
                </form>
            </section>
        </section>
    )
}
