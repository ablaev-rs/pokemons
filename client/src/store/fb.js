import FB from "fb";
import React from "react";
import {action, configure, decorate, observable} from "mobx";
configure({enforceActions: true});


class fbData {
    fbSdkLoaded = () => {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);

        });
    }
}

fbData = decorate(fbData, {
    fbSdkLoaded: action
});

export default new fbData;