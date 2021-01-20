import React, {Component} from "react";
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Table from "../../building_blocks/Table/Table.js";
import Card from "../../building_blocks/Card/Card"
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import ManageItemsService from "../../service/ManageItemsService";
import "./TableItem-style.css"
import Button from "../../building_blocks/CustomButtons/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from 'react-router-dom';
import Snackbar from "../../building_blocks/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";

class TableItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restId: this.props.match.params.id,
            items: [],
            item: {
                _id:'',
                availability: '',
                description:'',
                image:'',
                includedSides:'',
                name:'',
                price:'',
                restaurantId: '',
                tc: false
            },
            checked: false,
            message: null
        }
        this.addNewItem = this.addNewItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshItems();
    }

    //RETRIEVE ALL ITEMS FROM THE SERVICE
    refreshItems() {
        ManageItemsService.retrieveAllItems(this.props.match.params.id)
            .then(
                response => {
                    this.setState({ items: response.data })
                    this.setState( item =>
                    {
                        if (item.availability == true){
                            this.setState({checked: true})
                        } else if (item.availability == false) {
                            this.setState({checked: false})
                        }
                    })
                }
            )
    }

    //REDIRECT TO THE CREATE ITEM FORM
    addNewItem() {
        console.log(this.props)
        this.props.history.push(`/item/${this.state.restId}`)

        // this.props.history.push(/item)
    }

    //HANDLE CHANGE FOR THE CHECKBOXES FOR 'AVAILABILITY' STATUS.
    handleChange (item) {
        if (item.availability == true){
            ManageItemsService.disableAvailability(item._id).then(
                response => {
                    //SHOW NOTIFICATION ABOUT AVAILABILITY UPDATE
                    this.setState({ tc: true, message: `Item:  ${item.name} , was successfully disabled` })
                    window.setTimeout(this.handleClose, 5000);
                    //REFRESH CHECKBOX CHECKED
                    this.refreshItems()

                }
            )
        } else if (item.availability == false){
            ManageItemsService.enableAvailability(item._id).then(
                response => {
                    //SHOW NOTIFICATION ABOUT AVAILABILITY UPDATE
                    this.setState({tc: true, message: `Item:  ${item.name} , was successfully enabled` })
                    window.setTimeout(this.handleClose, 5000);
                    //REFRESH CHECKBOX CHECKED
                    this.refreshItems()
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
    updateItem(restId, id) {
        //console.log('update ' + id)
        this.props.history.push(`/item/${restId}/edit/${id}`)
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
                        <CardHeader color="success">
                            <h4 className={"cardTitleWhite"}>ITEMS DASHBOARD</h4>
                            <p className={"cardCategoryWhite"}>
                                Restaurant: Name
                            </p>
                        </CardHeader>
                        <CardBody>
                            {/* TABLES WITH ALL THE FIELDS OF THE ITEMS */}
                            <Table
                                tableHeaderColor="success"
                                tableHead={["Name", "Description", "Price", "Image", "Availability", "Sides", "Edit"]}
                                tableData={
                                    this.state.items.map(
                                        item =>
                                            [
                                                [item.name],
                                                [item.description],
                                                [item.price],
                                                [
                                                    <img src={item.image}/>

                                                ],
                                                [
                                                    //CHECKBOX FOR AVAILABILITY AND HANDLE CHANGE WHEN CLICKED AND UNCLICKED
                                                    <FormControlLabel
                                                        onClick={this.showNotification}
                                                        control={<Checkbox color={"default"} checked={item.availability}
                                                              onChange={ () => {this.handleChange(item)}}/>}
                                                        labelPlacement="top"
                                                    />
                                                ],
                                                [item.includedSides + ''],
                                                [<Button color={"warning"} onClick={() => this.updateItem(this.state.restId, item._id)}> Edit </Button>]
                                            ],
                                    )}
                            />
                        </CardBody>
                    </Card>
                    <Button color="success" onClick={this.addNewItem}> Add </Button>
                </GridItem>
            </GridContainer>
        )
    }
}

export default withRouter (TableItems)
