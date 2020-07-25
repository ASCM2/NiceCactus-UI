import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  colorDefault: { backgroundColor: theme.palette.background.paper },
  root: {
    display: 'flex',
  },
  prev: {},
  header: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
}));

const ManageRelatedAppBar = (props) => {
  const { id, ...rest } = props;
  const classes = useStyles({ ...rest });
  const header = 'Pages reliées';

  return (
    <AppBar
      classes={{ colorDefault: classes.colorDefault }}
      position="static"
      color="default"
      elevation={1}
    >
      <Toolbar classes={{ root: classes.root }}>
        <Link
          replace
          to={{
            pathname: `/${id}`,
            state: { mode: 'edit' },
          }}
        >
          <IconButton aria-label="previous">
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
        <Typography
          classes={{ root: classes.header }}
          component="div"
          variant="body1"
          color="textPrimary"
        >
          {header}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

ManageRelatedAppBar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ManageRelatedAppBar;
