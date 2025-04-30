import { Link } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './OperationsCSS.module.css'
import { useAirports } from "../../services/AirportsService";
import { useCustomeRoutes } from "../../services/RoutesService";
import { useUsers } from "../../services/userService";
import Airport from "./AirportComp";
import RouteComp from "./RouteComp";
import UserComp from "./UserComp";


export default function Operations() {
    const { airports } = useAirports();
    const { routes } = useCustomeRoutes();
    const { users } = useUsers();

    return (
        <section className={globalStyles.main_section}>
            <h1 className={globalStyles.section_heading}>Operations</h1>
            <section className={localStyles.main_ops_section}>
                <div className={localStyles.ops_div}>
                    <h2 className={globalStyles.section_heading_h2} >Routes Menu</h2>
                    <Link className={globalStyles.a_button_inside} to={'/addRoute'} >Add Route</Link>
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
                    <Link className={globalStyles.a_button_inside} to={'/addAirport'} >Add Airport</Link>
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

                <div className={localStyles.ops_div}>
                    <h2 className={globalStyles.section_heading_h2} >Users Menu</h2>
                    <Link className={globalStyles.a_button_inside} to={'/addAirport'} >Add Staff User</Link>
                        {users ? (
                            <>
                            {users.map(user => <UserComp
                                    key={user.id}
                                    {...user}
                                    />
                                )
                            }
                            </>
                        ) : (
                            <div>
                                There are no Users
                            </div>
                        )}
                </div>

            </section>
        </section>
    )
}