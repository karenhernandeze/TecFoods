import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import GridContainer from "../../building_blocks/Grid/GridContainer";
import GridItem from "../../building_blocks/Grid/GridItem";
import Card from "../../building_blocks/Card/Card";
import CardBody from "../../building_blocks/Card/CardBody";
import './login-form-style.css'
import CardFooter from "../../building_blocks/Card/CardFooter";
import Button from "../../building_blocks/CustomButtons/Button";
import CardHeader from "../../building_blocks/Card/CardHeader";
import Navbar from "../../building_blocks/Navbars/Navbar"
import ManageLoginService from "../../service/ManageLoginService";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            role:'',
            credentials:{
                email: '',
                password: ''
            },
            error: false,
            showPassword: false

        }
        this.login = this.login.bind(this);
    }

    //CREATE AN ASYNC FUNCTION, TO RETRIEVE FIRST THE ITEMS AND VERIFY CREDENTIALS
    //FOLLOWING REDIRECT THE ROUTE DEPENDING THE ROLE EACH EMPLOYEE HAS.
    login = async () => {
        await ManageLoginService.validateCredentials(this.state.credentials).then(
            response =>{
                this.setState({
                    restaurantId: response.data[0].restaurantId,
                    role: response.data[0].role
                })
                console.log(this.state)
            }

        ).catch(err =>{
            this.setState({
                error: true
            })
        })

        if(this.state.role === "Administrator"){
            this.props.history.push(`/restaurants`)
        } else if (this.state.role === "Manager"){
            this.props.history.push(`/${this.state.restaurantId}/main`)
        } else if (this.state.role === "Cashier"){
            this.props.history.push(`/orders/${this.state.restaurantId}`)
        } else if (this.state.role === "Courier"){
            this.props.history.push(`/order/dol/${this.state.restaurantId}`)
        } else {
            this.props.history.push(`/`)
        }
    }

    //HANDLE THE CHANGES OF THE INPUTS OF CREDENTIALS: ONLY EMAIL AND PASSWORD
    handleChange = event => {
        const { value, name } = event.target;
        const {credentials} = this.state;
        credentials[name] = value;
        this.setState({
            ...this.state,
            credentials
        });
    };

    //HANDLE ICON OF SHOW PASSWORD
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
        return(
            <div>
                <Navbar/>
                <GridContainer class="center" className="dialog">
                    <GridItem >
                        <Card className={"dialog"}  >
                            <CardHeader className={"header"} color="info">
                            </CardHeader>
                            <CardBody >
                                <div><br/> </div>
                                <GridContainer class={"grid"}>
                                    <GridItem>
                                        <Input
                                            required
                                            error={this.state.error}
                                            fullWidth="195px"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            type = 'text'
                                            name="email"
                                            placeholder="Email"
                                            id="email"
                                            onChange={this.handleChange}
                                            defaultValue={this.email}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <div><br/> </div>
                                <GridContainer class={"grid"}>
                                    <GridItem>
                                        <Input
                                            label="Outlined" variant="outlined"
                                            required
                                            error={this.state.error}
                                            fullWidth="195px"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Manager Password *"
                                            id="password"
                                            onChange={this.handleChange}
                                            defaultValue={this.password}
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
                                {
                                    this.state.error === true ? <> <br/><label color={"red"}> *Incorrect Email or Password</label></> : null
                                }
                            </CardBody>
                            <CardFooter>
                                <Button color={"info"} onClick ={this.login}>Log In</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default withRouter (LoginForm)