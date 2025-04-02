import globalStyles from '../../App.module.css'


export default function AboutUs() {

    return (
        <>
        <section className={globalStyles.main_section}>
            <section className={globalStyles.home_section}>
                <article className={globalStyles.news_article}>
                    <h1 className={globalStyles.section_heading} >Drone Box Express</h1>
                    <p>Drone Box Express Ltd. was founded in 2023 in Bulgaria, and it is a delivery company aimed at delivering cargo worldwide between designated airports
                    and providing unmanned cargo delivery capability to everyone everywhere</p>

                    <h1 className={globalStyles.section_heading}>Disclaimer</h1>
                    <p>
                        Drone Box Express Web application is of an imaginary company for delivering cargo packages using drones and between routes,
                        the idea is that the web application has multiple functionalities and acts as both customer platform and staff/operational platform.
                    </p>
                    <p>
                        Depending on the profile type that is currently logged in, Drone Box Express web application either acts as an operational platform
                        to add new airports, drones, routes, articles and also completes and cancels automatically generated flights
                        or act as a customer platform where information can be viewed and individual orders can be placed, modified and deleted.
                    </p>
                    <p>
                        The web application notifies the user for changes to his/her orders status via email.
                        The application also keep track of total profits revenue and expenses, where once a flight is completed its orders prices are added to the company revenue
                        and the flight expenses are calculated using the distance, fuel burn rate, fuel price, operational cost of the selected airports drones etc…
                        once calculated the total profit revenue and expenses are help in the DB for statistical purposes.
                    </p>
                    <p>Founded: 2023</p>
                    <p>Country of Origin: Bulgaria</p>
                    <h3>This website is purely for testing no actual orders can and will be delivered</h3>
                </article>
            </section>
        </section>
        </>
    )
}