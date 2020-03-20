import React from "react";

const AuthContext = React.createContext({
    token: null,
    userId: null,
    storageName: "userData",
    isAuth: false
});

export default AuthContext;