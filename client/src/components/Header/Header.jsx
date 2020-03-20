import React from 'react';
import {observer} from "mobx-react";
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'flex'
    }
};

class HeaderDefault extends React.Component {

    render() {

        const {classes} = this.props;

        const logoutHandler = (e) => {
            e.preventDefault();
            this.props.logout();
        };

        const favoritePokemonHandler = (e) => {
            e.preventDefault();
            this.props.listFavorite(this.props.token);
        };

        const loadPokemonsHandler = (e) => {
            e.preventDefault();
            this.props.loadPokemons();
        };


        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Pokemon
                        </Typography>
                        {!this.props.token ?
                            <span>
                                <Link component={RouterLink} to="/signin" color={"inherit"}>
                                    LOGIN
                                </Link>
                            </span>
                            :
                            <span>
                                <Link component={RouterLink} to="/" color={"inherit"} onClick={loadPokemonsHandler}>
                                    <HomeIcon />
                                </Link>
                                <Link component={RouterLink} to="/favorite" color={"inherit"} onClick={favoritePokemonHandler}>
                                    <BookmarkBorderIcon />
                                </Link>
                                <Link component={RouterLink} to="/logout" color={"inherit"} onClick={logoutHandler}>
                                    <ExitToAppIcon />
                                </Link>
                            </span>}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const Header = withStyles(styles)(HeaderDefault);

export default observer(Header);