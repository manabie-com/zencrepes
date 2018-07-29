import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Selects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load_issues: true,
            load_labels: true,
        };
    }

    componentDidMount() {
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            } else {
                localStorage.setItem(key, this.state[key]);
            }
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        localStorage.setItem(name, event.target.checked);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <List>
                    <ListItem>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.load_issues}
                                    onChange={this.handleChange('load_issues')}
                                    value="load_issues"
                                    color="primary"
                                />
                            }
                            label="Issues"
                        />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.load_labels}
                                    onChange={this.handleChange('load_labels')}
                                    value="load_labels"
                                    color="primary"
                                />
                            }
                            label="Labels"
                        />
                    </ListItem>
                </List>
            </div>
        );
    }
}

Selects.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Selects);