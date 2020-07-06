import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ({ color }) => color,
    height: '100%',
  },
  icon: {
    height: '50%',
    width: '50%',
  },
});

const Portrait = (props) => {
  const {
    icon: Icon, color, onClick, ...rest
  } = props;
  const classes = useStyles({ color, ...rest });

  return (
    <div
      className={classes.root}
      role="button"
      tabIndex={0}
      onKeyPress={() => onClick()}
      onClick={() => onClick()}
    >
      <Icon style={{ color: '#fff' }} classes={{ root: classes.icon }} />
    </div>
  );
};

Portrait.propTypes = {
  icon: PropTypes.elementType,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Portrait.defaultProps = {
  icon: 'div',
  color: blue[300],
  onClick: () => {},
};

export default Portrait;
