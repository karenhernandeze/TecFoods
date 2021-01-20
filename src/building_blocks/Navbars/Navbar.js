import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
    const classes = useStyles();
    const { color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex} className={classes.title}>
                    TecFood
                </div>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};
