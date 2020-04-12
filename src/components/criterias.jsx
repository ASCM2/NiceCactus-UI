import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  criteria: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  label: {
    marginLeft: theme.spacing(1),
  }
}));

const Criterias = (props) => {
  const { initialActive, onSelect, ...rest } = props;
  const [active, setActive] = useState(initialActive);
  const classes = useStyles({ ...rest });
  const onChange = (criteria) => (event) => {
    const { checked } = event.target;

    if (checked) {
      setActive(criteria); onSelect(criteria);
    } else {
      setActive(null); onSelect(null);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.criteria}>
        <Checkbox
          checked={active === 'LIKED_MOST'}
          color="secondary"
          inputProps={{ 'aria-label': 'The most liked' }}
          onChange={onChange('LIKED_MOST')}
        />
        <Typography className={classes.label} variant="subtitle2" color="textSecondary">Les plus aimés</Typography>
      </div>
      <div className={classes.criteria}>
        <Checkbox
          checked={active === 'FOLLOWED_MOST'}
          color="secondary"
          inputProps={{ 'aria-label': 'The most followed' }}
          onChange={onChange('FOLLOWED_MOST')}
        />
        <Typography className={classes.label} variant="subtitle2" color="textSecondary">Les plus suivis</Typography>
      </div>
      {/*
        <div className={classes.criteria}>
          <Checkbox
            checked={active === 'Nearest'}
            color="secondary"
            inputProps={{ 'aria-label': 'The nearest' }}
            onChange={onChange('Nearest')}
          />
          <Typography className={classes.label} variant="subtitle2" color="textSecondary">
            Les plus proches
          </Typography>
        </div>
      */}
    </div>
  );
};

Criterias.propTypes = {
  /* The active criteria selected by the user. */
  initialActive: PropTypes.oneOf(['LIKED_MOST', 'FOLLOWED_MOST']),
  /* Function called with active name of the criteria selected or null otherwise. */
  onSelect: PropTypes.func.isRequired,
};

Criterias.defaultProps = {
  /* By default the user is considered not having chosen a criteria. */
  initialActive: null,
};

export default Criterias;
