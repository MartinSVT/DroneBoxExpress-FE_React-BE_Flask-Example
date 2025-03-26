import {Link, NavLink} from 'react-router';
import localStyles from './HeaderCompCSS.module.css'
import { UserContext } from '../../contexts/userContext';
import { useContext } from 'react';


export default function Header() {
    const {username, userId, token, isStaff} = useContext(UserContext)

    return (
        <>
            <header className={localStyles.header_class}>
                <nav className={localStyles.base_nav}>
                    <div className={localStyles.general_nav}>
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/contacts">Contacts</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                    </div>
                    <div className={localStyles.logo}>
                        <Link to="/home">
                            <img className={localStyles.logo_img }src='/DBE_logo.jpg'/>
                        </Link>
                            {username ? (<p>Hello {username}</p>) : (<p>Hello Guest</p>)}
                    </div>
                    <div className={localStyles.type_nav}>
                        {(() => {
                            if (userId) {
                                if (isStaff) {
                                    return (
                                        <>
                                        <NavLink to="/operations">Operations</NavLink>
                                        <NavLink to="/addArticle">Add Article</NavLink> 
                                        <NavLink to="/staffOrders">Orders</NavLink>
                                        <NavLink to="/profile">Profile</NavLink>
                                        <NavLink to="/logout">Logout</NavLink>
                                        <NavLink id={localStyles.logo_link} to="/profile">
                                            <div className={localStyles.prof_logo}>
                                                <img src="/def_prof_pic.jpg"/>
                                            </div>
                                        </NavLink>
                                        </>
                                    )
                                } else if (!isStaff) {
                                    return (
                                        <>
                                        <NavLink to="/orders">Orders</NavLink>
                                        <NavLink to="/profile">Profile</NavLink>
                                        <NavLink to="/logout">Logout</NavLink>
                                        <NavLink id={localStyles.logo_link} to="/profile">
                                            <div className={localStyles.prof_logo}>
                                                    <img src="/def_prof_pic.jpg"/>
                                            </div>
                                        </NavLink>
                                        </>
                                    )
                                }
                            } else {
                                return(
                                    <>
                                        <NavLink to="/login">Login</NavLink>
                                        <NavLink to="/register">Register</NavLink>
                                    </>
                                )
                            }
                        })()}
                    </div>
                </nav>
            </header>
      </>
    )
}