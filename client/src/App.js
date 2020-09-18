import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {authContext} from "./context/context";
import {Navbar} from "./components/Navbar";


function App() {
    const {login, logout, token, tokenId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated);

    return (
        <authContext.Provider value={{login, logout, token, tokenId, isAuthenticated}}>
            <BrowserRouter>
                <div className='wrapper  grey lighten-4'>
                    {isAuthenticated && <Navbar/>}
                    <div className="container">
                        {routes}
                    </div>
                </div>
            </BrowserRouter>
        </authContext.Provider>

    );
}

export default App;
