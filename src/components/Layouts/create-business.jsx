/*
  Tests (début)

    1) Vérifier que le layout se comporte bien à la fois sur PC et tablette.
    2) Effectuer un snapshot du composant actuel.

  Tests (fin)
*/

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';


const verticalPadding = 100;
const contentMaxWidth = 700;
const useStyles = makeStyles((theme) => ({
  root: {},
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: verticalPadding,
    paddingBottom: verticalPadding,
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  appbar: {
    width: '100%',
  },
  header: {
    width: '100%',
    maxWidth: contentMaxWidth,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    padding: '10px 0',
  },
}));

const CreateBusinessLayout = (props) => {
  const {
    appbar, header, content,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <div className={classes.root}>
      {appbar(classes.appbar)}
      <div className={classes.body}>
        {header(classes.header)}
        {content(classes.content)}
      </div>
    </div>
  );
};

CreateBusinessLayout.propTypes = {
  /*
    Render props afin d'injecter dans le layout
    l'Appbar, le header de la page de création
    des établissements, le contenu étant une des étapes
    de création des établissements sur KHEOS.
  */
  appbar: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};

export default CreateBusinessLayout;
