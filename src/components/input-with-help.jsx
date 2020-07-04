import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import HelpIcon from '@material-ui/icons/Help';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  input: {
    flexGrow: 1,
  },
  helpContainer: {
    position: 'relative',
    top: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
  },
}));

const InputWithHelp = (props) => {
  const { input, message, ...rest } = props;
  const classes = useStyles({ ...rest });

  return (
    <div className={classes.root}>
      {input(classes.input)}
      <div className={classes.helpContainer}>
        <Tooltip placement="top" arrow title={message}>
          <IconButton aria-label="help">
            <HelpIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

InputWithHelp.propTypes = {
  input: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default InputWithHelp;
