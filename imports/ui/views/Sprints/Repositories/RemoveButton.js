import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {connect} from "react-redux";

const styles = theme => ({
    root: {
    },
});

class RemoveButton extends Component {
    constructor (props) {
        super(props);
    }

    remove = () => {
        const { milestone } = this.props;
        console.log(milestone);

        const { setStageFlag, setVerifFlag, setMilestones, setAction, setVerifying, setOnSuccess, updateView } = this.props;
        setMilestones([milestone]);
        setOnSuccess(updateView);
        setAction('delete');
        setVerifying(true);
        setStageFlag(true);
        setVerifFlag(true);
    };

    render() {
        const { classes } = this.props;
        return (
            <IconButton aria-label="Delete" className={classes.margin} onClick={this.remove}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        );
    }
}

RemoveButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = state => ({
    verifiedRepos: state.milestonesCreate.verifiedRepos,
    repos: state.milestonesCreate.repos,
});

const mapDispatch = dispatch => ({
    setStageFlag: dispatch.milestonesEdit.setStageFlag,
    setVerifFlag: dispatch.milestonesEdit.setVerifFlag,
    setVerifying: dispatch.milestonesEdit.setVerifying,

    setMilestones: dispatch.milestonesEdit.setMilestones,
    setAction: dispatch.milestonesEdit.setAction,

    setOnSuccess: dispatch.milestonesEdit.setOnSuccess,

    updateView: dispatch.sprintsView.updateView,

});

export default connect(mapState, mapDispatch)(withStyles(styles)(RemoveButton));