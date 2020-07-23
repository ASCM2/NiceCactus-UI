import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import empty from '../images/empty-description.svg';


const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 50,
  },
  icon: {
    height: 150,
    width: 150,
    backgroundImage: `url(${empty})`,
    backgroundPostion: 'center',
    backgroundSize: 'contain',
  },
  header: {
    marginTop: 15,
  },
  subheader: {
    marginTop: 15,
  },
  create: {
    marginTop: 20,
  }
});

const EmptyDescription = (props) => {
  const createLabel = 'Me présenter';

  const {
    owner, mode,
    header, subheader, onClick,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <div className={classes.root}>
      <div className={classes.icon} />
      <Typography className={classes.header} component="div" variant="h6" color="textPrimary">
        {header}
      </Typography>
      <Typography className={classes.subheader} component="div" variant="subtitle2" color="textSecondary">
        {subheader}
      </Typography>
      {owner && mode === 'edit' && (
        <Button
          classes={{ root: classes.create }}
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          {createLabel}
        </Button>
      )}
    </div>
  );
};

EmptyDescription.propTypes = {
  owner: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']),
  header: PropTypes.string,
  subheader: PropTypes.string,
  onClick: PropTypes.func,
};

EmptyDescription.defaultProps = {
  owner: false,
  mode: 'view',
  header: "Le propriétaire de cette page n'a pas encore présenté son établissement",
  subheader: 'Revenez un peu plus tard ou demandez-lui gentiment de le faire si vous le connaissez.',
  onClick: () => {},
};

export default EmptyDescription;
