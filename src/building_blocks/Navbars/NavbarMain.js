import React, { Component } from 'react'
import './NavbarMain-style.css'
import {withRouter} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "../CustomButtons/Button";

class NavbarMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id
        }
        this.restaurantItems = this.restaurantItems.bind(this);
    }

    restaurantItems(){
        // console.log(this.state.id)
        this.props.history.push(`/items/${this.state.id}`)
    }

    restaurantMain(){
        // this.props.history.push(`/restaurants`)
        this.props.history.push(`/${this.state.id}/main`)
    }

    render() {
        return(
            <div className={"head"}>
                <Toolbar className={"container"}>
                    <div className={"title"}>
                        TecFood
                    </div>
                    <div className={"titleSec"} onClick={() => this.restaurantMain()}>
                        <Button color="transparent">
                            Main
                        </Button>
                    </div>
                    <div className={"titleSec"}>
                        <Button color="transparent" onClick={() => this.restaurantItems()}>
                            Items
                        </Button>
                    </div>
                    <div className={"titleSec"} class={"b3"}>
                        <Button color="transparent">
                            Promotions
                        </Button>
                    </div>
                </Toolbar>
            </div>
        )
    }
}

export default withRouter (NavbarMain)