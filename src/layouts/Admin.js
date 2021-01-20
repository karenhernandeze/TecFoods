import React, {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../building_blocks/Navbars/Navbar";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import DashboardPage from "../components/Dashboard_DeliveryRestaurant/Dashboard_DeliveryRestaurant";

const useStyles = makeStyles(styles);

export default function Admin() {
    // styles
    const classes = useStyles();

    return (
        <div>
            <div>
                <Navbar/>
                <div className={classes.content}>
                    <DashboardPage/>
                </div>
            </div>
        </div>
    );
}
