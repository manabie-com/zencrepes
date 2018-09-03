import { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';

import { cfgSources } from './Minimongo.js';
import { cfgIssues } from "./Minimongo.js";

import GitHubApi from '@octokit/rest';
import {cfgLabels} from "./Minimongo";

class PushPoints extends Component {
    constructor (props) {
        super(props);

        this.octokit = new GitHubApi();
        this.octokit.authenticate({
            type: 'oauth',
            token: Meteor.user().services.github.accessToken
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { setLoadFlag, loadFlag } = this.props;
        if (loadFlag) {
            console.log('FetchZenhubPoints - Initiating load');
            setLoadFlag(false);     // Right away set loadRepositories to false
            this.load();            // Logic to load Issues
        }
    };

    // Component should only be updated if loadflag move from false to true (request to load data).
    shouldComponentUpdate(nextProps, nextState) {
        const { loadFlag } = this.props;
        if (!loadFlag && nextProps.loadFlag) {
            return true;
        } else {
            return false;
        }
    };

    load = async () => {
        const { setLoading, setLoadError, setMessage, setLoadSuccess, setUpdatedIssues, incrementUpdatedIssues, setChipRemaining } = this.props;

        setLoading(true);       // Set loading to true to indicate content is actually loading.
        setLoadError(false);
        setLoadSuccess(false);
        setUpdatedIssues(0);

        //Only work with issues for which points are not null
        for (let issue of cfgIssues.find({points:{ $exists: true, $ne: null }}).fetch()) {
            let pointsLabel = 'SP:' + issue.points;
            console.log('Processing issue: ' + issue.title);
            let existingLabels = [];
            if (issue.labels.totalCount > 0) {
                existingLabels = issue.labels.edges.map(label => label.node.name);
            }
            if (!existingLabels.includes(pointsLabel)) {
                console.log('Label: ' + pointsLabel + ' is not attached to issue');
                let result = false;
                try {
                    result = await this.octokit.issues.addLabels({
                        owner: issue.org.login,
                        repo: issue.repo.name,
                        number: issue.number,
                        labels: [pointsLabel]
                    });
                }
                catch (error) {
                    console.log(error);
                }
                if (result !== false) {
                    setChipRemaining(parseInt(result.headers['x-ratelimit-remaining']));
                    console.log(result);

                    //Prepare results data
                    let updatedData = result.data.map((label) => {
                        label['databaseId'] = label.id;
                        label['id'] = label.node_id;
                        return {
                            node: label
                        };
                    });

                    let issueObj = {
                        labels: {
                            totalCount: result.data.length,
                            edges: updatedData
                        },
                    };
                    await cfgIssues.upsert({
                        id: issue.id
                    }, {
                        $set: issueObj
                    });
                }
                incrementUpdatedIssues(1);
            }
        }
        setLoadSuccess(true);
        setLoading(false);
    };

    render() {
        return null;
    }
}

PushPoints.propTypes = {

};

const mapState = state => ({
    loadFlag: state.githubPushPoints.loadFlag,
    loading: state.githubPushPoints.loading,

});

const mapDispatch = dispatch => ({
    setLoadFlag: dispatch.githubPushPoints.setLoadFlag,
    setLoading: dispatch.githubPushPoints.setLoading,
    setLoadError: dispatch.githubPushPoints.setLoadError,
    setLoadSuccess: dispatch.githubPushPoints.setLoadSuccess,
    setMessage: dispatch.githubPushPoints.setMessage,

    setUpdatedIssues: dispatch.githubPushPoints.setUpdatedIssues,
    incrementUpdatedIssues: dispatch.githubPushPoints.setIncrementUpdatedIssues,

    setChipRemaining: dispatch.chip.setRemaining,

});

export default connect(mapState, mapDispatch)(withApollo(PushPoints));