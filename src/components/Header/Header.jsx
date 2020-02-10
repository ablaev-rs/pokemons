import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >
                    Pokemons
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Header;