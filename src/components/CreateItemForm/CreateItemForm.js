import React, { Component } from 'react'
import GridItem from "../../building_blocks/Grid/GridItem.js";
import GridContainer from "../../building_blocks/Grid/GridContainer.js";
import Button from "../../building_blocks/CustomButtons/Button.js";
import Card from "../../building_blocks/Card/Card.js";
import CardHeader from "../../building_blocks/Card/CardHeader.js";
import CardBody from "../../building_blocks/Card/CardBody.js";
import CardFooter from "../../building_blocks/Card/CardFooter.js";
import ManageItemsService from "../../service/ManageItemsService";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import '../Form-styles.css'
import Navbar from "../../building_blocks/Navbars/Navbar";
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from "@material-ui/core/CircularProgress";
const preset = 'muvwlutm';

class CreateItemForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            price: '',
            image: '',
            availability: true,
            includedSides: '',
            restaurantId: this.props.match.params.restId,
            errorName: false,
            errorDescription: false,
            errorPrice: false,
            errorSides: false
        }
        this.addItemsClicked = this.addItemsClicked.bind(this)
    }

    addItemsClicked = async () => {
        if (this.state.name == "" || this.state.description == '' || this.state.price == '' || this.state.includedSides == ''){
            this.state.name == '' ? this.setState({errorName: true}) : this.setState({errorName: false})
            this.state.description == '' ? this.setState({errorDescription: true}) : this.setState({errorName: false})
            this.state.price == '' ? this.setState({errorPrice: true}) : this.setState({errorName: false})
            this.state.includedSides == '' ? this.setState({errorSides: true}) : this.setState({errorName: false})
        }else{
            const linkPhoto = await this.onSubmit()
            console.log(linkPhoto)
            this.setState({
                ...this.state,
                image: linkPhoto
            });
            ManageItemsService.createNewItem(this.state, this.state.restaurantId)
                .then(
                    response => {
                        this.props.history.push(`/items/${this.state.restaurantId}`)
                        //this.setState({ item: response.data })
                    }
                )
        }
    };

    componentDidMount() {
        console.log("UPDATE")
        console.log(this.state)
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    //UPLOAD IMAGE CHANGE
    onChange = event => {
        this.setState({
            ...this.state,
            image: event.target.files[0]
        });
    };

    // removePhoto = event => {
    //     this.setState({ image: '' });
    // };

    onSubmit (){
        const formData = new FormData();
        formData.append('file', this.state.image);
        formData.append('upload_preset', preset);
        const link = ManageItemsService.updloadImage(formData).then(
            response => {
                console.log("RESPONSE HERE INFO")
                console.log(response)
                if (response === "Request failed with status code 400"){
                    return ''
                } else {
                    return response
                }


            }
        )
        return link;
    };


    render() {
        return (
            <div>
                <Navbar/>
                <div  className="content">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="success">
                                    <h4 >Add New Item</h4>
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
                                                id="outlined-start-adornment"
                                                onChange={this.handleChange}
                                                value={this.name}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorDescription}
                                                fullWidth="25px"
                                                name="description"
                                                label="Description "
                                                id="description"
                                                onChange={this.handleChange}
                                                defaultValue={this.description}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Input
                                                error={this.state.errorPrice}
                                                fullWidth="25px"
                                                name="price"
                                                placeholder="Price *"
                                                id="price"
                                                onChange={this.handleChange}
                                                defaultValue={this.price}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <TextField
                                                required
                                                error={this.state.errorSides}
                                                fullWidth="25px"
                                                name="includedSides"
                                                label="Included Sides"
                                                id="included-sides"
                                                onChange={this.handleChange}
                                                defaultValue={this.includedSides}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <div><br/> </div>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <div className='container'>
                                                <div className='file-field input-field'>
                                                    <div className='btn'>
                                                        <span>ADD IMAGE</span>
                                                        <br/>
                                                        <input type='file' name='image' onChange={this.onChange} accept=".png"/>
                                                        <br/>
                                                        {/*<ClearIcon onClick={this.removePhoto}/>*/}
                                                        {/*{*/}
                                                        {/*    this.state.image === '' ?*/}
                                                        {/*        <>*/}
                                                        {/*        <span>No File Selected</span>*/}
                                                        {/*        </>*/}
                                                        {/*         :*/}
                                                        {/*        <>*/}
                                                        {/*            <span>{(this.state.image.name)}</span>*/}
                                                        {/*            <ClearIcon onClick={this.removePhoto}/>*/}
                                                        {/*        </>*/}
                                                        {/*}*/}
                                                    </div>
                                                </div>

                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="success" onClick={this.addItemsClicked}>Add Item</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default CreateItemForm


// import React, { Component } from 'react'
// import GridItem from "../../building_blocks/Grid/GridItem.js";
// import GridContainer from "../../building_blocks/Grid/GridContainer.js";
// import Button from "../../building_blocks/CustomButtons/Button.js";
// import Card from "../../building_blocks/Card/Card.js";
// import CardHeader from "../../building_blocks/Card/CardHeader.js";
// import CardBody from "../../building_blocks/Card/CardBody.js";
// import CardFooter from "../../building_blocks/Card/CardFooter.js";
// import ManageItemsService from "../../service/ManageItemsService";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Input from "@material-ui/core/Input";
// import '../Form-styles.css'
// import Navbar from "../../building_blocks/Navbars/Navbar";
// const preset = 'muvwlutm';
//
// class CreateItemForm extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             name: '',
//             description: '',
//             price: '',
//             image: '',
//             availability: true,
//             includedSides: '',
//             restaurantId: this.props.match.params.restId,
//             errorName: false,
//             errorDescription: false,
//             errorPrice: false,
//             errorSides: false
//         }
//         this.addItemsClicked = this.addItemsClicked.bind(this)
//     }
//
//     //ADD NEW ITEM AND CHECK CONSTRAINTS
//     addItemsClicked = async () => {
//         //IF ALL THE FIELDS ARE COMPLETE CALL THE SERVICE, ELSE CHECK WHICH FIELD IS NOT FILLED AND MARK AN ERROR
//         if (this.state.name == "" || this.state.description == '' || this.state.price == '' || this.state.includedSides == ''){
//             this.state.name == '' ? this.setState({errorName: true}) : this.setState({errorName: false})
//             this.state.description == '' ? this.setState({errorDescription: true}) : this.setState({errorName: false})
//             this.state.price == '' ? this.setState({errorPrice: true}) : this.setState({errorName: false})
//             this.state.includedSides == '' ? this.setState({errorSides: true}) : this.setState({errorName: false})
//         }else{
//             //UPLOAD THE PICTURE AND AWAIT FOR ITS SUBMIT TO THE SERVICE
//             const linkPhoto = await this.onSubmit()
//             console.log(linkPhoto)
//             this.setState({
//                 ...this.state,
//                 image: linkPhoto
//             });
//             //SEND ITEM OBJECT TO THE SERVICE, INCLUIDING THE IMAGE.
//             ManageItemsService.createNewItem(this.state, this.state.restaurantId)
//                 .then(
//                     response => {
//                         this.props.history.push(`/items/${this.state.restaurantId}`)
//                         //this.setState({ item: response.data })
//                     }
//                 )
//         }
//     };
//
//     //HANDLE CHANGE IN TEXT FIELDS
//     handleChange = event => {
//         const { value, name } = event.target;
//         this.setState({
//             ...this.state,
//             [name]: value
//         });
//     };
//
//     //UPLOAD IMAGE HANDLE CHANGE
//     onChange = event => {
//         this.setState({
//             ...this.state,
//             image: event.target.files[0]
//         });
//     };
//
//     //SUBMIT IMAGE TO THE SERVICE AND IF NOTHING IS SUBMITTED RETURN AND EMPTY STRING
//     onSubmit (){
//         const formData = new FormData();
//         formData.append('file', this.state.image);
//         formData.append('upload_preset', preset);
//         const link = ManageItemsService.updloadImage(formData).then(
//             response => {
//                 console.log("RESPONSE HERE INFO")
//                 console.log(response)
//                 if (response === "Request failed with status code 400"){
//                     return ''
//                 } else {
//                     return response
//                 }
//             }
//         )
//         return link;
//     };
//
//
//     render() {
//         return (
//             <div>
//                 <Navbar/>
//                 <div  className="content">
//                     <GridContainer>
//                         <GridItem xs={12} sm={12} md={12}>
//                             <Card>
//                                 <CardHeader color="success">
//                                     <h4 >Add New Item</h4>
//                                     <p >Complete Profile</p>
//                                 </CardHeader>
//                                 <CardBody>
//                                     <GridContainer>
//                                         <GridItem xs={12} sm={12} md={6}>
//                                             <TextField
//                                                 required
//                                                 error={this.state.errorName}
//                                                 fullWidth="25px"
//                                                 name="name"
//                                                 label="Name"
//                                                 id="outlined-start-adornment"
//                                                 onChange={this.handleChange}
//                                                 value={this.name}
//                                             />
//                                         </GridItem>
//                                         <GridItem xs={12} sm={12} md={6}>
//                                             <TextField
//                                                 required
//                                                 error={this.state.errorDescription}
//                                                 fullWidth="25px"
//                                                 name="description"
//                                                 label="Description "
//                                                 id="description"
//                                                 onChange={this.handleChange}
//                                                 defaultValue={this.description}
//                                             />
//                                         </GridItem>
//                                     </GridContainer>
//                                     <div><br/> </div>
//                                     <GridContainer>
//                                         <GridItem xs={12} sm={12} md={6}>
//                                             <Input
//                                                 error={this.state.errorPrice}
//                                                 fullWidth="25px"
//                                                 name="price"
//                                                 placeholder="Price *"
//                                                 id="price"
//                                                 onChange={this.handleChange}
//                                                 defaultValue={this.price}
//                                                 startAdornment={<InputAdornment position="start">$</InputAdornment>}
//                                             />
//                                         </GridItem>
//                                         <GridItem xs={12} sm={12} md={6}>
//                                             <TextField
//                                                 required
//                                                 error={this.state.errorSides}
//                                                 fullWidth="25px"
//                                                 name="includedSides"
//                                                 label="Included Sides"
//                                                 id="included-sides"
//                                                 onChange={this.handleChange}
//                                                 defaultValue={this.includedSides}
//                                             />
//                                         </GridItem>
//                                     </GridContainer>
//                                     <div><br/> </div>
//                                     <GridContainer>
//                                         <GridItem xs={12} sm={12} md={6}>
//                                             <div className='container'>
//                                                 <div className='file-field input-field'>
//                                                     <div className='btn'>
//                                                         <span>ADD IMAGE</span>
//                                                         <br/>
//                                                         <input type='file' name='image' onChange={this.onChange} accept=".png"/>
//                                                         <br/>
//                                                     </div>
//                                                 </div>
//
//                                             </div>
//                                         </GridItem>
//                                     </GridContainer>
//                                 </CardBody>
//                                 <CardFooter>
//                                     <Button color="success" onClick={this.addNewItem}>Add Item</Button>
//                                 </CardFooter>
//                             </Card>
//                         </GridItem>
//                     </GridContainer>
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default CreateItemForm