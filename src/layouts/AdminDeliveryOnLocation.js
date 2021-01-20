import React, {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../building_blocks/Navbars/Navbar";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import DeliveryOnLocation from "../components/DeliveryOnLocation/DeliveryOnLocation";

const useStyles = makeStyles(styles);

export default function AdminDeliveryOnLocation() {
    // styles
    const classes = useStyles();
//NOT FINISHED YET
    return (
        <div>
            <div>
                <Navbar/>
                <div className={classes.content}>
                    <DeliveryOnLocation/>
                </div>
            </div>
        </div>
    );
}
