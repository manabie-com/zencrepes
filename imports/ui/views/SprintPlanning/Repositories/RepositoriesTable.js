import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { connect } from "react-redux";
import { GithubCircle } from 'mdi-material-ui'
import { Link } from 'react-router-dom';

import {
    // State or Local Processing Plugins
    SelectionState,
    PagingState,
    IntegratedSelection,
    IntegratedPaging,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    ColumnChooser,
    TableColumnVisibility,
    TableSelection,
    Toolbar,
} from '@devexpress/dx-react-grid-material-ui';

const styles = theme => ({
    root: {
    },
});

class RepositoriesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'orglogin', title: 'Org', getCellValue: row => (row.org.login) },
                { name: 'name', title: 'Repo' },
                { name: 'issues', title: 'Issues', getCellValue: row => (row.issues ? row.issues.count : undefined)},
                { name: 'points', title: 'Points', getCellValue: row => (row.issues ? row.points.count : undefined)},
            ],
            tableColumnExtensions: [
                { columnName: 'issues', width: 70 },
                { columnName: 'points', width: 70 },
            ]
        };
    }

    render() {
        const { classes, repositories } = this.props;
        const { columns, tableColumnExtensions} = this.state;

        return (
            <div className={classes.root}>
                <Grid
                    rows={repositories}
                    columns={columns}
                >
                    <Table columnExtensions={tableColumnExtensions} />
                    <TableHeaderRow />
                </Grid>
            </div>
        );
    }
}

RepositoriesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatch = dispatch => ({

});

const mapState = state => ({

});

export default connect(mapState, mapDispatch)(withStyles(styles)(RepositoriesTable));