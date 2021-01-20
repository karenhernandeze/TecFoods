import React, { Component } from 'react'
import GridContainer from "../../building_blocks/Grid/GridContainer";
import GridItem from "../../building_blocks/Grid/GridItem";
import Card from "../../building_blocks/Card/Card";
import CardBody from "../../building_blocks/Card/CardBody";
import Table from "../../building_blocks/Table/Table";
import Button from "../../building_blocks/CustomButtons/Button";
import {Add, Done, Edit, Update} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import ManageMainService from "../../service/ManageMainService";
import './EditForm-style.css'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

class EditMainForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.match.params.id,
            restName: '',
            //ARRAY OF OBJECTS TYPE EMPLOYEE
            employees: [],
            //THIS EMPLOYEE OBJECT IS USED FOR THE ADD FUNCTION
            employee: {
                _id: '',
                restaurantId: this.props.match.params.id,
                firstName:'',
                lastName:'',
                position:'',
                availability: false
            },
            //THIS EMPLOYEE OBJECT IS USED FOR THE EDIT FUNCTION
            employeeEdit: {
                restaurantId: this.props.match.params.id,
                firstName:'',
                lastName:'',
                position:'',
                availability: false
            },
            open: false,
            openEdit: false,
            employeeEditId: '',
            errorFName: false,
            errorLName: false,
            errorPos: false
        }
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
        this.refreshMain();
    }

    //METHOD USED TO GET INFORMATION FROM DATA BASE, RETRIEVE ALL THE INFORMATION FOR THE MAIN:
    //  RESTAURANT NAME AND THE RESTAURANT EMPLOYEES
    refreshMain(){
        ManageMainService.retrieveMainById(this.state._id)
            .then(
                response => {
                    this.setState({restName: response.data[0], employees: response.data[1]})
                }
            )
    }

    //SET STATE OF 'OPEN' TO TRUE TO OPEN DIALOG
    handleOpen = event => {
        this.setState({
            ...this.state,
            open: true
        });
    };

    //SET STATE OF 'OPEN EDIT ' TO TRUE TO OPEN DIALOG, BUT THE EDIT DIALOG TO EDIT THE EMPLOYEE
    handleOpenEdit(id){
        //RETRIEVE EMPLOYEE BY ID FROM THE SERVICE
        ManageMainService.retrieveEmployeeById(this.state._id, id)
            .then(
                response => {
                    //SET STATE TO THE CURRENT EMPLOYEE DATA
                    this.setState({
                        employeeEdit: {
                            restaurantId: this.props.match.params.id,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            position: response.data.position,
                            availability: response.data.availability
                        },
                        employeeEditId: id,
                        openEdit: true
                    })
                }
            )
    };

    //SET STATE OF DIALOG TO FALSE AND CLOSE IT
    handleClose = event => {
        this.setState({
            ...this.state,
            open: false,
            openEdit:false,
            //SET ERROR TO FALSE, FOR THE RED LINE TO DISAPPEAR WHEN OPENING THE DIALOG AGAIN
            errorFName: false,
            errorLName: false,
            errorPos: false
        });
    };

    //HANDLE CHANGE IN TEXT FIELDS
    handleChange = event => {
        const { value, name } = event.target;
        const {employee} = this.state;
        employee[name] = value;
        this.setState({
            ...this.state,
            employee
        });
    };

    //HANDLE CHANGE IN EMPLOYEE EDIT TEXT FIELDS
    handleChangeEdit = event => {
        const { value, name } = event.target;
        const {employeeEdit} = this.state;
        employeeEdit[name] = value;
        this.setState({
            ...this.state,
            employeeEdit
        });
    };

    //ADD A NEW EMPLOYEE AND CHECK CONSTRAINTS
    addEmployee = async () => {
        //IN THE IF CHECK IF ALL THE INFORMATION IS FILLED, IF NOT AN ERROR APPEARS.
        if (this.state.employee.firstName === '' || this.state.employee.lastName === '' || this.state.employee.position === ''){
            this.state.employee.firstName == '' ? this.setState({errorFName: true}) : this.setState({errorFName: false})
            this.state.employee.lastName == '' ? this.setState({errorLName: true}) : this.setState({errorLName: false})
            this.state.employee.position == '' ? this.setState({errorPos: true}) : this.setState({errorPos: false})
        } else {
            //ADD THE NEW EMPLOYEE AND CALL THE SERVICE
            ManageMainService.createNewEmployee(this.state.employee, this.state._id)
                .then(
                    response => {
                        this.setState({
                            ...this.state,
                            open: false
                        });
                        this.refreshMain();
                    }
                )
        }
    }

    //HANDLE CHECKBOX FOR AVAILABILITY IN CREATE NEW EMPLOYEE, WHEN CHECKED AND UNCHECKED
    handleAvailabilityChange () {
        if (this.state.employee.availability == true){
            this.setState({ employee: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employee.firstName,
                    lastName:this.state.employee.lastName,
                    position:this.state.employee.position,
                    availability: false
                }})
        } else if (this.state.employee.availability == false){
            this.setState({ employee: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employee.firstName,
                    lastName:this.state.employee.lastName,
                    position:this.state.employee.position,
                    availability: true}})
        }
    }

    //HANDLE CHECKBOX FOR AVAILABILITY IN EDIT EMPLOYEE, WHEN CHECKED AND UNCHECKED
    handleAvailabilityChangeEdit () {
        if (this.state.employeeEdit.availability == true){
            this.setState({ employeeEdit: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employeeEdit.firstName,
                    lastName:this.state.employeeEdit.lastName,
                    position:this.state.employeeEdit.position,
                    availability: false
                }})
        } else if (this.state.employeeEdit.availability == false){
            this.setState({ employeeEdit: {
                    restaurantId: this.props.match.params.id,
                    firstName:this.state.employeeEdit.firstName,
                    lastName:this.state.employeeEdit.lastName,
                    position:this.state.employeeEdit.position,
                    availability: true}})
        }
    }

    //REDIRECT TO MAIN
    updateMain(id){
        this.props.history.push(`/${id}/main/`)
    }

    //UPDATE EMPLOYEE AND CHECK THAT ALL THE FIELDS ARE FILLED
    updateEmployee(employee){
        //IF THERE ARE NOT FILLED AN ERROR WILL APPEAR.
        if (this.state.employeeEdit.firstName === '' || this.state.employeeEdit.lastName === '' || this.state.employeeEdit.position === ''){
            this.state.employeeEdit.firstName == '' ? this.setState({errorFName: true}) : this.setState({errorFName: false})
            this.state.employeeEdit.lastName == '' ? this.setState({errorLName: true}) : this.setState({errorLName: false})
            this.state.employeeEdit.position == '' ? this.setState({errorPos: true}) : this.setState({errorPos: false})
        } else{
            this.setState({
                employeeEdit: {
                    restaurantId: this.props.match.params.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    position: employee.position,
                    availability: employee.availability
                }
            })
            ManageMainService.updateEmployee(this.state._id, this.state.employeeEditId, employee)
                .then(
                    response => {
                        this.setState({
                            ...this.state,
                            openEdit: false
                        });
                        this.refreshMain();
                    }
                )
        }
    }

    render() {
        return(
            <div>
                <div className={"restName"}>
                    <h3>
                        Restaurant:
                        <br/>
                        <small>
                            {this.state.restName}
                        </small>
                    </h3>
                </div>
                <div className={"restSch"}>
                    <h4>
                        SCHEDULE
                        <br/>
                        <small>
                            9:00 AM - 5:00 PM
                        </small>
                    </h4>
                </div>
                <div className={"restEmp"}>
                    <h4>
                        EMPLOYEES
                        <GridContainer item xs class={"tabW"}>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <GridItem  xs={"8"} >
                                            <Card>
                                                <CardBody>
                                                    <Table
                                                        tableData={
                                                            [
                                                                [<label class={"tableFName"}> {employee.firstName}</label>
                                                                    ,<label class={"tableLName"}> {employee.lastName}</label>,
                                                                    <label class={"tablePos"}> {employee.position}</label>,
                                                                    <label class={"table4"}> {employee.availability == true ? "Enable" : "Disable"}</label>,
                                                                    <Button onClick={() => this.handleOpenEdit(employee._id)}
                                                                            className={"button"} color={"warning"} >
                                                                        Edit
                                                                        <Edit className={"icon"}/>
                                                                    </Button>]
                                                            ]
                                                        }
                                                    />
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                )
                            }
                        </GridContainer>
                    </h4>
                </div>
                <div class={"pad"}>
                    <Button onClick={this.handleOpen} color={"warning"}>
                        ADD EMPLOYEE
                        <Add className={"icon"}/>
                    </Button>
                </div>
                <Dialog
                    fullWidth="50px"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Add New Employee:
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            <TextField
                                required
                                error={this.state.errorFName}
                                fullWidth="50px"
                                name="firstName"
                                label="First Name"
                                id="firstName"
                                onChange={this.handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorLName}
                                fullWidth="50px"
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                                onChange={this.handleChange}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorPos}
                                fullWidth="50px"
                                name="position"
                                label="Position"
                                id="position"
                                onChange={this.handleChange}
                                //defaultValue={this.restManagerEmail}
                            />
                            <br/>
                            <br/>
                            <label>
                                Availability
                            </label>
                            <br/>
                            <Checkbox color={"default"} checked={this.state.employee.availability} onChange={ () => {this.handleAvailabilityChange()}}/>
                            <br/>
                            <br/>
                            <Button color={"success"} className={"button"} onClick={() => this.addEmployee()}>
                                Confirm
                                <Done className={"icon"}/>
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth="50px"
                    open={this.state.openEdit}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        Edit Employee:
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            <TextField
                                required
                                error={this.state.errorFName}
                                fullWidth="50px"
                                name="firstName"
                                label="First Name"
                                id="firstName"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.firstName + ""}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorLName}
                                fullWidth="50px"
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.lastName + ""}
                            />
                            <br/>
                            <br/>
                            <TextField
                                required
                                error={this.state.errorPos}
                                fullWidth="50px"
                                name="position"
                                label="Position"
                                id="position"
                                onChange={this.handleChangeEdit}
                                value={this.state.employeeEdit.position + ""}
                            />
                            <br/>
                            <br/>
                            <label>
                                Availability
                            </label>
                            <br/>
                            <Checkbox color={"default"} checked={this.state.employeeEdit.availability == true ? true : false}
                                      onChange={ () => {this.handleAvailabilityChangeEdit()}}/>
                            <br/>
                            <br/>
                            <Button color={"success"} className={"button"} onClick={() => this.updateEmployee(this.state.employeeEdit)}>
                                Confirm
                                <Done className={"icon"}/>
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <br/>
                <div className={"edit"}>
                    <Button onClick={() => this.updateMain(this.state._id)} color={"warning"}>
                        Confirm
                        <Update className={"icon"}/>
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter (EditMainForm)