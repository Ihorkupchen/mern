import React, {useContext, useEffect} from "react";
import {NavLink, useHistory, } from 'react-router-dom'
import {authContext} from "../context/context";


export const Navbar = () => {
    const history = useHistory();
    const {logout} = useContext(authContext);

    const logoutHandler = (event) => {
        console.log("Привет")

        event.preventDefault();
        logout();
        history.push('/')
    }




    return (

            <nav>
                <div className="nav-wrapper blue-grey darken-1 my-nav-wrapper">
                    <span>Logo</span>
                    <ul id="nav-mobile" className="right ">

                        <li> <NavLink to='/create' > Создать </NavLink> </li>
                        <li> <NavLink to='/links' > Ссылки </NavLink> </li>
                        <li> <a
                            href="/"
                            onClick={logoutHandler}
                        > Выйти </a></li>
                    </ul>
                </div>
            </nav>


    )
}