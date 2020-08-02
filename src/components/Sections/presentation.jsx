import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

import Skeleton from '@material-ui/lab/Skeleton';

import EditIcon from '@material-ui/icons/Edit';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import BackgroundImage from '../background-image';
import EmptyDescription from '../EmptyStates/empty-description';


const useStyles = makeStyles((theme) => ({
  root: {},
  editContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: theme.spacing(2),
  },
  edit: {
    color: '#fff',
  },
  presentation: {
    boxSizing: 'border-box',
    padding: 17,
  },
  shortnameContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    marginBottom: ({ logo }) => (logo ? 35 : 0),
  },
  icon: {
    height: 'inherit',
    width: 60,
    backgroundSize: 'contain',
    marginRight: theme.spacing(1),
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: 120,
    width: 380,
    backgroundSize: 'contain',
  },
  descriptionContainer: ({ clipped, overflows }) => ({
    marginTop: 35,
    height: clipped && overflows ? 320 : 'auto',
    minHeight: 320,
    overflowY: clipped && overflows ? 'hidden' : 'visible',
  }),
  moreContainer: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
  },
  more: {
    color: theme.palette.primary.main,
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline',
    margin: 0,
    padding: 0,
  },
}));


let descriptionContainerEl;
let descriptionEl;
const Presentation = withSize()((props) => {
  const theme = useTheme();

  const {
    size: { width },
    owner, mode,
    icon, shortname, logo,
    description,
    create, modify, ...rest
  } = props;
  const [clipped, setClipped] = useState(true);
  const [overflows, setOverflows] = useState(true);
  const classes = useStyles({
    clipped, overflows, logo: Boolean(logo.src), ...rest
  });
  const editLabel = 'Modifier la présentation';
  const moreLabel = 'Voir plus';
  const lessLabel = 'Voir moins';

  useEffect(() => {
    if (descriptionContainerEl) {
      if (descriptionContainerEl.scrollHeight > descriptionContainerEl.offsetHeight) {
        setClipped(true);
      }

      if (descriptionContainerEl.scrollHeight === descriptionContainerEl.offsetHeight) {
        setClipped(false);
        if (descriptionEl.scrollHeight < descriptionContainerEl.offsetHeight) {
          setOverflows(false);
        } else {
          setOverflows(true);
        }
      }
    }
  }, [width, clipped]);

  if (description.length === 0) {
    if (mode === 'view') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 400 }} className={classes.root}>
          <EmptyDescription />
        </div>
      );
    }

    if (mode === 'edit' && owner) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 400 }} className={classes.root}>
          <EmptyDescription
            owner={owner}
            mode={mode}
            header="Vous ne vous êtes pas encore présenté aux visiteurs de KHEOS"
            subheader="Présentez-vous afin de permettre aux étudiants et autres visiteurs de KHEOS d'en savoir un peu plus sur votre établissement"
            onClick={create}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <div className={classes.root}>
      {owner && mode === 'edit' && (
        <div className={classes.editContainer}>
          <Button
            classes={{ root: classes.edit }}
            variant="contained"
            color="secondary"
            onClick={modify}
          >
            <EditIcon />
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherited">
              {editLabel}
            </Typography>
          </Button>
        </div>
      )}
      <Paper
        classes={{ root: classes.presentation }}
        square
      >
        <div className={classes.shortnameContainer}>
          <BackgroundImage
            classes={{ root: classes.icon }}
            alt={icon.alt}
            src={icon.src}
            loading={<Skeleton variant="rect" width="100%" height="100%" />}
            error={null}
          />
          <Typography title={shortname} variant="h5" component="div" noWrap>
            {shortname}
          </Typography>
        </div>
        <div className={classes.logoContainer}>
          <BackgroundImage
            classes={{ root: classes.logo }}
            alt={logo.alt}
            src={logo.src}
            loading={<Skeleton variant="rect" width="100%" height="100%" />}
            error={null}
          />
        </div>
        <div
          ref={(el) => { descriptionContainerEl = el; }}
          className={classes.descriptionContainer}
        >
          <Typography
            ref={(el) => { descriptionEl = el; }}
            classes={{ root: classes.description }}
            variant="body1"
            component="div"
            textColor="primary"
          >
            {description}
          </Typography>
        </div>
        {overflows && (
          <div className={classes.moreContainer}>
            <ButtonBase
              classes={{ root: classes.more }}
              disableRipple
              onClick={() => setClipped(!clipped)}
            >
              {clipped ? moreLabel : lessLabel}
            </ButtonBase>
          </div>
        )}
      </Paper>
    </div>
  );
});

Presentation.propTypes = {
  owner: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']),
  icon: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
  }).isRequired,
  shortname: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
  }).isRequired,
  description: PropTypes.string.isRequired,
  create: PropTypes.func.isRequired,
  modify: PropTypes.func.isRequired,
};

Presentation.defaultProps = {
  owner: false,
  mode: 'view',
};

export default Presentation;
