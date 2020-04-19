import React from 'react';
import {observer} from "mobx-react";
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import signData from "./store/sign-store";
import authorizationData from "./store/auth-store";
import pokemonData from "./store/pokemon-store";
import Header from "./components/Header/Header";
import Pokemon from "./components/Pokemon/Pokemon";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import AuthApi from  "./сontext/authContext";
const authModule = require("./сontext/authModule");

class App extends React.Component {

    componentDidMount() {
        const authData =  JSON.parse(localStorage.getItem(authorizationData.storageName));
        if(authData && authData.token) {
            authorizationData.setToken(authData.token);
            authorizationData.setUserId(authData.userId);
        }
    }

    render() {

        let isAuthenticated = !!authorizationData.token;

        return (
            <AuthApi.Provider value = { {
                token: authorizationData.token,
                userId: authorizationData.userId,
                isAuth: authorizationData.isAuth
            }}>
                <div className="App">
                    <Header
                        listFavorite = {pokemonData.listFavorite}
                        loadPokemons = {pokemonData.loadPokemons}
                        token = {authorizationData.token}
                        logout = {authorizationData.logout}
                    />
                    <main role="main">
                        <div className="container">
                            {isAuthenticated ?
                                <Switch>
                                    <Route path="/" exact>
                                        <Pokemon store={pokemonData} />
                                    </Route>
                                    <Redirect to="/" exact/>
                                </Switch>
                                :
                                <Switch>
                                    <Route path="/" exact>
                                        <Pokemon store={pokemonData} />
                                    </Route>
                                    <Route path="/signin" exact>
                                        <Signin store={signData} />
                                    </Route>
                                    <Route path="/signup" exact>
                                        <Signup store={signData} />
                                    </Route>
                                    <Redirect to="/" exact/>
                                </Switch>
                            }
                        </div>
                    </main>
                </div>
            </AuthApi.Provider>
        )
    }
}

export default observer(App);
