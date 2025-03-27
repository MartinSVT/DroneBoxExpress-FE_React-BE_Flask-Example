import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useAirports } from "../../services/AirportsService";
import { useCustomeRoutes } from "../../services/RoutesService";
import Airport from "./AirportComp";
import RouteComp from "./RouteComp";



export default function Operations() {
    const { airports } = useAirports();
    const { routes } = useCustomeRoutes();

    return (
        <section className={globalStyles.main_section}>
            <h1 className={globalStyles.section_heading}>Operations</h1>
            <section className={localStyles.main_ops_section}>
                <div className={localStyles.ops_div}>
                    <h2 className={globalStyles.section_heading_h2} >Routes Menu</h2>
                    <Link className={globalStyles.a_button_inside} to={'/AddRoute'} >Add Route</Link>
                    {routes ? (
                            <>
                            {routes.map(route => <RouteComp
                                    key={route.id}
                                    {...route}
                                    />
                                )
                            }
                            </>
                        ) : (
                            <div>
                                There are no Routes
                            </div>
                        )}
                </div>
                <div className={localStyles.ops_div}>
                    <h2 className={globalStyles.section_heading_h2} >Airports Menu</h2>
                    <Link className={globalStyles.a_button_inside} to={'/AddAirport'} >Add Airport</Link>
                        {airports ? (
                            <>
                            {airports.map(airport => <Airport
                                    key={airport.id}
                                    {...airport}
                                    />
                                )
                            }
                            </>
                        ) : (
                            <div>
                                There are no Airports
                            </div>
                        )}
                </div>
            </section>
        </section>
    )
}