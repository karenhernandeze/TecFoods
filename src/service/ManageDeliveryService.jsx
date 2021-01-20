import axios from 'axios'

const manageDeliveryAPI = 'https://tecfood.herokuapp.com/api/orders'

export class ManageDeliveryService {

    async retrieveAllOrders(restId) {
        console.log( "COURSE DATA SERVICE : RETRIEVE ALL COURSES")
        try{
            const data =  axios.get(`${manageDeliveryAPI}/${restId}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveOrderById (restId, id){
        console.log("RETRIEVE ORDER BY ID")
        try{
            const data = axios.get(`${manageDeliveryAPI}/${restId}/${id}`)
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsMissed(id) {
        console.log("update order to missed")
        try{
            const data = axios.put(`${manageDeliveryAPI}/missed/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsDelivered (id) {
        console.log("update order to delivered")
        try{
            const data = axios.put(`${manageDeliveryAPI}/deliver/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsInProgress (id) {
        console.log("update order to start")
        console.log(id);
        try{
            const data = axios.put(`${manageDeliveryAPI}/start/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsCancelled (id) {
        console.log("update order to cancel")
        try{
            const data = axios.put(`${manageDeliveryAPI}/cancel/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsReady (id) {
        console.log("update order to ready")
        try{
            const data = axios.put(`${manageDeliveryAPI}/ready/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

};

export default new ManageDeliveryService();