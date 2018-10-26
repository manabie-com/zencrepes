import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from "react-redux";

const styles = theme => ({
    root: {
        height: '5opx',
        /*
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        */
    },
});


class IssuesQuery extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const { classes, query } = this.props;
        return (
            <div className={classes.root}>
                <h4>Query: {JSON.stringify(query)}</h4>
            </div>
        );
    }
}

IssuesQuery.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = state => ({
    query: state.issuesView.query,

});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(withStyles(styles)(IssuesQuery));