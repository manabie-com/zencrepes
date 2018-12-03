import { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';

import GET_GITHUB_SINGLE_MILESTONE from '../../../../graphql/getSingleMilestone.graphql';

import { cfgMilestones } from '../../Minimongo.js';

class Verification extends Component {
    constructor (props) {
        super(props);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { setVerifFlag, verifFlag } = this.props;
        // Only trigger load if loadFlag transitioned from false to true
        if (verifFlag === true && prevProps.verifFlag === false) {
            setVerifFlag(false);
            this.load();
        }
    };

    load = async () => {
        const { setVerifying, milestones, setVerifiedMilestones, insVerifiedMilestones, client } = this.props;
        setVerifiedMilestones([]);
        for (let milestone of milestones) {
            let data = {};
            try {
                data = await client.query({
                    query: GET_GITHUB_SINGLE_MILESTONE,
                    variables: {org_name: milestone.org.login, repo_name: milestone.repo.name, milestone_number: milestone.number},
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore',
                });
            }
            catch (error) {
                console.log(error);
            }
            console.log(data);
            if (data.data !== null) {
                if (data.data.repository.milestone === null) {
                    // The milestone doesn't exist anymore on GitHub.
                    insVerifiedMilestones({
                        id: milestone.id,
                        error: true,
                        errorMsg: 'This milestone doesn\'t exist in Github currently. Was it deleted ?',
                    });
                    await cfgMilestones.remove({'id': milestone.id});
                } else {
                    if (data.data.repository.milestone.updatedAt === milestone.updatedAt && data.data.repository.milestone.issues.totalCount === milestone.issues.totalCount) {
                        insVerifiedMilestones({
                            ...data.data.repository.milestone,
                            error: false,
                        })
                    }
                    else if (data.data.repository.milestone.updatedAt !== milestone.updatedAt) {
                        insVerifiedMilestones({
                            ...data.data.repository.milestone,
                            error: true,
                            errorMsg: 'This milestone has been modified in GitHub since it was last loaded locally. updatedAt dates are different',
                        })

                    } else if (data.data.repository.milestone.issues.totalCount !== milestone.issues.totalCount) {
                        insVerifiedMilestones({
                            ...data.data.repository.milestone,
                            error: true,
                            errorMsg: 'This milestone has been modified in GitHub since it was last loaded locally. updatedAt dates are different',
                        })
                    }
                    await cfgMilestones.upsert({
                        id: data.data.repository.milestone.id
                    }, {
                        $set: data.data.repository.milestone
                    });
                }
                this.props.updateChip(data.data.rateLimit);
            }
        }
        setVerifying(false);
    };

    render() {
        return null;
    }
}

Verification.propTypes = {

};

const mapState = state => ({
    verifFlag: state.milestonesEdit.verifFlag,
    verifying: state.milestonesEdit.verifying,

    milestones: state.milestonesEdit.milestones,
});

const mapDispatch = dispatch => ({
    setVerifFlag: dispatch.milestonesEdit.setVerifFlag,
    setVerifying: dispatch.milestonesEdit.setVerifying,
    setVerifiedMilestones: dispatch.milestonesEdit.setVerifiedMilestones,
    insVerifiedMilestones: dispatch.milestonesEdit.insVerifiedMilestones,

    updateChip: dispatch.chip.updateChip,
});

export default connect(mapState, mapDispatch)(withApollo(Verification));