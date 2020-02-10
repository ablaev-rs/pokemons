import React from 'react';
import './App.css';
import Pokemon from "./components/Pokemon/Pokemon";
import {observer} from "mobx-react";
import store from './store/pokemon-store';
import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Header />
          <main role="main">
            <div className="container">
              <Pokemon store = {store} />
            </div>
          </main>
        </div>
    )
  }
}

export default observer(App);
