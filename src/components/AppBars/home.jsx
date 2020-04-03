/* Tests (début)

  1) Vérifer que lorsque l'on clique sur le logo, on est bien redirigé en page d'accueil.

  2) Vérifier que lorque l'on clique sur le bouton "Créer une page" en étant non
     connecté, la fonction demandant la connexion de l'utilisateur se déclenche.

  3) Vérifier que lorsque l'on clique sur le bouton "Créer une page" en étant connecté
     et en disposant déjà d'une page, la fonction avertissant l'utilisateur que la création
     de pages n'est plus possible pour lui est déclenchée.

  4) Vérifier que lorsque l'on clique sur le bouton "Créer une page" en étant connecté et en
     ne disposant pas déjà d'une page, la fonction de création d'une page est déclenchée.

  5) Vérifier que lorsque l'on clique sur l'onglet "Mon compte", une fonction ouvrant le menu
     est déclenchée avec en paramètre la référence de l'onglet "Mon compte".

  6) Vérifier que lorsque l'on clique sur une icône de partage de réseau social,
    la fonction associée correspondante est bien appelée.

  7) Vérifier qu'un clic sur un des onglets de l'App Bar déclenche la fonction associée au clic
    sur cet onglet uniquement qu'en cas de changement d'onglet.

  P.S: Effectuer un snapshot équivalent du composant AppBar dès que le test porte
  sur les props du composant.

   Tests (fin) */

/* global alert: false */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import PostIcon from '@material-ui/icons/ModeCommentOutlined';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logo from '../images/logo.svg';

import facebook from '../icons/facebook.svg';
import twitter from '../icons/twitter.svg';
import whatsapp from '../icons/whatsapp.svg';
import linkedin from '../icons/linkedin.svg';


const logoSize = 70;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only('sm')]: {
      padding: '6px 5% 0',
    },
    [theme.breakpoints.only('md')]: {
      padding: '6px 5% 0',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '6px 200px 0',
    },
  },
  colorDefault: {
    backgroundColor: theme.palette.background.paper,
  },
  head: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  sideLogo: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: logoSize,
    height: logoSize,
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  name: {
    marginLeft: 10,
    padding: 0,
  },
  createPage: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 30,
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: 15,
    },
    width: 200,
  },
  right: {
    height: 'inherit',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  share: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  icons: {
    height: 'inherit',
    minWidth: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  account: {
    marginRight: 10,
    height: 50,
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.only('sm')]: {
      justifyContent: 'center',
    },
  },
  accountLink: {
    color: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline',
    margin: 0,
    padding: 0,
  },
  bottom: {
    width: '100%',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  tab: {
    marginRight: 10,
  },
}));

const HomeAppBar = (props) => {
  const {
    connected, withoutPage, askSignUp, alreadyOwner,
    createPage, showMenu,
    onFacebookShare, onTwitterShare, onWhatsappShare, onLinkedinShare,
    startingTab,
    onWallClicked, onPostsClicked,
  } = props;
  const onCreatePageOwerVerification = withoutPage ? createPage : alreadyOwner;
  const onCreatePage = connected ? onCreatePageOwerVerification : askSignUp;
  const classes = useStyles(props);
  const [tab, setTab] = useState(startingTab === 'wall' ? 0 : 1);
  const handleChange = (index) => {
    if (index !== tab) {
      if (index === 0) onWallClicked();
      if (index === 1) onPostsClicked();
    }
    setTab(index);
  };

  const theme = useTheme();
  const onTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const sideLogo = (
    <>
      <Typography classes={{ root: classes.name }} color="primary" component="div" variant="h3">Kheos</Typography>
      <Button
        onClick={onCreatePage}
        classes={{ root: classes.createPage }}
        variant="contained"
        color="primary"
      >
        <AddBoxIcon style={{ marginRight: 5 }} />
        <span>Créer une page</span>
      </Button>
    </>
  );

  const location = useLocation();

  return (
    <AppBar classes={{ colorDefault: classes.colorDefault }} position="static" color="default">
      <Toolbar classes={{ root: classes.root }}>
        <div className={classes.head}>
          <div className={classes.left}>
            <Link href={location.pathname}>
              <div className={classes.logo} />
            </Link>
            {onTablet ? (
              <div className={classes.sideLogo}>
                {sideLogo}
              </div>
            ) : sideLogo}
          </div>
          <div className={classes.right}>
            <div className={classes.account}>
              <Typography component="div" variant="subtitle1" color="textSecondary">
                <ButtonBase
                  classes={{ root: classes.accountLink }}
                  disableRipple
                  onClick={(event) => showMenu(event.target)}
                >
                  Mon compte
                </ButtonBase>
              </Typography>
            </div>
            <div className={classes.share}>
              <Typography component="div" variant="subtitle2" color="textSecondary">Partager sur :</Typography>
              <div className={classes.icons}>
                <ButtonBase disableRipple onClick={onTwitterShare}>
                  <img width="30" height="30" alt="Twitter share icon" src={twitter} />
                </ButtonBase>
                <ButtonBase disableRipple onClick={onFacebookShare}>
                  <img width="30" height="30" alt="Facebook share icon" src={facebook} />
                </ButtonBase>
                <ButtonBase disableRipple onClick={onLinkedinShare}>
                  <img width="30" height="30" alt="Linkedin share icon" src={linkedin} />
                </ButtonBase>
                <ButtonBase disableRipple onClick={onWhatsappShare}>
                  <img width="28" height="28" alt="Whatsapp share icon" src={whatsapp} />
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <Tabs
            value={tab}
            onChange={(_, index) => handleChange(index)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              classes={{ root: classes.tab }}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon style={{ marginRight: 10 }} />
                  <Typography style={{ position: 'relative', top: 1 }} component="div" variant="inherit">
                    Le Mur
                  </Typography>
                </div>
              )}
            />
            <Tab
              classes={{ root: classes.tab }}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PostIcon style={{ marginRight: 10 }} />
                  <Typography style={{ position: 'relative', top: 1 }} component="div" variant="inherit">
                    Les Posts
                  </Typography>
                </div>
              )}
            />
          </Tabs>
        </div>
      </Toolbar>
    </AppBar>
  );
};

HomeAppBar.propTypes = {
  /* Booléen indiquant si l'utilisateur courant est connecté ou non */
  connected: PropTypes.bool,
  /* Booléen indiquant si l'utilisateur courant dispose déjà d'une page */
  withoutPage: PropTypes.bool.isRequired,
  /* Fonction déclenchée si l'utilisateur doit se connecter */
  askSignUp: PropTypes.func.isRequired,
  /* Fonction déclenchée si l'utilisateur courant dispose déjà d'une page. */
  alreadyOwner: PropTypes.func.isRequired,
  /* Fonction déclenchant le processus de création d'une page. */
  createPage: PropTypes.func.isRequired,
  /* Fonction reliée à l'onglet "Mon compte" déclenchant l'ouverture du menu permettant
    à l'utilisateur de s'inscrire, de se connecter, de se déconnecter, cette fonction
    est appelée avec la référence de l'onglet "Mon compte" permettant de positionner
    le menu vis-à-vis de l'onglet */
  showMenu: PropTypes.func.isRequired,
  /* Fonctions de partage sur les réseaux sociaux */
  onFacebookShare: PropTypes.func.isRequired,
  onTwitterShare: PropTypes.func.isRequired,
  onWhatsappShare: PropTypes.func.isRequired,
  onLinkedinShare: PropTypes.func.isRequired,
  /* Onglet de départ */
  startingTab: PropTypes.oneOf(['wall', 'posts']),
  /* Fonctions déclenchées lors d'un clic sur un onglet. Ces fonctions ne sont déclenchées
     que lors d'un changement d'onglet.
  */
  onWallClicked: PropTypes.func.isRequired,
  onPostsClicked: PropTypes.func.isRequired,
};

HomeAppBar.defaultProps = {
  connected: false,
  startingTab: 'wall',
};

export default (props) => (
  <HomeAppBar
    connected
    withoutPage
    askSignUp={() => alert('Vous devez vous connecter pour créer une page sur KHEOS')}
    alreadyOwner={() => alert(`
      Vous disposez déjà d'un établissement sur KHEOS.
      Vous ne pouvez pas en créer un de nouveau.
    `)}
    createPage={() => alert('Vous êtes en train de créer une page')}
    showMenu={(ref) => {
      console.log("Référence de l'onglet Mon compte.");
      console.log(ref);
      alert('Vous venez de cliquer sur l\'onglet Mon compte');
    }}
    onFacebookShare={() => alert('Vous partagez sur Facebook')}
    onTwitterShare={() => alert('Vous partagez sur Twitter')}
    onWhatsappShare={() => alert('Vous partagez sur Whatsapp')}
    onLinkedinShare={() => alert('Vous partagez sur Linkedin')}
    onWallClicked={() => alert('Vous venez de switcher sur le mur')}
    onPostsClicked={() => alert('Vous venez de switcher sur les posts')}
    {...props}
  />
);
