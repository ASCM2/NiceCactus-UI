import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const cardWidth = 200;
const cardHeight = 200;
const useStyles = makeStyles({
  root: {
    width: cardWidth,
    height: cardHeight,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: ({ role, hideButton }) => ({
    display: role === 'computer' && !hideButton ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  action: ({ role, hideButton }) => ({
    visibility: role === 'computer' && hideButton ? 'hidden' : 'visible',
  }),
})

const playLabel = 'Play !';
const PlayerCard = (props) => {
  const { label, onClick, ...rest } = props;
  const classes = useStyles({ ...rest });

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.content }}>
        <Typography align="center" component="div" variant="h5">
          {label}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.actionContainer }}>
        <Button
          classes={{ root: classes.action }}
          color="primary"
          variant="contained"
          onClick={onClick}
        >
          {playLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

PlayerCard.propTypes = {
  label: PropTypes.string,
  role: PropTypes.oneOf(['player', 'computer']).isRequired,
  hideButton: PropTypes.bool,
  onClick: PropTypes.func,
};

PlayerCard.defaultProps = {
  label: null,
  hideButton: true,
  onClick: () => {},
};

export default PlayerCard;
