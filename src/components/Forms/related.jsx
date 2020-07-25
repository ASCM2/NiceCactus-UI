import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Skeleton from '@material-ui/lab/Skeleton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

import { useTheme, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';

import BackgroundImage from '../background-image';
import Portrait from '../portrait';
import RelatedFormAnimation from '../Animations/related';
import businessIcon from '../business-icon';


const promoteTheme = createMuiTheme({
  palette: {
    primary: red,
    background: {
      default: '#fff',
    },
  },
});

const height = 90;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    height,
    display: 'flex',
  },
  media: {
    width: 200,
    height: 'inherit',
    '@media screen and (max-width: 700px)': {
      width: 100,
    },
  },
  content: {
    minWidth: 200,
    flexGrow: 1,
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  shortname: {
    marginTop: theme.spacing(1),
    textTransform: 'capitalize',
  },
  smalldescription: {
    marginTop: theme.spacing(1),
    height: 40,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actions: {
    height: 'inherit',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
}));

const promoteLabel = 'Promouvoir';
const downgradeLabel = 'Promu';
const RelatedForm = (props) => {
  const theme = useTheme();

  const {
    show,
    category, image, promoted,
    shortname, smalldescription,
    promote, downgrade, onDelete,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  const Icon = businessIcon(category);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RelatedFormAnimation
        show={show}
        height={height}
        node={(transitionStyles) => (
          <Paper
            style={transitionStyles}
            className={classes.root}
            square
          >
            <BackgroundImage
              classes={{ root: classes.media }}
              alt={image.alt}
              src={image.src}
              loading={<Skeleton variant="rect" width="100%" height="100%" />}
              error={
                <Portrait classes={{ root: classes.media }} icon={Icon} />
              }
            />
            <div className={classes.content}>
              <Typography
                variant="body1"
                component="div"
                color="textPrimary"
                classes={{ root: classes.shortname }}
              >
                {shortname}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="textSecondary"
                classes={{ root: classes.smalldescription }}
              >
                {smalldescription}
              </Typography>
            </div>
            <div className={classes.actions}>
              <Button
                color={!promoted ? 'primary' : 'default'}
                variant="contained"
                onClick={!promoted ? promote : downgrade}
              >
                {!promoted ? (
                  <FavoriteIcon />
                ) : (
                  <ThemeProvider theme={promoteTheme}>
                    <FavoriteIcon color="primary" />
                  </ThemeProvider>
                )}
                <span style={{ marginLeft: theme.spacing(1) }}>
                  {!promoted ? promoteLabel : downgradeLabel}
                </span>
              </Button>
              <IconButton
                style={{ marginLeft: theme.spacing(1) }}
                aria-label="Delete"
                onClick={onDelete}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </div>
          </Paper>
        )}
      />
    </ThemeProvider>
  );
};

RelatedForm.propTypes = {
  show: PropTypes.bool,
  image: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
  }),
  category: PropTypes.string.isRequired,
  promoted: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  smalldescription: PropTypes.string.isRequired,
  promote: PropTypes.func.isRequired,
  downgrade: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

RelatedForm.defaultProps = {
  show: true,
  image: {},
  promoted: false,
};

export default (props) => (
  <RelatedForm
    show
    image={{ alt: 'Polytech Nice Sophia Image', src: null }}
    category="ECOLE"
    shortname="polytech nice sophia"
    smalldescription={`
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `}
    promote={() => console.log('Vous promouvez cet établissement.')}
    downgrade={() => console.log('Vous dégradez cet établissement.')}
    onDelete={() => console.log('Vous supprimez cet établissment.')}
    {...props}
  />
);
