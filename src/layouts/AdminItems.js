import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableItems from "../components/TableItems/TableItems";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle"
import NavbarMain from "../building_blocks/Navbars/NavbarMain";
import './admin-style.css'
const useStyles = makeStyles(styles);

export default function AdminItems() {
    const classes = useStyles();
    return (
        <div>
            <NavbarMain/>
            <div className={"cont"}>
                <TableItems/>
            </div>
        </div>
    );
}
