import React, {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import NavbarMain from "../building_blocks/Navbars/NavbarMain";
import Navbar from "../building_blocks/Navbars/Navbar";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import EditMainForm from "../components/EmployeesEditMain/EditMainForm";

const useStyles = makeStyles(styles);

export default function AdminMain() {
    // styles
    const classes = useStyles();

    return (
        <div>
            <div>
                <NavbarMain/>
            </div>
            <EditMainForm/>
        </div>
    );
}
