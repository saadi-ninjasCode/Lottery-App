import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Auth from "./layouts/Auth";
import PrivateRotue from './views/PrivateRoute'


function APP() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRotue path="/admin"
                    component={props => <AdminLayout {...props} />} />
                <Route path='/auth' component={props => <Auth {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </BrowserRouter>
    )
}
export default APP