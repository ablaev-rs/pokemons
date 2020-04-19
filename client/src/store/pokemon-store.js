import {action, configure, decorate, observable, runInAction, toJS} from "mobx";
import * as axios from "axios";
import React from "react";
import authorizationData from "./auth-store";
configure({enforceActions: "observed"});

class pokemonData {

    Pokemons = [];
    perPage = [10, 20, 50];
    limit = 10;
    offset = 0;
    count = 0;
    currentPage = 0;
    loading = true;
    templatePokemonName = null;
    tmpCount = 0;
    selectedTypes = [];
    tmpPokemons = [];
    favoritePokemons = [];
    h1 = "List of Pokemon";
    pokemonTypes = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];


    loadPokemons = async () => {
        this.h1 = "List of Pokemon";
        this.setLoading(true);
        await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
            .then(response => {
                this.tmpCount = response.data.count;
                let pokemonLinks = response.data.results;
                this.templatePokemonName ?
                    this.searchPokemonsByName(pokemonLinks) :
                    this.getDetailsForPokemonsByUrl(pokemonLinks, response.data.count);
            })
    };

    getDetailsForPokemonsByUrl = (pokemonLinks, cnt) => {
        Promise.all(
            pokemonLinks.map( p => {
                return this.getPokemonsInfo(p.url);
            })
        ).then( response => {
            runInAction(() => {
                this.setCount(cnt);
                this.setPokemons(response);
                this.setLoading(false);
            })
        })
    };

    getPokemonsInfo = (url) => {
        return axios.get(url)
    };


    /* SEARCH POKEMONS BY TYPES */
    setSelectedTypes = (e) => {
        e.preventDefault();
        this.setLoading(true);
        this.templatePokemonName = null;
        let options = e.target.searchTypes;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.selectedTypes = value;
        this.getListUrlForSelectedTypes();
    };

    getListUrlForSelectedTypes =  () => {
        let pokemonLinks = [];
        Promise.all(
            this.selectedTypes.map (t => {
                return this.getPokemonsByType(t);
            })
        ).then( response => {
            response.map( arr => {
                let data = arr.data.pokemon;
                data.map( el => {
                    pokemonLinks.push(el.pokemon);
                })
            });
            this.tmpPokemons = [...new Map(pokemonLinks.map(obj => [JSON.stringify(obj), obj])).values()];
            this.selectionElementsForPage(this.tmpPokemons);
        })
    };

    getPokemonsByType = (t) => {
        return axios.get(`https://pokeapi.co/api/v2/type/` + t)
    };
    /* / */


    /* SEARCH POKEMONS BY NAME */
    setTemplateSearchByName = (e) => {
        e.preventDefault();
        this.setLoading(true);
        this.selectedTypes = [];
        this.setOffset(0);
        this.loadPokemons();
    };

    onChangeSearchByName = (event) => {
        this.templatePokemonName = event.target.value;
    }

    searchPokemonsByName = (pokemonLinks) => {
        let searchResult = pokemonLinks.filter( pName => {
            return pName.name === this.templatePokemonName;
        });

        if(searchResult.length > 0) {
            this.getDetailsForPokemonsByUrl(searchResult, searchResult.length);

        } else {
            if(this.offset < this.tmpCount) {
                let newOffset = this.offset + this.limit;
                this.setOffset(newOffset);
                this.loadPokemons();
            } else {
                this.setPokemons([]);
                this.setLoading(false);
            }
        }
    };
     /* / */


    /* FAVORITE POKEMONS */
    addToFavorite = async (e) => {
        e.preventDefault();
        let pid = e.target.pid.value;
        let authToken = e.target.authToken.value;
        await axios.post(
            '/api/favorite/add',
            { link: "https://pokeapi.co/api/v2/pokemon/"+pid+"/"},
            {
                headers: {
                    'Authorization':'Bearer ' + authToken,
                    'alg': 'HS256',
                    'typ': 'JWT',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data.message);
                this.getListFavorite();
            });
    };

    deleteFromFavorite = async (e) => {
        e.preventDefault();
        let pid = e.target.pid.value;
        let authToken = e.target.authToken.value;
        await axios.post(
            '/api/favorite/delete',
            { link: "https://pokeapi.co/api/v2/pokemon/"+pid+"/"},
            {
                headers: {
                    'Authorization':'Bearer ' + authToken,
                    'alg': 'HS256',
                    'typ': 'JWT',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data.message);
                this.getListFavorite();
            });
    };

    isFavorite = (url) => {
        let favoriteArray = toJS(this.favoritePokemons);
        return favoriteArray.findIndex( currentValue => currentValue.url === url );
    }

    getListFavorite = async () => {
        this.setLoading(true);
        let pokemonLinks = [];
        await axios.get(`/api/favorite/list/`,
            {
                headers: {
                    'Authorization': 'Bearer ' + authorizationData.token,
                    'alg': 'HS256',
                    'typ': 'JWT'
                }
            })
            .then(response => {
                let data = response.data;
                data.map(p => {
                    pokemonLinks.push({"url": p.link});
                });
                this.favoritePokemons = pokemonLinks;
                this.loadPokemons();
            });
    }

    listFavorite = async (authToken) => {
        let pokemonLinks = [];
        await axios.get(`/api/favorite/list/`,
            {
                headers: {
                    'Authorization':'Bearer ' + authToken,
                    'alg': 'HS256',
                    'typ': 'JWT'
                }
            })
            .then(response => {
                let data = response.data;
                data.map( p => {
                    pokemonLinks.push({"url": p.link});
                });
                this.favoritePokemons = pokemonLinks;
                this.h1 = "My Favorite Pokemons";
                this.getDetailsForPokemonsByUrl(pokemonLinks, pokemonLinks.length);
            });
    }
    /* / */


    /* PAGINATION */
    onLimitChanged = (event) => {
        let l = event.target.value;
        this.limit = l;
        this.offset = this.currentPage * l;
        this.setLoading(true);
        this.selectedTypes.length > 0 ? this.selectionElementsForPage(this.tmpPokemons) : this.loadPokemons();
    };

    onPageChanged = (event, page) => {
        let p = page;
        this.currentPage = p;
        this.offset = p * this.limit;
        this.setLoading(true);
        this.selectedTypes.length > 0 ? this.selectionElementsForPage(this.tmpPokemons) : this.loadPokemons();
    };

    selectionElementsForPage = (pokemonLinks) => {
        let selection = pokemonLinks.slice(this.offset, this.offset+this.limit);
        this.setLoading(true);
        this.getDetailsForPokemonsByUrl(selection, pokemonLinks.length);
    };
    /* / */



    clearForm = () => {
        this.templatePokemonName = "";
        this.selectedTypes = [];
        this.setOffset(0);
        this.loadPokemons();
    };

    setPokemons = data => {
        this.Pokemons = data;
    };

    setCount = count => {
        this.count = count;
    };

    setOffset = offset => {
        this.offset = offset;
    };

    setLoading = loading => {
        this.loading = loading;
    }
}

pokemonData = decorate(pokemonData, {
    Pokemons: observable,
    count: observable,
    offset: observable,
    limit: observable,
    currentPage: observable,
    loading: observable,
    templatePokemonName: observable,
    tmpCount: observable,
    favoritePokemons: observable,
    onLimitChanged: action,
    onPageChanged: action,
    loadPokemons: action,
    getPokemonsStats: action,
    setPokemons: action,
    setCount: action,
    setTemplateSearchByName: action,
    searchPokemonsByName: action,
    handleSubmitName:action,
    setSelectedTypes: action,
    selectionElementsForPage: action,
    addToFavorite: action,
    deleteFromFavorite: action,
    listFavorite: action,
    isFavorite: action,
    getListFavorite: action,
    setLoading: action,
    onChangeSearchByName: action
});

export default new pokemonData;