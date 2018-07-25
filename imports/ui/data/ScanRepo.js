import { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';

import GET_GITHUB_SINGLEREPO from '../../graphql/getSingleRepo.graphql';

import { cfgSources } from './Minimongo.js';

/*
Load data about Github Orgs
 */
class ScanRepo extends Component {
    constructor (props) {
        super(props);
        this.repositories = [];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { setLoadFlag, loadFlag } = this.props;
        if (loadFlag) {
            console.log('ScanOrg - Initiating load');
            setLoadFlag(false); // Right away set loadRepositories to false
            this.load();           // Logic to load Issues
        }
    };

    load = async () => {
        const { client, updateChip, setLoading, setLoadError, orgName, repoName, setRepoData } = this.props;

        setLoading(true);       // Set loading to true to indicate content is actually loading.
        setLoadError(false);
        console.log('Getting data about Organization: ' + name + ' - Repository: ' + repoName);

        let data = await client.query({
            query: GET_GITHUB_SINGLEREPO,
            variables: {org_name: orgName, repo_name: repoName},
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        });

        updateChip(data.data.rateLimit);
        if (data.data.repository === null) {
            setLoadError(true);
        } else {
            let repoObj = {
                id: data.data.repository.id,
                name: data.data.repository.name,
                url: data.data.repository.url,
                issues: data.data.repository.issues,
                labels: data.data.repository.labels,
                databaseId: data.data.repository.databaseId,
                org: {
                    login: data.data.repository.owner.login,
                    name: data.data.repository.owner.login,
                    id: data.data.repository.owner.id,
                    url: data.data.repository.owner.url,
                },
                active: true,
            };
            setRepoData(repoObj);
            await cfgSources.upsert({
                id: repoObj.id
            }, {
                $set: repoObj
            });
        }
        setLoading(false);
    };

    render() {
        return null;
    }
}

ScanRepo.propTypes = {

};

const mapState = state => ({
    loadFlag: state.githubScanRepo.loadFlag,
    loading: state.githubScanRepo.loading,

    orgName: state.githubScanRepo.orgName,
    repoName: state.githubScanRepo.repoName,
});

const mapDispatch = dispatch => ({
    setLoadFlag: dispatch.githubScanRepo.setLoadFlag,
    setLoading: dispatch.githubScanRepo.setLoading,
    setLoadError: dispatch.githubScanRepo.setLoadError,

    setRepoData: dispatch.githubScanRepo.setRepoData,

    updateChip: dispatch.chip.updateChip,
});

export default connect(mapState, mapDispatch)(withApollo(ScanRepo));
