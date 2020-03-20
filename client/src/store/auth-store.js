import React from "react";
import {action, configure, decorate, observable} from "mobx";
configure({enforceActions: true});

class authorizationData {

    token = null;
    userId = null;
    storageName = "userData";
    isAuth = false;

    setToken = (jwtToken) => {
        this.token = jwtToken;
    };

    setUserId = (id) => {
        this.userId = id;
    };

    login = (jwtToken, id) => {
        this.setToken(jwtToken);
        this.setUserId(id);
        let obj = {
            token: jwtToken,
            userId: id
        };
        let serialObj = JSON.stringify(obj);
        localStorage.setItem(this.storageName, serialObj);
    };

    logout = () => {
        this.setToken(null);
        this.setUserId(null);
        localStorage.removeItem(this.storageName);
    };

}

authorizationData = decorate(authorizationData, {
    token: observable,
    userId: observable,
    storageName: observable,
    setToken: action,
    setUserId: action,
    login: action,
    logout: action
});

export default new authorizationData;