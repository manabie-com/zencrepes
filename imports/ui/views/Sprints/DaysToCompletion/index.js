import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux";

import PropTypes from "prop-types";

import CustomCard from "../../../components/CustomCard/index.js";
import DaysToCompletionBars from "../../../components/Charts/Nivo/DaysToCompletionBars.js";

class DaysToCompletion extends Component {
    constructor(props) {
        super(props);
    }

    /*
    TODO - Make it better, very very badly coded
    Find effortCountDays closest to current date
    */
    getTimeToCompletion(dataset) {
        const { defaultPoints } = this.props;
        let metric = 'points';
        if (!defaultPoints) {metric = 'issues';}

//        console.log(dataset);
        let effort = 0;
        if (dataset !== undefined ) {
            let filteredValues = dataset.filter(v => v.completion[metric].effort !== undefined)

            let rangeValues = [];
            effort = filteredValues.find(v => v.range === '4w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }

            effort = filteredValues.find(v => v.range === '8w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            effort = filteredValues.find(v => v.range === '12w');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            effort = filteredValues.find(v => v.range === 'all');
            if (effort !== undefined) {
                if (effort.completion[metric].effort !== undefined && effort.completion[metric].effort !== Infinity) {
                    rangeValues.push(effort);
                }
            }
            if (rangeValues.length === 0) {
                return '-';
            } else {
                return Math.round(rangeValues[0].completion[metric].effort, 1);
            }

        } else {
            return '-';
        }
    }

    getVelocityBar(dataset) {
        const { defaultPoints } = this.props;
        let metric = 'points';
        if (!defaultPoints) {metric = 'issues';}

        if (dataset !== undefined ) {
            dataset = dataset.filter(v => v.completion[metric].effort !== Infinity);
            dataset = dataset.map((v) => {
                return {x: v.range, y: v.completion[metric].effort}
            });
            return dataset;
        } else {
            return [];
        }
    }

    render() {
        const { velocity } = this.props;
        return (
            <CustomCard
                headerTitle="Forecast"
                headerFactTitle="Estimated completion in"
                headerFactValue={this.getTimeToCompletion(velocity.velocity) + " days"}
            >
                {!_.isEmpty(velocity) ? (
                    <DaysToCompletionBars velocity={velocity.velocity} defaultPoints={true} />
                ) : (
                    <span>No Data available</span>
                )}
            </CustomCard>
        );
    }
}

DaysToCompletion.propTypes = {
    defaultPoints: PropTypes.bool.isRequired,
    velocity: PropTypes.object.isRequired,
};

const mapState = state => ({
    velocity: state.sprintsView.velocity,
    defaultPoints: true,
});

export default connect(mapState, null)(DaysToCompletion);
