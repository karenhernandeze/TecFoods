import React, { Component } from 'react';
import Admin from "./layouts/Admin";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminItems from "./layouts/AdminItems";
import "./assets/css/material-dashboard-react.css"
import CreateItemForm from "./components/CreateItemForm/CreateItemForm";
import EditItemForm from "./components/EditItemForm/EditItemForm";
import AdminRestaurants from "./layouts/AdminRestaurants";
import AdminDeliveryOnLocation from "./layouts/AdminDeliveryOnLocation";
import CreateRestaurantForm from "./components/CreateRestaurantForm/CreateRestaurantForm";
import EditRestaurantForm from "./components/EditRestaurantForm/EditRestaurantForm";
import AdminMain from "./layouts/AdminMain";
import AdminEditMain from "./layouts/AdminEditMain";
import LoginForm from "./components/LoginForm/login-form";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/*LOGIN*/}
                    <Route path="/" exact component={LoginForm} />
                    {/*RETRIEVE ORDERS BY RESTAURANT ID*/}
                    <Route path="/orders/:id" exact component={Admin} />
                    {/*RETRIEVE ITEMS BY RESTAURANT ID */}
                    <Route path="/items/:id" exact component={AdminItems} />
                    {/*CREATE FORM FOR ITEMS*/}
                    <Route path="/item/:restId" exact component={CreateItemForm}/>
                    {/*EDIT FORM FOR ITEMS*/}
                    <Route path="/item/:restId/edit/:id" exact component={EditItemForm}/>
                    {/*RETRIEVE ALL RESTAURANTS*/}
                    <Route path="/restaurants" exact component={AdminRestaurants} />
                    {/*CREAT FORM FOR RESTAURANTS*/}
                    <Route path="/restaurant" exact component={CreateRestaurantForm} />
                    {/*EDIT FORM FOR RESTAURANTS*/}
                    <Route path="/restaurant/:id" exact component={EditRestaurantForm} />
                    {/*DELIVER ON LOCATION FORM*/}
                    <Route path="/order/dol/:id" exact component={AdminDeliveryOnLocation} />
                    {/*MAIN FORM*/}
                    <Route path="/:id/main" exact component={AdminMain} />
                    {/*EDIT MAIN FORM*/}
                    <Route path="/:id/main/e/" exact component={AdminEditMain} />
                </Switch>
            </Router>
        )
    }
}
export default App