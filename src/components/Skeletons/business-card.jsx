/* Tests (début)

    Effectuer un snapshot du composant actuel.

   Tests (fin) */

/*
 * Skeleton du compsant représentant les établissemnts sous forme de carte en
 * page d'accueil
 */

import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  media: {
    width: '100%',
    height: 227,
  },
  label: {
    display: 'inline-block',
    height: 25,
    width: 140,
  },
  sideMediaContainer: {
    marginTop: theme.spacing(2),
    padding: 5,
    display: 'flex',
  },
  sideMedia: {
    width: 114,
    height: 114,
  },
  sideMediaContent: {
    flexGrow: 1,
    paddingTop: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightActions: {
    display: 'flex',
  },
  share: {
    marginLeft: 8,
  },
}));

const BusinessCardSkeleton = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <Skeleton className={classes.media} variant="rect" />
      <Skeleton className={classes.label} variant="rect" animation="wave" />
      <div className={classes.sideMediaContainer}>
        <Skeleton className={classes.sideMedia} variant="rect" animation="wave" />
        <CardContent className={classes.sideMediaContent}>
          <Skeleton variant="text" animation="wave" />
          <Skeleton width={150} variant="text" animation="wave" />
        </CardContent>
      </div>
      <CardContent>
        <Skeleton variant="text" animation="wave" />
        <Skeleton width={150} variant="text" animation="wave" />
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Skeleton className={classes.mainButton} animation="wave" variant="rect" width={114} height={35} />
        <div className={classes.rightActions}>
          <Skeleton className={classes.like} animation="wave" variant="circle" width={35} height={35} />
          <Skeleton className={classes.share} animation="wave" variant="circle" width={35} height={35} />
        </div>
      </CardActions>
    </Card>
  );
};

export default BusinessCardSkeleton;
