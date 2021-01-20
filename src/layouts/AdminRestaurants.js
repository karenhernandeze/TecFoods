import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../building_blocks/Navbars/Navbar"
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import TableRestaurant from "../components/TableRestaurants/TableRestaurant";
const useStyles = makeStyles(styles);

export default function AdminRestaurants() {
    const classes = useStyles();
    return (
        <div>
            <Navbar/>
            <div className={classes.content}>
                <TableRestaurant/>
            </div>
        </div>
    );
}
