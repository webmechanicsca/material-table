/* eslint-disable no-unused-vars */
import { Icon, IconButton, withStyles, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */

class MTablePaginationInner extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    const localization = { ...MTablePaginationInner.defaultProps.localization, ...this.props.localization };    

    return (      
      <div className={classes.root}>
        <Tooltip title={localization.firstTooltip}>
          <span>
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label={localization.firstAriaLabel}
            >
              { theme.direction === 'rtl' ? <this.props.icons.LastPage /> : <this.props.icons.FirstPage /> }
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={localization.previousTooltip}>
          <span>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label={localization.previousAriaLabel}
            >
              { theme.direction === 'rtl' ? <this.props.icons.NextPage /> : <this.props.icons.PreviousPage /> }
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={localization.nextTooltip}>
          <span>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label={localization.nextAriaLabel}
            >
              { theme.direction === 'rtl' ? <this.props.icons.PreviousPage /> : <this.props.icons.NextPage /> }
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={localization.lastTooltip}>
          <span>
            <IconButton
              onClick={this.handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label={localization.lastAriaLabel}
            >
              { theme.direction === 'rtl' ? <this.props.icons.FirstPage /> : <this.props.icons.LastPage /> }
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  }
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.direction === 'rtl' ? 0 : theme.spacing.unit * 2.5,
    marginRight: theme.direction === 'rtl' ? theme.spacing.unit * 2.5 : 0,
  }
});

MTablePaginationInner.propTypes = {
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  classes: PropTypes.object,
  localization: PropTypes.object,
  theme: PropTypes.any
};

MTablePaginationInner.defaultProps = {
  localization: {
    firstTooltip: 'First Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:'
  }
};

const MTablePagination = withStyles(actionsStyles, { withTheme: true })(MTablePaginationInner);

export default MTablePagination;
