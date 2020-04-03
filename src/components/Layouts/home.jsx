/* Tests (début)

  1) Faire un snapshot du composant lorsque placeholderUI est à true et à false.

  2) Vérifier que lorsque placeholderUI est à true, les cards ne sont pas affichées
     ainsi que les critères mais la placeholder UI si.

  3) Vérifier que lorsque placeholderUI est à false, les cards sont affichées
      mais pas la placeholder UI.

  4) Faites défiler la scroll bar verticale tout en bas et vérifier que lorsque l'on
      est à moins de offset de la base, la fonction onListEndReached est appellée.

  Tests (fin) */

/* global document: false, window: false */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {
    width: '100%',
  },
  body: {
    [theme.breakpoints.up('md')]: {
      margin: ({ margin }) => `0 ${margin}px`,
    },
    [theme.breakpoints.only('sm')]: {
      margin: 0,
    },
  },
  searchContainer: {
    width: '100%',
    margin: '6em 0',
    [theme.breakpoints.only('sm')]: {
      padding: '0 10px',
    },
    display: 'flex',
    justifyContent: 'center',
  },
  search: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 900,
    },
  },
  headers: {
    [theme.breakpoints.only('sm')]: {
      padding: '0 10px',
    },
  },
  subtitle: {
    width: '100%',
    [theme.breakpoints.only('sm')]: {
      textAlign: 'center',
    },
  },
  sortCriteria: {
    width: '100%',
    marginTop: 1,
    [theme.breakpoints.only('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  placeholderUI: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  cardsContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 50,
    display: 'grid',
    gridTemplateColumns: ({ cols, column }) => `repeat(${cols}, ${column}px)`,
    gridColumnGap: ({ gutter }) => `${gutter}px`,
    gridRowGap: 50,
    [theme.breakpoints.only('sm')]: {
      padding: ({ margin }) => `0 ${margin}px`,
    },
  },
}));

const columns = (
  viewportWidth, column, gutter,
) => Math.floor((viewportWidth + gutter) / (column + gutter));
const getComputedMargin = (viewportWidth, column, gutter) => {
  const cols = columns(viewportWidth, column, gutter);

  return (viewportWidth - (cols * column + (cols - 1) * gutter)) / 2;
};

let called = false;
const offset = 200;
const onScroll = (onListEndReached) => () => {
  if (window.innerHeight + window.scrollY >= (document.body.scrollHeight - offset)) {
    if (!called) { onListEndReached(); called = true; }
    return;
  }

  called = false;
};

const viewportWidth = document.body.clientWidth;

let scrollHandler = null;
const HomeLayout = (props) => {
  const {
    appbar, search, subtitle, sortCriteria, placeholder, cards,
    margin, column, gutter, placeholderUI, onListEndReached, ...rest
  } = props;
  const cols = columns(viewportWidth, column, gutter);
  const classes = useStyles({
    column, cols, gutter, margin, ...rest,
  });

  scrollHandler = scrollHandler || onScroll(onListEndReached);
  window.addEventListener('scroll', scrollHandler);
  if (placeholderUI) {
    window.removeEventListener('scroll', scrollHandler);
  }

  return (
    <div className={classes.root}>
      {appbar(classes.appbar)}
      <div className={classes.body}>
        <div className={classes.searchContainer}>
          {search(classes.search)}
        </div>
        <div className={classes.headers}>
          {!placeholderUI && subtitle(classes.subtitle)}
          {!placeholderUI && sortCriteria(classes.sortCriteria)}
        </div>
        {placeholderUI ? (
          placeholder(classes.placeholderUI)
        ) : (
          <div className={classes.cardsContainer}>
            {cards()}
          </div>
        )}
      </div>
    </div>
  );
};

HomeLayout.propTypes = {
  /*
    Marges, colonnes, gutters structurant le layout selon les recommandations du Material Design
    Chaque carte a la largeur d'une colonne en page d'accueil.
  */
  margin: PropTypes.number,
  column: PropTypes.number,
  gutter: PropTypes.number,

  /*
    Les différents composants de la page d'accueil peuvent ici être injectés grâce à des
    render props. placeholderUI à true indique que les cartes ne doivent pas être affichées,
    mais la placeholder UI fournie par l'attribut placeholder si.
  */
  appbar: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  subtitle: PropTypes.func.isRequired,
  sortCriteria: PropTypes.func.isRequired,
  placeholder: PropTypes.func.isRequired,
  /* Cette render prop en particulier est appelée avec le nombre de cards pouvant être affichées
     sur une même ligne. Cette render prop est censée retourner une liste de cards dépendamment
     de cette information.
  */
  cards: PropTypes.func.isRequired,
  placeholderUI: PropTypes.bool,

  /*
    Fonction déclenchée lorsque l'utilisateur scrolle jusqu'à une position proche du bas de la page.
    Pour savoir exactement à partir de quel position, se référer à la valeur de la variable offset
    dans cette page.
  */
  onListEndReached: PropTypes.func.isRequired,
};

const column = 360;
const gutter = 10;
const margin = getComputedMargin(viewportWidth, column, gutter);
HomeLayout.defaultProps = {
  column,
  gutter,
  margin,
  /* Par défaut les cartes sont affichées et non pas la placeholder UI de remplacement */
  placeholderUI: false,
};

export default HomeLayout;
