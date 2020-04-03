import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import sad from '../images/sad.svg';


const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50,
  },
  icon: {
    height: 150,
    width: 150,
    backgroundImage: `url(${sad})`,
    backgroundPostion: 'center',
    backgroundSize: 'contain',
  },
  header: {
    marginTop: 15,
  },
  subheader: {
    marginTop: 15,
  }
});

const ConnectionLost = (props) => {
  const { header, subheader, ...rest } = props;
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
    </div>
  );
};

ConnectionLost.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
};

ConnectionLost.defaultProps = {
  header: "Oups ! la connexion au serveur s'est interrompue.",
  subheader: 'Vérifiez votre connexion internet ou réessayez plus tard.',
};

export default ConnectionLost;
