import {action, configure, decorate, observable, runInAction} from "mobx";
import * as axios from "axios";
import authorizationData from "./auth-store";
configure({enforceActions: true});

class signData {

    email = "";
    password = "";
    loading = false;

    saveAuthData = async (e) => {
        e.preventDefault();
        this.loading = true;
        this.email = e.target.email.value;
        this.password = e.target.password.value;
        await axios.post('/api/auth/signup/', { email: this.email, password: this.password} )
            .then(response => {
                console.log(response.data.message);
            });
        this.loading = false;
    };

    getAuthData = async (e) => {
        e.preventDefault();
        this.loading = true;
        this.email = e.target.email.value;
        this.password = e.target.password.value;
        await axios.post('/api/auth/signin/', { email: this.email, password: this.password} )
            .then(response => {
                runInAction(() => {
                    authorizationData.login(response.data.token, response.data.userId);
                    this.loading = false;
                })
            });
    };


}

signData = decorate(signData, {
    email: observable,
    password: observable,
    loading: observable,
    getAuthData: action,
    saveAuthData: action,
    setAuthUserData: action,
    setToken: action,
    setUserId: action
});

export default new signData;