import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import dashboardStyle from "../../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import Sidebar from '../../../components/Sidebar/index.js';
import Footer from '../../../components/Footer/Footer.js';
import Header from '../../../components/Header/index.js';

import PropTypes from "prop-types";

import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';

import { cfgMilestones } from "../../../data/Minimongo";

import MilestonesFetch from '../../../data/Milestones/Fetch/index.js';
import MilestonesEdit from '../../../data/Milestones/Edit/index.js';

import MilestonesTable from './MilestonesTable.js';
import LoadButton from './LoadButton.js';
import DeleteClosedEmptyButton from './DeleteClosedEmptyButton.js';

class LabelsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    componentDidMount() {
        const { updateMilestones } = this.props;
        updateMilestones();
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrapper}>
                <Sidebar
                    logoText={"Zen Crepes"}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        handleDrawerToggle={this.handleDrawerToggle}
                        pageName={"List Milestones"}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <h3>TODO: Chart to display a breakdown of open/closed milestones</h3>
                                    <LoadButton />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <h3>TODO: Chart & Button to show Milestones with a mixed closed/open</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <h3>TODO: Chart & Button to show closed milestones with 0 issues</h3>
                                    <DeleteClosedEmptyButton />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <MilestonesEdit loadModal={true} />
                                    <MilestonesFetch loadModal={false} />
                                    <MilestonesTable />
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

LabelsList.propTypes = {
    classes: PropTypes.object,
};

const mapState = state => ({

});

const mapDispatch = dispatch => ({
    updateMilestones: dispatch.milestonesView.updateMilestones,

});

export default connect(mapState, mapDispatch)(withRouter(withStyles(dashboardStyle)(LabelsList)));
