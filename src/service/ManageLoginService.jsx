import axios from 'axios'

const manageAPI = 'https://tecfood.herokuapp.com/api/'

export class ManageLoginService {

    async validateCredentials(credentials) {
        console.log( "LOGIN SUCCESFUL")
        try{
            const data =  axios.post(`${manageAPI}/loginweb`, credentials);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageLoginService();