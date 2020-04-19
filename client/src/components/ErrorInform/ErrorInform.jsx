import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {observer} from "mobx-react";

class ErrorInform extends React.Component {

    render() {

        const { errorStatus, errorMessage } = this.props;

        return (
            <Alert severity={errorStatus}>{errorMessage}</Alert>
        );
    };
}

export default observer(ErrorInform);