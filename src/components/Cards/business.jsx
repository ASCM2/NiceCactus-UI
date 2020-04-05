/* Tests (début)

    1) Vérifier que lorsque l'url de l'image est non fournie ou
       qu'une erreur survient lors du chargement de l'image, le portrait
       dépendant de la catégorie de l'établissement s'affiche.
    2) Vérifier que lors du chargement de l'image, le skeleton est bien mis en
       front de l'image.
    3) Vérifier que les différents champs de texte sur la carte sont tronqués
       convenablement lors du dépassement de texte.
    4) Vérifier que lors du clic sur le bouton "Partage", la fonction associée
       au partage de l'établissement est bien appelée.
    5) Vérifier que lorsque l'on clique sur le label et le portrait, la fonction
       onCategorySelected est appelée.

    P.S: Effectuer un snapshot du composant pour chaque test portant sur ses props.

   Tests (fin) */

/* global alert: false, localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

import PlaceIcon from '@material-ui/icons/Place';
import ShareIcon from '@material-ui/icons/Share';

import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import WithImage from '../with-image';
import Portrait from '../portrait';
import MainFunctionButton from '../Buttons/main-function-button';
import FollowButton from '../Buttons/follow-button';
import LikeButton from '../Buttons/like-button';
import FollowerSnackBar from '../Snackbars/follower';
import UnsuscriberSnackBar from '../Snackbars/unsubscriber';
import NetworkErrorSnackBar from '../Snackbars/network-error';
import ConfirmUnsubscription from '../Dialogs/confirm-unsubscription';


const placeIconColor = blue[700];
const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    width: 360,
    height: 227,
    cursor: 'pointer',
  },
  label: {
    display: 'inline-block',
    padding: 5,
    backgroundColor: purple[600],
    color: '#fff',
    cursor: 'pointer',
  },
  sideMediaContainer: {
    height: 114,
    marginTop: theme.spacing(2),
    padding: 5,
    display: 'flex',
    cursor: 'pointer',
  },
  sideMedia: {
    height: 'inherit',
    width: 114,
    minWidth: 114,
  },
  sideMediaContent: {
    position: 'relative',
    paddingTop: 0,
    height: 'inherit',
    flexGrow: 1,
    '& > div': {
      width: 225,
    },
  },
  shortAddress: {
    marginTop: theme.spacing(1),
  },
  placeIconContainer: {
    height: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    marginLeft: -5,
  },
  placeIcon: {
    color: placeIconColor,
    fontSize: 30,
  },
  city: {
    color: placeIconColor,
    flexGrow: 1,
    width: 100,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: 20,
  },
  smalldescription: {
    width: 328,
    height: 60,
    overflow: 'hidden',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const FOLLOW_BUSINESS = loader('../../requests/follow-business.graphql');
const UNSUBSCRIBE_BUSINESS = loader('../../requests/unsubscribe-business.graphql');

const getFollowersTextDescription = (followersNumber) => {
  switch (followersNumber) {
    case 0:
      return 'Aucun abonné';
    case 1:
      return '1 abonné';
    default:
      return `${followersNumber} abonnés`;
  }
};

const HomeCard = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));
  const [subscribe, { error: followerError, data: followerData }] = useMutation(FOLLOW_BUSINESS);
  const [unsubscribe,
    { error: unsubscriberError, data: unsubscriberData }] = useMutation(UNSUBSCRIBE_BUSINESS);
  const networkError = followerError || unsubscriberError;

  const {
    id, image, icon: Icon, shortname,
    label, followersNumber, shortAddress,
    city, smalldescription, follower, mainFunction,
    likes, onShare, onCategorySelected,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const [followerClosed, setFollowerClosed] = useState(false);
  const [unsubscriberClosed, setUnsubscriberClosed] = useState(false);
  const [networkErrorClosed, setNetworkErrorClosed] = useState(false);
  const [confirmUnsubscription, setConfirmUnsubscription] = useState(false);
  const [raised, setRaised] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(false);

  const media = (
    <WithImage
      mediaError={!image || mediaError}
      mediaLoading={mediaLoading}
      component={(
        <CardMedia
          className={classes.media}
          image={image}
          alt={shortname}
          title={shortname}
          component="img"
          onLoad={() => setMediaLoading(false)}
          onError={() => setMediaError(true)}
        />
      )}
      error={<Portrait classes={{ root: classes.media }} icon={Icon} />}
      loading={<Skeleton height="100%" width="100%" component="div" variant="rect" />}
    />
  );

  return (
    <Card
      className={classes.root}
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onFocus={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      onBlur={() => setRaised(false)}
    >
      {media}
      <Typography onClick={() => onCategorySelected(label)} className={classes.label} variant="subtitle2" component="div">
        {label.toUpperCase()}
      </Typography>
      <div className={classes.sideMediaContainer}>
        <Portrait
          classes={{ root: classes.sideMedia }}
          icon={Icon}
          onClick={() => onCategorySelected(label)}
        />
        <CardContent className={classes.sideMediaContent}>
          <Typography title={shortname} variant="h5" component="div" noWrap>
            {shortname}
          </Typography>
          <Typography variant="subtitle1" component="div" color="textSecondary">
            {getFollowersTextDescription(followersNumber)}
          </Typography>
          <Typography className={classes.shortAddress} title={shortAddress} variant="subtitle2" component="div" color="textSecondary" noWrap>
            {shortAddress}
          </Typography>
          <div title={city} className={classes.placeIconContainer}>
            <PlaceIcon classes={{ root: classes.placeIcon }} />
            <div className={classes.city}>{city.toUpperCase()}</div>
          </div>
        </CardContent>
      </div>
      <CardContent>
        <Typography className={classes.smalldescription} title={smalldescription} variant="body2" component="div" color="textSecondary">
          {smalldescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {mainFunction ? <MainFunctionButton mainFunction={mainFunction} /> : (
          <FollowButton
            connected={connected}
            follower={follower}
            onSubscribe={() => {
              setFollowerClosed(false);
              setNetworkErrorClosed(false);
              subscribe({ variables: { user: user.id, business: id } });
            }}
            onUnsubscribe={() => setConfirmUnsubscription(true)}
          />
        )}
        <div className={classes.sideActions}>
          <LikeButton likes={likes} />
          <IconButton onClick={onShare} aria-label="Share">
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
      <FollowerSnackBar
        open={!followerClosed && Boolean(followerData)}
        shortname={shortname}
        onClose={() => setFollowerClosed(true)}
      />
      <UnsuscriberSnackBar
        open={!unsubscriberClosed && Boolean(unsubscriberData)}
        shortname={shortname}
        onClose={() => setUnsubscriberClosed(true)}
      />
      <NetworkErrorSnackBar
        open={!networkErrorClosed && Boolean(networkError)}
        onClose={() => setNetworkErrorClosed(true)}
      />
      <ConfirmUnsubscription
        open={confirmUnsubscription}
        shortname={shortname}
        onUnsubscribe={() => {
          setUnsubscriberClosed(false);
          setNetworkErrorClosed(false);
          setConfirmUnsubscription(false);
          unsubscribe({ variables: { user: user.id, business: id } });
        }}
        onCancel={() => {
          setNetworkErrorClosed(false);
          setConfirmUnsubscription(false);
        }}
      />
    </Card>
  );
};

HomeCard.propTypes = {
  /* Id de l'établissement représenté par la carte. */
  id: PropTypes.string.isRequired,
  /* L'url de l'image de la card.
     Si cette url est null ou undefined ou en cas d'erreur de récupération de l'image,
     un portrait bleu dépendant de la catégorie de l'établissement est affiché.
     Au chargement de l'image, un skeleton est placé devant l'image jusqu'à la fin
     de son chargement.
  */
  image: PropTypes.string,
  /* Icône représentative de la catégorie de l'établissement. */
  icon: PropTypes.elementType.isRequired,
  /* Nom court de l'établissement remplaçant le nom détaillé de l'entreprise
     lorsque l'espace vient à manquer. */
  shortname: PropTypes.string.isRequired,
  /* Catégorie de l'établissement affichée sous forme de label juste en dessous
     de l'image de l'établissement */
  label: PropTypes.string.isRequired,
  /* Nombre de personnes abonnées à l'établissement. */
  followersNumber: PropTypes.number.isRequired,
  /* Adresse sans le code postal, ni la ville de l'&tablissment. */
  shortAddress: PropTypes.string.isRequired,
  /* Ville de l'établissement. */
  city: PropTypes.string.isRequired,
  /* Petite description de l'établissement censée donner à l'utilisateur l'envie de
     cliquer sur la carte et d'en savoir plus sur l' établissement */
  smalldescription: PropTypes.string.isRequired,
  /* Booléen indiquant si l'utilisateur actuel suit l'établissement. */
  follower: PropTypes.bool,
  /* Fonction cliente principale dépendant de la catégorie de l'établissement qu'offre
     l'établissement aux visiteurs du site */
  mainFunction: PropTypes.string,
  /* Nombre de personnes distinctes ayant aimé l'établissement. */
  likes: PropTypes.number.isRequired,
  /* Fonction de partage de l'établissement déclenchée lors du clic sur l'icône
     de partage. */
  onShare: PropTypes.func,
  /* Fonction activée losque l'utilisateur clique sur le label de la carte ou sur
     le portrait dépendant de la catégorie de l'établissement. */
  onCategorySelected: PropTypes.func.isRequired,
};

HomeCard.defaultProps = {
  /* L'image d'acroche de l'établissement n'est pas obligatoire, mais nettement conseillée. */
  image: null,
  /* Par défaut, on considère que l'utilisateur ne suit pas l'entreprise. */
  follower: false,
  /* l'établissement peut ne pas avoir de fonctionnalités clientes à proposer. */
  mainFunction: null,
  /* Fonction de partage par défaut de l'établissement. */
  onShare: () => alert('Vous venez de partager cet établissement.'),
};

export default React.memo(HomeCard);
