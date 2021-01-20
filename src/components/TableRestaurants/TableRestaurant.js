import React, {Component} from "react";
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Table from "../../building_blocks/Table/Table.js";
import Card from "../../building_blocks/Card/Card"
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import "./TableRestaurant-style.css"
import Button from "../../building_blocks/CustomButtons/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from 'react-router-dom';
import ManageRestaurantService from "../../service/ManageRestaurantService";
import Snackbar from "../../building_blocks/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";

class TableRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //ARRAY OF OBJECTS TYPE RESTAURANT
            restaurants: [],
            restaurant: {
                _id:'',
                name: '',
                rfc:'',
                location:'',
                availability:'',
                restManagerName:'',
                restManagerEmail:'',
                restManagerPassword: '',
                restManagerPhone: '',
                tc: false
            },
            checked: false,
            message: null
        }
        this.addNewRestaurant = this.addNewRestaurant.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshRestaurants();
    }

    //METHOD USED TO GET INFORMATION FROM DATA BASE, RETRIEVE ALL THE RESTAURANT INFO
    refreshRestaurants() {
        ManageRestaurantService.retrieveAllRestaurants()
            .then(
                response => {
                    this.setState({ restaurants: response.data })
                    this.setState( restaurant =>
                    {
                        //IF 'AVAILABILITY' == TRUE => CHECK CHECKBOX
                        if (restaurant.availability == true){
                            this.setState({checked: true})
                        } // ELSE UNCHECK IT AND SET STATE TO FALSE
                        else if (restaurant.availability == false) {
                            this.setState({checked: false})
                        }
                    })
                }
            )
    }

    //REDIRECT TO RESTAURANT CREATE FORM
    addNewRestaurant() {
        this.props.history.push(`/restaurant`)
    }

    //HANDLE CHANGE FOR THE CHECKBOXES FOR 'AVAILABILITY' STATUS.
    handleChange (restaurant) {
        if (restaurant.availability == true){
            ManageRestaurantService.disableAvailability(restaurant._id).then(
                response => {
                    //SHOW NOTIFICATION ABOUT AVAILABILITY UPDATE
                    this.setState({ tc: true, message: `Restaurant:  ${restaurant.name} , was successfully disabled` })
                    window.setTimeout(this.handleClose, 5000);
                    //REFRESH CHECKBOX CHECKED
                    this.refreshRestaurants()
                }
            )
        } else if (restaurant.availability == false){
            ManageRestaurantService.enableAvailability(restaurant._id).then(
                response => {
                    //SHOW NOTIFICATION ABOUT AVAILABILITY UPDATE
                    this.setState({tc: true, message: `\`Restaurant:  ${restaurant.name} , was successfully enabled` })
                    window.setTimeout(this.handleClose, 5000);
                    //REFRESH CHECKBOX CHECKED
                    this.refreshRestaurants()
                }
            )
        }
    }

    //IF CLICKED IN THE CROSS, THE NOTIFICATION WILL CLOSE
    handleClose = event => {
        this.setState({
            tc: false
        });
    };

    //REDIRECT TO THE EDIT FORM
    updateRestaurant(id) {
        this.props.history.push(`/restaurant/${id}`)
    }

    render(){
        return(
            <GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        {/*SNACKBAR FOR THE NOTIFICATION*/}
                        <Snackbar
                            place="tc"
                            color="info"
                            icon={AddAlert}
                            message={this.state.message}
                            open={this.state.tc}
                            close
                        />
                    </GridItem>
                </GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose">
                            <h4 className={"cardTitleWhite"}>RESTAURANTS DASHBOARD</h4>
                            <p className={"cardCategoryWhite"}>
                                Restaurant:
                            </p>
                        </CardHeader>
                        <CardBody>
                            {/* TABLES WITH ALL THE FIELDS OF THE RESTAURANTS */}
                            <Table
                                tableHeaderColor="rose"
                                tableHead={["Name", "Location", "RFC", "Manager Name", "Manager Email", "Manager Phone", "Availability", "Edit"]}
                                tableData={
                                    this.state.restaurants.map(
                                        restaurant =>
                                            [
                                                [restaurant.name],
                                                [restaurant.location],
                                                [restaurant.rfc],
                                                [restaurant.restManagerName],
                                                [restaurant.restManagerEmail],
                                                [restaurant.restManagerPhone],
                                                [
                                                    //CHECKBOX FOR AVAILABILITY AND HANDLE CHANGE WHEN CLICKED AND UNCLICKED
                                                    <FormControlLabel
                                                        onClick={this.showNotification}
                                                        control={<Checkbox color={"default"} checked={restaurant.availability} onChange={ () => {this.handleChange(restaurant)}}/>}
                                                        labelPlacement="top"
                                                    />
                                                ],
                                                [<Button color={"warning"} onClick={() => this.updateRestaurant(restaurant._id)}> Edit </Button>]
                                            ],
                                    )}
                            />
                        </CardBody>
                    </Card>
                    <Button color="rose" onClick={this.addNewRestaurant}> Add New Restaurant </Button>
                </GridItem>
            </GridContainer>
        )
    }
}

export default withRouter (TableRestaurant)
