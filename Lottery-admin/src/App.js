import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Auth from "layouts/Auth";


function APP() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path='/auth' component={props => <Auth {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </BrowserRouter>
    )
}
export default APP