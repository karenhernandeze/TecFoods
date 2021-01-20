import axios from 'axios'

const manageDeliveryAPI = 'https://tecfood.herokuapp.com/api'
//const manageDeliveryAPI = 'http://localhost:3000/orders'


export class ManageMainService {

    async retrieveMainById(id) {
        console.log( "MAIN DATA SERVICE : RETRIEVE ALL INFO FROM MAIN")
        try{
            const data =  axios.get(`${manageDeliveryAPI}/${id}/main`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    createNewEmployee(employee, id) {
        console.log( "create new employee")
        try{
            const data =  axios.post(`${manageDeliveryAPI}/${id}/main/addemployee`, employee);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveEmployeeById (id, empId){
        console.log("RETRIEVE EMPLOYEE BY ID")
        try{
            const data = axios.get(`${manageDeliveryAPI}/${id}/main/${empId}`)
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateEmployee(id, empId, employee) {
        console.log( "UPDATE FORM")
        try{
            const data =  axios.put(`${manageDeliveryAPI}/${id}/main/${empId}`, employee)
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    // async setOrderAsMissed(id) {
    //     console.log("update order to missed")
    //     try{
    //         const data = axios.put(`${manageDeliveryAPI}/missed/${id}`);
    //         return data;
    //     } catch (err) {
    //         console.log(err);
    //         return err.message
    //     }
    // }
    //
    // async setOrderAsDelivered (id) {
    //     console.log("update order to delivered")
    //     try{
    //         const data = axios.put(`${manageDeliveryAPI}/deliver/${id}`);
    //         return data;
    //     } catch (err) {
    //         console.log(err);
    //         return err.message
    //     }
    // }
    //
    // async setOrderAsInProgress (id) {
    //     console.log("update order to start")
    //     console.log(id);
    //     try{
    //         const data = axios.put(`${manageDeliveryAPI}/start/${id}`);
    //         return data;
    //     } catch (err) {
    //         console.log(err);
    //         return err.message
    //     }
    // }
    //
    // async setOrderAsCancelled (id) {
    //     console.log("update order to cancel")
    //     try{
    //         const data = axios.put(`${manageDeliveryAPI}/cancel/${id}`);
    //         return data;
    //     } catch (err) {
    //         console.log(err);
    //         return err.message
    //     }
    // }

};

export default new ManageMainService();