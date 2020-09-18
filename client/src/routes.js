import React from "react";
import {Redirect, Switch, Route}  from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {DetailPage} from "./pages/DetailPage";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path='/create' exact>
                    <CreatePage/>
                </Route>
                <Route path='/detail/:id' >
                    <DetailPage/>
                </Route>
                <Route path='/links' exact>
                    <LinksPage/>
                </Route>
                <Redirect to='/create'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )


}