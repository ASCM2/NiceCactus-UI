import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {},
});

const Subtitle = (props) => {
  const { subtitle, ...rest } = props;
  const classes = useStyles({ ...rest });

  return (
    <Typography
      className={classes.root}
      variant="subtitle1"
      component="div"
    >
      {subtitle}
    </Typography>
  );
}

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

export default Subtitle;
