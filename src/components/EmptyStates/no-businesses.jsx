import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import emptyBox from '../images/empty-box.svg';


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
    backgroundImage: `url(${emptyBox})`,
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

const NoBusinesses = (props) => {
  const classes = useStyles(props);
  const { header, subheader } = props;

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

NoBusinesses.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
};

NoBusinesses.defaultProps = {
  header: "Aucun établissement n'est encore inscrit sur KHEOS",
  subheader: 'Soyez le tout premier établissement à le faire en cliquant sur le bouton "CREER UNE PAGE".',
};

export default NoBusinesses;
