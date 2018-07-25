import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Loading extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { classes, loading } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress />
                <Typography component="p">
                    Details about a particular repository from GitHub ...
                </Typography>
            </div>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object,
};

const mapState = state => ({
    loading: state.githubScanRepo.loading,

});

const mapDispatch = dispatch => ({

});

export default connect(mapState, mapDispatch)(withStyles(styles)(Loading));