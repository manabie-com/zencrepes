import { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { cfgLabels } from './Minimongo.js';

import GitHubApi from '@octokit/rest';

class Labels extends Component {
    constructor (props) {
        super(props);

        this.octokit = new GitHubApi();
        this.octokit.authenticate({
            type: 'oauth',
            token: Meteor.user().services.github.accessToken
        });

        this.state = {

        };
    }

    componentDidMount() {
        console.log('Labels - Initialized');

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { setLoadFlag, loadFlag, loading} = this.props;

        if (loadFlag && loading === false) {
            setLoadFlag(false); // Right away set loadLabels to false
            this.loadLabels(); // Logic to load Labels
        }

    };

    loadLabels = async () => {
        const { setLoading, selectedName, selectedRepos, setChipRemaining, updateName, updateDescription, updateColor, newName, newDescription, newColor} = this.props;
        setLoading(true);  // Set labelsLoading to true to indicate labels are actually updating.

        for (let repo of selectedRepos) {
            console.log('Processing: ' + repo.name);
            let result = false;
            if (repo.label === undefined) {
                console.log('Label does not exist in this repo, creating');

                let labelName = newName;
                if (updateName === false) {
                    labelName = selectedName;
                }
                let labelColor = newColor.replace('#', '');
                let labelDescription = newDescription;
                if (updateDescription === false) {
                    labelDescription = '';
                }

                result = await this.octokit.issues.createLabel({
                    owner: repo.org.login,
                    repo: repo.name,
                    name: labelName,
                    color: labelColor,
                    description: labelDescription
                });

            } else {
                console.log('Label does exist, updating label: ' + selectedName);

                let updateObj = {
                    owner: repo.org.login,
                    repo: repo.name,
                    current_name: selectedName,
                };
                if (updateName !== false && repo.label.name !== newName) {
                    updateObj['name'] = newName;
                }
                if (updateColor !== false && repo.label.color !== newColor.replace('#', '')) {
                    updateObj['color'] = newColor.replace('#', '');
                }
                if (updateDescription !== false && repo.label.description !== newDescription) {
                    updateObj['description'] = newDescription;
                }

                if (!updateObj.hasOwnProperty('name') && !updateObj.hasOwnProperty('color') && !updateObj.hasOwnProperty('description')) {
                    console.log('Nothing to be changed, not sending a request to Github');
                } else {
                    console.log(updateObj);
                    result = await this.octokit.issues.updateLabel(updateObj);
                }
            }
            if (result !== false) {
                setChipRemaining(parseInt(result.headers['x-ratelimit-remaining']));
                console.log(result);

                let labelObj = {
                    id: result.data.node_id,
                    url: result.data.url,
                    color: result.data.color,
                    name: result.data.name,
                    description: result.data.description,
                    isDefault: result.data.default,
                    repo: repo,
                    refreshed: true,
                };
                await cfgLabels.upsert({
                    id: labelObj.id
                }, {
                    $set: labelObj
                });
            }
        }
        console.log('Update completed: ' + selectedRepos.length + ' labels processed');
        setLoading(false);
        this.props.history.push('/labels');
    };

    render() {
        return null;
    }
}

Labels.propTypes = {

};

const mapState = state => ({
    loadFlag: state.labelsconfiguration.loadFlag,
    loading: state.labelsconfiguration.loading,

    selectedName: state.labelsconfiguration.selectedName,
    selectedRepos: state.labelsconfiguration.selectedRepos,

    updateName: state.labelsconfiguration.updateName,
    updateDescription: state.labelsconfiguration.updateDescription,
    updateColor: state.labelsconfiguration.updateColor,

    newName: state.labelsconfiguration.newName,
    newDescription: state.labelsconfiguration.newDescription,
    newColor: state.labelsconfiguration.newColor,

});

const mapDispatch = dispatch => ({
    setLoadFlag: dispatch.labelsconfiguration.setLoadFlag,
    setLoading: dispatch.labelsconfiguration.setLoading,

    setChipRemaining: dispatch.chip.setRemaining,
});

export default connect(mapState, mapDispatch)(withRouter(Labels));
