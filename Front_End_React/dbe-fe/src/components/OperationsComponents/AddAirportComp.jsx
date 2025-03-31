import { useActionState } from 'react'
import { useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useCreateAirport } from "../../services/AirportsService";

export default function AddAirport() {
    const navigate = useNavigate();
    const { createAirport } = useCreateAirport();

    const createHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let airportData = {
            "airport_name": values.name,
            "longitude": values.lon,
            "latitude": values.lat,
        }
        const response = await createAirport(airportData);
    
        if (response.id){
            navigate(`/operations`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, createAction, isPending] = useActionState(
        createHandler, 
        {name: "", lon: "", lat: ""}
    );

    return (
        <section className={globalStyles.main_section}>
            <section className={localStyles.form_section}>
                <h1 className={globalStyles.section_heading} >Add New Airport</h1>
                <form className={localStyles.form_flex} action={createAction}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name..."
                        defaultValue={formState.name}
                        maxLength={30}
                        required
                    />
                    <label htmlFor="lon">Longitude:</label>
                    <input 
                        type="text"
                        name="lon"
                        id="lon"
                        placeholder="Longitude..."
                        defaultValue={formState.lon}
                        required
                    />
                    <label htmlFor="lat">Latitude:</label>
                    <input 
                        type="text"
                        name="lat"
                        id="lat"
                        placeholder="Latitude..."
                        defaultValue={formState.lat}
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