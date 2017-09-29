import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const linkColor = '#2264ff';
const linkColorHover = '#1b3f8f';

const styles = {
    tableRowColumnTextLink: {
        link: {
            color: linkColor,
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
        },
        linkHover: {
            color: linkColorHover,
        },
        linkSelected: {
            color: linkColorHover,
            fontWeight: 700,
        },
    },
    tableView: {
        root: {
            marginTop: '5px',
            marginLeft: '5px',
        },
        row: {
            height: '19px',
            padding: '4px',
            fontSize: '13px',
        },
        rowColumn: {
            color: '#000',
            fontSize: '11px',
        },
        starred: {
            width: '70px',
        },
        name: {
            width: '400px',
        },
    },
};

class TableRowColumnTextLink extends Component {
    constructor(props) {
        super(props);

        this.styles = styles.tableRowColumnTextLink;

        this.state = {
            color: this.styles.link.color,
        };

        this.onMouseOverHandle = this.onMouseOverHandle.bind(this);
        this.onMouseOutHandle = this.onMouseOutHandle.bind(this);
    }

    onMouseOverHandle(event) {
        event.preventDefault();

        this.setState({
            color: this.styles.linkHover.color,
        });
    }

    onMouseOutHandle(event) {
        event.preventDefault();

        this.setState({
            color: this.styles.link.color,
        });
    }

    render() {
        const { text, onClickDashboard, isSelected, style } = this.props;
        const selectedStyle = isSelected ? this.styles.linkSelected : null;

        return (
            <TableRowColumn
                style={Object.assign({},
                    styles.tableView.row,
                    styles.tableView.rowColumn,
                    this.styles.link,
                    styles.tableView.name,
                    style,
                    this.state,
                    selectedStyle,
                )}
                onMouseOver={this.onMouseOverHandle}
                onMouseOut={this.onMouseOutHandle}
                onClick={onClickDashboard}
            >
                {text}
            </TableRowColumn>
        );
    }
}

TableRowColumnTextLink.propTypes = {
    text: PropTypes.string,
    onClickDashboard: PropTypes.func,
    isSelected: PropTypes.bool,
    style: PropTypes.object,
};

TableRowColumnTextLink.defaultProps = {
    text: '',
    onClickDashboard: Function.prototype,
    isSelected: false,
    style: null,
};

// Component

export default class DashboardselectTable extends Component {
    constructor(props) {
        super(props);

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);

        this.state = {
            selected: [1],
        };
    }

    handleRowSelection(selectedRows) {
        this.setState({
            selected: selectedRows,
        });
    }

    isSelected(index) {
        return this.state.selected.indexOf(index) !== -1;
    }

    render() {
        const { dashboards, onClickDashboard } = this.props;

        const style = styles.tableView;

        return (
            <div style={style.root}>
                <Table onRowSelection={this.handleRowSelection}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={style.row}>
                            <TableHeaderColumn style={Object.assign({}, style.row, style.starred)}>Starred</TableHeaderColumn>
                            <TableHeaderColumn style={Object.assign({}, style.row, style.name)}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={style.row}>Items</TableHeaderColumn>
                            <TableHeaderColumn style={style.row}>Owner</TableHeaderColumn>
                            <TableHeaderColumn style={style.row}>Created</TableHeaderColumn>
                            <TableHeaderColumn style={style.row}>Modified</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {dashboards.map(d => (
                            <TableRow key={d.id} style={style.row}>
                                <TableRowColumn style={Object.assign({}, style.row, style.rowColumn, style.starred)}>{`${!!d.starred}`}</TableRowColumn>
                                <TableRowColumnTextLink text={d.name} onClickDashboard={() => onClickDashboard(d.id)} isSelected={false} />
                                <TableRowColumn style={Object.assign({}, style.row, style.rowColumn)}>{d.numberOfItems}</TableRowColumn>
                                <TableRowColumn style={Object.assign({}, style.row, style.rowColumn)}>{d.owner}</TableRowColumn>
                                <TableRowColumn style={Object.assign({}, style.row, style.rowColumn)}>{d.created}</TableRowColumn>
                                <TableRowColumn style={Object.assign({}, style.row, style.rowColumn)}>{d.lastUpdated}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

DashboardselectTable.propTypes = {
    dashboards: PropTypes.array,
    onClickDashboard: PropTypes.func,
};

DashboardselectTable.defaultProps = {
    dashboards: [],
    onClickDashboard: Function.prototype,
};

// dashboards:(22) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// isFetching: false
// onClickDashboard: ƒ onClickDashboard(id)
// selectedId: ""
// viewFilter: "TABLE"