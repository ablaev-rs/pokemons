import React from 'react';
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

class Pokemon extends React.Component {

    componentDidMount() {
        this.props.store.loadPokemons();
    }

    render() {
        const {
            Pokemons,
            count, limit, perPage, currentPage, loading, onLimitChanged, onPageChanged,
            setTemplateSearchByName,
            pokemonTypes, setSelectedTypes, selectedTypes,
            clearForm} = this.props.store;

        let setColorType = (name) => {
            switch (name) {
                case "bug": return s.bug; break;
                case "dark": return s.dark; break;
                case "dragon": return s.dragon; break;
                case "electric": return s.electric; break;
                case "fairy": return s.fairy; break;
                case "fighting": return s.fighting; break;
                case "fire": return s.fire; break;
                case "flying": return s.flying; break;
                case "ghost": return s.ghost; break;
                case "grass": return s.grass; break;
                case "ground": return s.ground; break;
                case "ice": return s.ice; break;
                case "normal": return s.normal; break;
                case "poison": return s.poison; break;
                case "psychic": return s.psychic; break;
                case "rock": return s.rock; break;
                case "steel": return s.steel; break;
                case "water": return s.water; break;
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
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={2} lg={2}>

                        <form onSubmit={setTemplateSearchByName}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Search by Name
                            </InputLabel>
                            <Input type="text"
                                   name="templatePokemonName"
                                   placeholder="Enter pokemon's name" />
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
                                                        alt={p.data.name}/><br/><strong>{p.data.name}</strong></TableCell>
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