import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import FirstIssue from './FirstIssue/index.js';
import CreateButton from './CreateButton.js';
import SprintName from './SprintName.js';

const styles = theme => ({
    root: {
    }
});

class CreateSprint extends Component {
    constructor (props) {
        super(props);
        this.state = {
            sprintDate: '',
        };
    }

    close = () => {
        const { setOpenCreateSprint } = this.props;
        setOpenCreateSprint(false);
    };

    create = () => {
        const { setOpenCreateSprint, setLoadFlag, setRepos, setName, setEndDate } = this.props;
        setOpenCreateSprint(false);
    };


    changeSprintDate = name => event => {
        console.log(event.target.value);
        this.setState({
            'sprintDate': event.target.value
        });
    };

    render() {
        const { classes, openCreateSprint } = this.props;
        if (openCreateSprint) {
            let twoWeeksFromNow = new Date(new Date().getTime() + (15*24*60*60*1000));
            return (
                <Dialog aria-labelledby="simple-dialog-title" open={openCreateSprint}>
                    <DialogTitle id="simple-dialog-title">Create Sprint</DialogTitle>
                    <DialogContent className={classes.root}>
                        <SprintName />
                        <TextField
                            id="date"
                            label="End Date"
                            type="date"
                            defaultValue={twoWeeksFromNow.getFullYear() + "-" + (twoWeeksFromNow.getMonth()+1 < 10 ? '0' : '') + (twoWeeksFromNow.getMonth()+1) + "-" + (twoWeeksFromNow.getDate() < 10 ? '0' : '') + (twoWeeksFromNow.getDate())}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.changeSprintDate()}
                        />
                        <FirstIssue />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.close} color="primary" autoFocus>
                            Close
                        </Button>
                        <CreateButton />
                    </DialogActions>
                </Dialog>
            );
        } else {
            return null;
        }

    };
}

CreateSprint.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = state => ({
    openCreateSprint: state.sprintPlanning.openCreateSprint,

});

const mapDispatch = dispatch => ({
    setOpenCreateSprint: dispatch.sprintPlanning.setOpenCreateSprint,

    setLoadFlag: dispatch.githubCreateMilestones.setLoadFlag,
    setRepos: dispatch.githubCreateMilestones.setRepos,
    setName: dispatch.githubCreateMilestones.setName,
    setEndDate: dispatch.githubCreateMilestones.setEndDate,

});

export default connect(mapState, mapDispatch)(withStyles(styles)(CreateSprint));