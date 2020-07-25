import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NoRelated from '../EmptyStates/no-related';


const useStyles = makeStyles({
  root: {},
});

const Related = (props) => {
  const {
    id, owner, mode, related, ...rest
  } = props;
  const [redirectAddRelated, setRedirectAddRelated] = useState(false);
  const classes = useStyles({ ...rest });

  if (redirectAddRelated) {
    return (
      <Redirect push to={`/${id}/manage-related`} />
    );
  }

  if (related.length === 0) {
    return (
      <NoRelated
        owner={owner}
        mode={mode}
        classes={{ root: classes.root }}
        header="Vous n'avez défini aucune page reliée."
        subheader={`
          Ajoutez et commentez des pages d'autres établissements pour améliorer
          l'intégration sur la région des nouveaux étudiants ou salariés intégrant
          votre établissement.
        `}
        onClick={() => setRedirectAddRelated(true)}
      />
    );
  }

  return null;
};

Related.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']),
  related: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
};

Related.defaultProps = {
  owner: false,
  mode: 'view',
};

export default Related;
