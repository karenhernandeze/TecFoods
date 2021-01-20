import axios from 'axios'
const manageRestaurantAPI = 'https://tecfood.herokuapp.com/api/restaurant'

export class ManageRestaurantService {

    async retrieveAllRestaurants() {
        try{
            const data =  axios.get(manageRestaurantAPI);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveRestaurantById(id) {
        try{
            const data =  axios.get(`${manageRestaurantAPI}/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async disableAvailability(id) {
        console.log( "disableAvailability")
        try{
            const data =  axios.put(`${manageRestaurantAPI}/disable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async enableAvailability(id) {
        console.log( "enable")
        try{
            const data =  axios.put(`${manageRestaurantAPI}/enable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async createNewRestaurant(restaurant) {
        console.log( "create new")
        try{
            const data =  axios.post(`${manageRestaurantAPI}`, restaurant);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateRestaurant(id, restaurant) {
        console.log( "UPDATE FORM")
        try{
            const data =  axios.put(`${manageRestaurantAPI}/${id}`, restaurant);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageRestaurantService();