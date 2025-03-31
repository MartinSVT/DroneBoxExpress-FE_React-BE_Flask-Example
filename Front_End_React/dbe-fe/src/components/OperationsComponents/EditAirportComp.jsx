import { useActionState } from 'react'
import { useNavigate, useParams } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useUpdateAirport, useAirport } from "../../services/AirportsService";


export default function EditAirport() {
    const { airportId } = useParams();
    const { airport } = useAirport(airportId);
    const { updateAirport } = useUpdateAirport();
    const navigate = useNavigate();

    const editHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        let airportData = {
            "airport_name": values.name,
            "longitude": values.lon,
            "latitude": values.lat,
        }
        const response = await updateAirport(airportData, airportId);
    
        if (response.id){
            navigate(`/operations`);
        } else {
            // TODO filter Server Errors for better handling
            values.errorString = response.message;
            return values
        };
    };

    const [formState, editAction, isPending] = useActionState(
        editHandler, 
        {name: airport.airport_name, lon: airport.longitude, lat: airport.latitude}
    );

    return (
                <section className={globalStyles.main_section}>
                    <section className={localStyles.form_section}>
                        <h1 className={globalStyles.section_heading} >Edit Airport</h1>
                        <form className={localStyles.form_flex} action={editAction}>
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name..."
                                defaultValue={airport.airport_name}
                                maxLength={30}
                                required
                            />
                            <label htmlFor="lon">Longitude:</label>
                            <input 
                                type="text"
                                name="lon"
                                id="lon"
                                placeholder="Longitude..."
                                defaultValue={airport.longitude}
                                required
                            />
                            <label htmlFor="lat">Latitude:</label>
                            <input 
                                type="text"
                                name="lat"
                                id="lat"
                                placeholder="Latitude..."
                                defaultValue={airport.latitude}
                                required
                            />
        
                            <p id={localStyles.errors_p}>{formState.errorString}</p>
        
                            <div className={localStyles.form_buttons_div}>
                                <button type="submit" disabled={isPending} className={globalStyles.a_button_inside}>Edit</button>
                                <a className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</a>
                            </div>
                        </form>
                    </section>
                </section>
    )
}