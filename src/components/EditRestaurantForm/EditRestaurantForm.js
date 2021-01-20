import React, { Component } from 'react'
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Button from "../../building_blocks/CustomButtons/Button.js";
import Card from "../../building_blocks/Card/Card.js";
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import CardFooter from "../../building_blocks/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import ManageRestaurantService from "../../service/ManageRestaurantService";
import Navbar from "../../building_blocks/Navbars/Navbar";
import "../Form-styles.css"
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class EditRestaurantForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.id,
            name: '',
            rfc:'',
            location:'',
            availability:true,
            restManagerName:'',
            restManagerEmail:'',
            restManagerPassword: '',
            restManagerPhone: '',
            errorName: false,
            errorRFC: false,
            errorLocation: false,
            errorRestManagerName: false,
            errorRestManagerEmail: false,
            errorRestManagerPassword: false,
            errorRestManagerPhone: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.refreshRestaurants = this.refreshRestaurants.bind(this)
    }

    componentDidMount() {
        this.refreshRestaurants();
    }

    //METHOD USED TO GET INFORMATION FROM DATA BASE, RETRIEVE ALL THE INFORMATION FOR THE RESTAURANTS
    refreshRestaurants() {
        //CALL THE SERVICE
        ManageRestaurantService.retrieveRestaurantById(this.state._id)
            .then(
                response=> {this.setState({
                    name: response.data.name,
                    rfc: response.data.rfc,
                    location: response.data.location,
                    restManagerName: response.data.restManagerName,
                    restManagerEmail: response.data.restManagerEmail,
                    restManagerPassword: response.data.restManagerPassword,
                    restManagerPhone: response.data.restManagerPhone,

                })}
            )
    }

    //WHEN IN SUBMIT, CHECK IF ALL THE FIELDS ARE FIELD, IF NOT THROW AN ERROR
    onSubmit() {
        //FIELDS NOT FILLED
        if (this.state.name == "" || this.state.rfc == '' || this.state.location == '' || this.state.restManagerName == '' || this.state.restManagerEmail == "" || this.state.restManagerPassword == '' || this.state.restManagerPhone == ''){
            this.state.name == '' ? this.setState({errorName: true}) : this.setState({errorName: false})
            this.state.rfc == '' ? this.setState({errorRFC: true}) : this.setState({errorRFC: false})
            this.state.location == '' ? this.setState({errorLocation: true}) : this.setState({errorLocation: false})
            this.state.restManagerName == '' ? this.setState({errorRestManagerName: true}) : this.setState({errorRestManagerName: false})
            this.state.restManagerEmail == '' ? this.setState({errorRestManagerEmail: true}) : this.setState({errorRestManagerEmail: false})
            this.state.restManagerPassword == '' ? this.setState({errorRestManagerPassword: true}) : this.setState({errorRestManagerPassword: false})
            this.state.restManagerPhone == '' ? this.setState({errorRestManagerPhone: true}) : this.setState({errorRestManagerPhone: false})
        }else{ //FIELDS FILLED
            ManageRestaurantService.updateRestaurant(this.state._id, this.state)
                .then(
                    response => {
                        //REDIRECT TO THE 'MAIN'. TABLE WITH ALL THE RESTAURANTS.
                        this.props.history.push(`/restaurants`)
                    }
                )
        }
    }

    //HANDLE CHANGE IN TEXT FIELDS
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    //HANDLE CHANGE WHEN ICON IS CLICKED AND PASSWORD SHOULD SHOW OR NOT.
    handleClickShowPassword = event => {
        this.state.showPassword == true ?
            this.setState({
                ...this.state,
                showPassword: false
            }) :
            this.setState({
                ...this.state,
                showPassword: true
            })
    };

    render() {
        return (
            <div>
                <Navbar/>
                <div className="content">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="rose">
                                    <h4 >Edit Restaurant</h4>
                                    <p >Complete Profile</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorName}
                                                fullWidth="25px"
                                                name="name"
                                                label="Name"
                                                id="name"
                                                onChange={this.handleChange}
                                                value={this.state.name}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRFC}
                                                fullWidth="25px"
                                                name="rfc"
                                                label="RFC"
                                                id="rfc"
                                                onChange={this.handleChange}
                                                value={this.state.rfc}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorLocation}
                                                fullWidth="25px"
                                                name="location"
                                                label="Location"
                                                id="location"
                                                onChange={this.handleChange}
                                                value={this.state.location}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRestManagerName}
                                                fullWidth="25px"
                                                name="restManagerName"
                                                label="Manager Name"
                                                id="restManagerName"
                                                onChange={this.handleChange}
                                                value={this.state.restManagerName}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRestManagerEmail}
                                                fullWidth="25px"
                                                name="restManagerEmail"
                                                label="Manager Email"
                                                id="restManagerEmail"
                                                onChange={this.handleChange}
                                                value={this.state.restManagerEmail}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRestManagerPhone}
                                                fullWidth="10px"
                                                name="restManagerPhone"
                                                label="Manager Phone"
                                                id="restManagerPhone"
                                                onChange={this.handleChange}
                                                value={this.state.restManagerPhone}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Input
                                                error={this.state.errorRestManagerPassword}
                                                fullWidth="25px"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                name="restManagerPassword"
                                                placeholder="Manager Password *"
                                                id="restManagerPassword"
                                                onChange={this.handleChange}
                                                value={this.state.restManagerPassword}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {(this.state.showPassword) ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="rose" onClick={this.onSubmit}>Update</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default EditRestaurantForm