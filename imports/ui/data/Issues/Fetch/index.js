import React, { Component } from 'react';

import Data from './Data.js';

class IssuesFetch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Data />
            </React.Fragment>
        );
    }
}

export default IssuesFetch;
