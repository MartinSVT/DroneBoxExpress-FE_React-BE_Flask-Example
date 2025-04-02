import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import globalStyles from '../../App.module.css'
import localStyles from './ProfileCompCSS.module.css'
import { UserContext } from "../../contexts/userContext";
import { useUserDetails } from '../../services/userService';


export default function Profile() {
    const {username, token, isStaff} = useContext(UserContext)
    const { getUserDetails } = useUserDetails();
    const [detailedUserData, setDetailedUserData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserDetails () {
            const userDetails = await getUserDetails(token);
            setDetailedUserData(userDetails);
        };
        fetchUserDetails();
      }, []);

    return (
        <section className={globalStyles.main_section}>
            <section className={globalStyles.home_section}>
                <h1 className={globalStyles.section_heading}>Profile Details</h1>
                <div className={localStyles.profile_div}>
                    <img src="/def_prof_pic.jpg"/>
                    <div className={localStyles.profile_data_div}>
                        <p>Username: {username}</p>
                        <p>First Name: {detailedUserData.first_name}</p>
                        <p>Last Name: {detailedUserData.last_name}</p>
                        <p>Email: {detailedUserData.email}</p>
                        {isStaff ? (
                            <p>Profile Type: Staff</p>
                        ):(
                            <p>Profile Type: Customer</p>
                        )}
                        <div className={localStyles.form_buttons_div}>
                            <Link to="/editProfile" className={globalStyles.a_button_inside} >Edit</Link>
                            <Link to="/deleteProfile" className={globalStyles.a_button_inside} >Delete</Link>
                            <Link className={globalStyles.a_button_inside} onClick={() => navigate(-1)}>Back</Link>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}