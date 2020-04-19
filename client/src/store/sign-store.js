import {action, configure, decorate, observable, runInAction} from "mobx";
import * as axios from "axios";
import authorizationData from "./auth-store";
configure({enforceActions: "observed"});

class signData {

    email = undefined;
    password = undefined;
    errorStatus = "warning";
    errorMessage = "Enter login and password (min 6 symbols)";

    saveAuthData = async (e) => {
        e.preventDefault();
        this.email = e.target.email.value;
        this.password = e.target.password.value;
        await axios.post('/api/auth/signup/', { email: this.email, password: this.password} )
            .then(response => {
                response.data.status === 201 ? this.setErrorStatus("success") : this.setErrorStatus("error");
                this.setErrorMessage(response.data.message);
                alert(this.errorMessage);
                console.log(response.data.message);
            });
    };

    getAuthData = async (e) => {
        e.preventDefault();
        this.email = e.target.email.value;
        this.password = e.target.password.value;
        await axios.post('/api/auth/signin/', { email: this.email, password: this.password} )
            .then(response => {
                runInAction(() => {
                    authorizationData.login(response.data.token, response.data.userId);
                    this.setErrorMessage(response.data.message);
                    console.log(response.data.message);
                })
            });
    };

    setErrorStatus = (status) => {
        this.errorStatus =  status;
    };

    setErrorMessage = (message) => {
        this.errorMessage = message;
    };

    onChangeEmail = (event) => {
        this.email = event.target.value;
    };

    onChangePassword = (event) => {
        this.password = event.target.value;
    };


}

signData = decorate(signData, {
    email: observable,
    password: observable,
    errorStatus: observable,
    errorMessage: observable,
    onChangeEmail: action,
    onChangePassword: action,
    getAuthData: action,
    saveAuthData: action,
    setErrorStatus: action,
    setErrorMessage: action,
    setToken: action,
    setUserId: action
});

export default new signData;