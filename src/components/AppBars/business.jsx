import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Face';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  colorDefault: { backgroundColor: theme.palette.background.paper },
  root: {
    display: 'flex',
  },
  header: {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: 50,
  },
  toggleMode: {
    color: 'white',
  },
}));

const BusinessAppBar = (props) => {
  const {
    owner, mode, flat,
    shortname, longname,
    toggleMode, back, ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const theme = useTheme();
  const onTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const header = onTablet ? shortname : longname;

  const editLabel = 'Mode édition';
  const viewLabel = 'Mode visiteur';

  return (
    <AppBar
      classes={{ colorDefault: classes.colorDefault }}
      position="static"
      color="default"
      elevation={flat ? 0 : 4}
    >
      <Toolbar classes={{ root: classes.root }}>
        <IconButton aria-label="previous" onClick={back}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        <Typography
          classes={{ root: classes.header }}
          variant="body1"
          component="div"
          noWrap
        >
          {header}
        </Typography>
        {owner && (
          <Button
            classes={{ root: classes.toggleMode }}
            variant="contained"
            color="secondary"
            onClick={toggleMode}
          >
            {mode === 'view' && <EditIcon />}
            {mode === 'edit' && <ViewIcon />}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              {mode === 'view' && editLabel}
              {mode === 'edit' && viewLabel}
            </Typography>
          </Button>
        )}
      </Toolbar>
      {flat && <Divider />}
    </AppBar>
  );
};

BusinessAppBar.propTypes = {
  flat: PropTypes.bool.isRequired,
  owner: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']).isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

BusinessAppBar.defaultProps = {
  owner: false,
};

export default BusinessAppBar;
