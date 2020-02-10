import {action, configure, decorate, observable, runInAction} from "mobx";
import * as axios from "axios";
import React from "react";

configure({enforceActions: true});

class Store {

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
    pokemonTypes = ["grass", "poison", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];

    getPokemonsByType = (t) => {
        return axios.get(`https://pokeapi.co/api/v2/type/` + t)
    }

    getListUrlForSelectedTypes =  () => {
        let pokemonLinks = [];
        this.loading = true;
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
            this.tmpPokemons = pokemonLinks;
            this.selectionElementsForPage(this.tmpPokemons);
        })
    }

    selectionElementsForPage = (pokemonLinks) => {
        let selection = pokemonLinks.slice(this.offset, this.offset+this.limit);
        this.loading = true;
        this.getDetailsForPokemonsByUrl(selection, pokemonLinks.length);
    }

    setSelectedTypes = (e) => {
        this.loading = true;
        this.templatePokemonName = "";
        let options = e.target.searchTypes;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.selectedTypes = value;
        this.getListUrlForSelectedTypes();
        e.preventDefault();
    }

    loadPokemons = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
            .then(response => {
                this.tmpCount = response.data.count;
                let pokemonLinks = response.data.results;
                this.templatePokemonName ?
                    this.searchPokemonsByName(pokemonLinks) :
                    this.getDetailsForPokemonsByUrl(pokemonLinks, response.data.count);
            })
    };

    getPokemonsInfo = (url) => {
        return axios.get(url)
    };

    searchPokemonsByName = (pokemonLinks) => {
        let searchResult = pokemonLinks.filter( pName => {
            return pName.name === this.templatePokemonName;
        });

        if(searchResult.length > 0) {
            this.getDetailsForPokemonsByUrl(searchResult, pokemonLinks.length);

        } else {
            if(this.offset < 20) {
                let newOffset = this.offset + this.limit;
                this.setOffset(newOffset);
                this.loadPokemons();
            }
        }
    }

    getDetailsForPokemonsByUrl = (pokemonLinks, cnt) => {
        Promise.all(
            pokemonLinks.map( p => {
                return this.getPokemonsInfo(p.url);
            })
        ).then( response => {
            runInAction(() => {
                this.setCount(cnt);
                this.setPokemons(response);
                this.loading = false;
            })
        })
    }


    onLimitChanged = (event) => {
        runInAction( () => {
            let l = event.target.value;
            this.limit = l;
            this.offset = this.currentPage*l;
            this.loading = true;
            this.selectedTypes.length > 0 ? this.selectionElementsForPage(this.tmpPokemons) : this.loadPokemons();
        });
    };

    onPageChanged = (event, page) => {
        runInAction( () => {
            let p = page;
            this.currentPage = p;
            this.offset = p*this.limit;
            this.loading = true;
            this.selectedTypes.length > 0 ? this.selectionElementsForPage(this.tmpPokemons) : this.loadPokemons();

        });

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

    setTemplateSearchByName = (e) => {
        this.selectedTypes = [];
        this.templatePokemonName = e.target.templatePokemonName.value;
        this.setOffset(0);
        this.loadPokemons();
        e.preventDefault();
    };

    clearForm = (e) => {
        this.selectedTypes = [];
        this.templatePokemonName = "";
        this.loadPokemons();
        e.preventDefault();
    }

}

Store = decorate(Store, {
    Pokemons: observable,
    count: observable,
    offset: observable,
    limit: observable,
    currentPage: observable,
    loading: observable,
    templatePokemonName: observable,
    tmpCount: observable,
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
    selectionElementsForPage: action
});

export default new Store;