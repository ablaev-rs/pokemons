import React from 'react';
import AuthApi from "../../сontext/authContext.js";
import {observer} from "mobx-react";
import s from "./Pokemon.module.css";
import { toJS } from 'mobx';
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";


class Pokemon extends React.Component {

    static contextType = AuthApi;

    componentDidMount() {
        if(this.context.token) {
            this.props.store.getListFavorite();
        } else {
            this.props.store.loadPokemons();
        }
    }


    render() {

        const {
            Pokemons, count, limit, perPage, currentPage, loading, onLimitChanged, onPageChanged,
            setTemplateSearchByName, templatePokemonName, pokemonTypes, setSelectedTypes, selectedTypes,
            addToFavorite, isFavorite, deleteFromFavorite, h1, onChangeSearchByName,
            clearForm} = this.props.store;

        let setColorType = (name) => {
            switch (name) {
                case "bug": return s.bug;
                case "dark": return s.dark;
                case "dragon": return s.dragon;
                case "electric": return s.electric;
                case "fairy": return s.fairy;
                case "fighting": return s.fighting;
                case "fire": return s.fire;
                case "flying": return s.flying;
                case "ghost": return s.ghost;
                case "grass": return s.grass;
                case "ground": return s.ground;
                case "ice": return s.ice;
                case "normal": return s.normal;
                case "poison": return s.poison;
                case "psychic": return s.psychic;
                case "rock": return s.rock;
                case "steel": return s.steel;
                case "water": return s.water;
                default: return null;
            }
        };

        let pagesCount = Math.ceil(count / limit);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let data = toJS(Pokemons);

        let isOptionSelected = (type) => {
            if(selectedTypes.includes(type)) {
                return "selected";
            }
        }


        return (
            <Container fixed>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={2} lg={2}>

                        <form onSubmit={setTemplateSearchByName}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Search by Name
                            </InputLabel>
                            <Input type="text"
                                   name="templatePokemonName"
                                   placeholder="Enter pokemon's name"
                                   value = {templatePokemonName}
                                   onChange={onChangeSearchByName} />
                            <Button type="submit" className="MuiButton-containedPrimary MuiButton-containedSizeSmall">Search</Button>
                        </form>

                        <form onSubmit={setSelectedTypes}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Search by Type
                            </InputLabel>
                            <Select
                                multiple
                                native
                                variant="outlined"
                                inputProps={{
                                    name: "searchTypes"
                                }}
                            >
                                {
                                    pokemonTypes.map( (type) => <option key={type} value={type} selected={isOptionSelected(type)}>{type}</option> )
                                }
                            </Select>
                            <Button type="submit" className="MuiButton-containedPrimary MuiButton-containedSizeSmall">Search</Button>
                        </form>

                        <form onSubmit={clearForm}>
                            <Button type="submit" className="MuiButton-outlinedSecondary MuiButton-containedSizeSmall">Clear Form</Button>
                        </form>

                    </Grid>
                    <Grid item xs={12} sm={9} md={10} lg={10}>
                        {loading ? <div>Loading...</div> : (
                            <span>
                                <Typography variant="h3" noWrap="true" gutterBottom="true">{h1}</Typography>
                                {Pokemons.length == 0 ? <div>Nothing found</div> : (
                                    <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Types</TableCell>
                                            <TableCell align="center">Speed</TableCell>
                                            <TableCell align="center">Sp. Defense</TableCell>
                                            <TableCell align="center">Sp. Attack</TableCell>
                                            <TableCell align="center">Defense</TableCell>
                                            <TableCell align="center">Attack</TableCell>
                                            <TableCell align="center">HP</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.map((p) =>
                                                <TableRow hover>
                                                    <TableCell align="center"><img
                                                        src={p.data.sprites.front_default ? p.data.sprites.front_default : defaultAvatar}
                                                        alt={p.data.name}/><br/>
                                                        <strong>{p.data.name}</strong><br/>
                                                            {this.context.token ?
                                                                <span>
                                                                    { (isFavorite(p.config.url)==-1) ?
                                                                        <form onSubmit={addToFavorite}>
                                                                            <Input type="hidden" value={p.data.id} name = "pid" />
                                                                            <Input type="hidden" value={this.context.token} name = "authToken" />
                                                                            <Button type="submit" variant="outlined" size="small" color="primary">Add to Favorite</Button>
                                                                        </form>
                                                                        :
                                                                        <form onSubmit={deleteFromFavorite}>
                                                                            <Input type="hidden" value={p.data.id} name = "pid" />
                                                                            <Input type="hidden" value={this.context.token} name = "authToken" />
                                                                            <Button type="submit" variant="outlined" size="small" color="secondary">Delete From Favorite</Button>
                                                                        </form>
                                                                    }
                                                                </span>
                                                                    : ""}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            p.data.types.map(t =>
                                                                <div
                                                                    className={setColorType(t.type.name)}>{t.type.name}</div>
                                                            )
                                                        }
                                                    </TableCell>
                                                    {
                                                        p.data.stats.map(baseStat =>
                                                            <TableCell
                                                                align="center"> {baseStat.base_stat}</TableCell>
                                                        )
                                                    }
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <TablePagination
                                                    component="div"
                                                    rowsPerPageOptions={perPage}
                                                    rowsPerPage={limit}
                                                    onChangeRowsPerPage={onLimitChanged}
                                                    page={currentPage}
                                                    onChangePage={onPageChanged}
                                                    count={count}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                                )}
                            </span>
                        )}
                    </Grid>
                </Grid>

            </Container>
                )}

}

export default observer(Pokemon);