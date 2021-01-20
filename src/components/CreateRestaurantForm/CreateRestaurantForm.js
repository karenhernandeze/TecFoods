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
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

class CreateRestaurantForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            rfc:'',
            location:'',
            availability:'',
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
            errorRestManagerPhone: false,
            showPassword: false
        }
        this.addRestaurantsClicked = this.addRestaurantsClicked.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
    }

    //ADD NEW RESTAURANT AND CHECK CONSTRAINTS
    addRestaurantsClicked() {
        //IF ALL THE FIELDS ARE COMPLETE CALL THE SERVICE, ELSE CHECK WHICH FIELD IS NOT FILLED AND MARK AN ERROR
        if (this.state.name == "" || this.state.rfc == '' || this.state.location == '' || this.state.restManagerName == '' || this.state.restManagerEmail == "" || this.state.restManagerPassword == '' || this.state.restManagerPhone == ''){
            this.state.name == '' ? this.setState({errorName: true}) : this.setState({errorName: false})
            this.state.rfc == '' ? this.setState({errorRFC: true}) : this.setState({errorRFC: false})
            this.state.location == '' ? this.setState({errorLocation: true}) : this.setState({errorLocation: false})
            this.state.restManagerName == '' ? this.setState({errorRestManagerName: true}) : this.setState({errorRestManagerName: false})
            this.state.restManagerEmail == '' ? this.setState({errorRestManagerEmail: true}) : this.setState({errorRestManagerEmail: false})
            this.state.restManagerPassword == '' ? this.setState({errorRestManagerPassword: true}) : this.setState({errorRestManagerPassword: false})
            this.state.restManagerPhone == '' ? this.setState({errorRestManagerPhone: true}) : this.setState({errorRestManagerPhone: false})
        }else{
            ManageRestaurantService.createNewRestaurant(this.state)
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

    //HANDLE SHOW PASSWORD ICON
    handleMouseDownPassword = event => {
        event.preventDefault();
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
                                    <h4 >Create New Restaurant</h4>
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
                                                label="Name "
                                                id="name"
                                                onChange={this.handleChange}
                                                value={this.name}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRFC}
                                                fullWidth="25px"
                                                name="rfc"
                                                label="RFC "
                                                id="rfc"
                                                onChange={this.handleChange}
                                                defaultValue={this.rfc}
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
                                                label="Location "
                                                id="location"
                                                onChange={this.handleChange}
                                                defaultValue={this.location}
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
                                                defaultValue={this.restManagerName}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                type="email"  required
                                                error={this.state.errorRestManagerEmail}
                                                fullWidth="25px"
                                                name="restManagerEmail"
                                                label="Manager Email"
                                                id="restManagerEmail"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerEmail}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorRestManagerPhone}
                                                fullWidth="10px"
                                                name="restManagerPhone"
                                                label="Manager Phone "
                                                id="restManagerPhone"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerPhone}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Input
                                                required
                                                error={this.state.errorRestManagerPassword}
                                                fullWidth="25px"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                name="restManagerPassword"
                                                placeholder="Manager Password *"
                                                id="restManagerPassword"
                                                onChange={this.handleChange}
                                                defaultValue={this.restManagerPassword}
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
                                    <Button color="rose" onClick={this.addRestaurantsClicked}>Add Restaurant</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default CreateRestaurantForm