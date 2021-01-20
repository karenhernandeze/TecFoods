import axios from 'axios'
const manageItemAPItest = 'https://tecfood.herokuapp.com/api/restaurant'///5f52e7ac97345cbcabcfc829/item'
const url = 'https://api.cloudinary.com/v1_1/dzuxehghe/image/upload';

export class ManageItemsService {

    async retrieveAllItems(id) {
        try{
            // console.log(manageItemAPItest+id+"/item")
            const data =  axios.get(`${manageItemAPItest}/${id}/item`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveItemById(restId, itemId) {
        try{
            console.log("API")
            console.log(`${manageItemAPItest}/${restId}/item/${itemId}`);
            const data = axios.get(`${manageItemAPItest}/${restId}/item/${itemId}`)
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async disableAvailability(id) {
        console.log( "disableAvailability")
        try{
            const data =  axios.put(`${manageItemAPItest}/disable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async enableAvailability(id) {
        console.log( "enable")
        try{
            const data =  axios.put(`${manageItemAPItest}/enable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async createNewItem(item, id) {
        console.log( "create new")
        try{
            console.log(id)
            const data =  axios.post(`${manageItemAPItest}/${id}/item`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateItem(restId, id, item) {
        console.log( "UPDATE FORM")
        try{
            const data =  axios.put(`${manageItemAPItest}/${restId}/item/${id}`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updloadImage(formData){
        try{
            const res = await axios.post(url, formData);
            const imageUrl = res.data.secure_url;
            return imageUrl;
        } catch (err){
            console.log(err);
            return err.message
        }
    }
};

export default new ManageItemsService();