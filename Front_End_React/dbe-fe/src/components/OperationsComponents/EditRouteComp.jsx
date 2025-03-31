import { useActionState } from 'react'
import { useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useAirports } from "../../services/AirportsService";
import { useCustomeRoute, useUpdateRoute } from '../../services/RoutesService';
import { SelectAirportOptions, getAirportById, operationsErrorHandler } from '../../utilities/operationsPageUtils';

export default function EditRoute() {
    const { routeId } = useParams();
    const { route } = useCustomeRoute(routeId);
    const { updateRoute } = useUpdateRoute();
    const { airports } = useAirports();
    const navigate = useNavigate();

    const editHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let errorCheckedValues = operationsErrorHandler(values);

        if (errorCheckedValues) {
            return errorCheckedValues;
        }
        let routeData = {
            "origin_airport": Number(values.originAirport),
            "destination_airport": Number(values.destinationAirport),
            "cost_per_kg": Number(values.costPerKg),
        }
        const response = await updateRoute(routeData, routeId);
        if (response.id){
            navigate(`/operations`);
        } else {
            values.errorString = response.message;
            return values
        };
    };

    const [formState, editAction, isPending] = useActionState(
        editHandler, 
        {originAirport: route.origin_airport, destinationAirport: route.destination_airport, costPerKg: route.cost_per_kg}
    );


    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >Edit Route</h1>
                <form className={localStyles.form_flex} action={editAction}>
                    <label htmlFor="originAirport">Origin Airport:</label>
                    <select 
                        name="originAirport" 
                        id="originAirport" 
                    >
                        {route.origin_airport ? (
                            <option value={route.origin_airport}>
                                {getAirportById(route.origin_airport, airports)}
                            </option>
                        ) : (
                            <option value="Select Airport"> -- Select Airport -- </option>
                        )}
                        {airports.map((airport) => {
                            return <SelectAirportOptions key={airport.id} state={airport} />;
                        })}
                    </select>

                    <label htmlFor="destinationAirport">Destination Airport:</label>
                    <select 
                        name="destinationAirport" 
                        id="destinationAirport" 
                    >
                        {route.destination_airport ? (
                            <option value={route.destination_airport}>
                                {getAirportById(route.destination_airport, airports)}
                            </option>
                        ) : (
                            <option value="Select Airport"> -- Select Airport -- </option>
                        )}
                        {airports.map((airport) => {
                            return <SelectAirportOptions key={airport.id} state={airport} />;
                        })}
                    </select>

                    <label htmlFor="costPerKg">Cost Per Kilogram:</label>
                    <input 
                        type="text"
                        pattern="(?:0|[1-9]\d*)(?:\.\d+)?"
                        name="costPerKg"
                        id="costPerKg"
                        placeholder="Only Positive Numbers"
                        inputMode="decimal"
                        autoComplete="off"
                        defaultValue={route.cost_per_kg}
                        required
                    />

                    <p id={localStyles.errors_p}>{formState.errorString}</p>

                    <div className={localStyles.form_buttons_div}>
                        <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Add</button>
                        <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                    </div>
                </form>
            </section>
        </section>
    )
}