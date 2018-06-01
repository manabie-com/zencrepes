import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import Button from '@material-ui/core/Button';

import { connect } from "react-redux";

import QueryFacets from './QueryFacets.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        top: 30,
        //position: 'relative',
        display: 'flex',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class Query extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    openQueryManager = () => {
        const { setOpenQueryManager } = this.props;
        setOpenQueryManager(true);
    };

    openSaveQuery = () => {
        const { setOpenSaveQuery } = this.props;
        setOpenSaveQuery(true);
    };

    render() {
        const { classes, queryValues, mongoFilters } = this.props;
        console.log(queryValues);
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        {Object.keys(queryValues).map(idx => {
                            return (
                                <Paper className={classes.root} key={idx}>
                                    <QueryFacets queryContent={queryValues[idx]} />
                                </Paper>
                            );
                        })}
                        <br />Filter Object: <i>{JSON.stringify(queryValues)}</i>
                        <br />Mongo Filter: <i>{JSON.stringify(mongoFilters)}</i>
                        <br />
                        <Button onClick={this.openSaveQuery} color="primary" autoFocus>
                            Save Query
                        </Button>
                        <Button onClick={this.openQueryManager} color="primary" autoFocus>
                            Open Query Manager
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

Query.propTypes = {
    classes: PropTypes.object.isRequired,
    queryValues: PropTypes.object.isRequired,
};


const mapState = state => ({
    queryValues: state.data.filters,
    mongoFilters: state.data.mongoFilters,
});

const mapDispatch = dispatch => ({
    setOpenQueryManager: dispatch.queries.setOpenQueryManager,
    setOpenSaveQuery: dispatch.queries.setOpenSaveQuery,
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Query));
