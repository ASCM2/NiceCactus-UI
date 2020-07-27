/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import EquallySpacedLayout from '../Layouts/equally-spaced';
import NoRelated from '../EmptyStates/no-related';
import RelatedCard from '../Cards/related';


const useStyles = makeStyles({
  root: {},
});

const column = 400;
const Related = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));

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

  return (
    <EquallySpacedLayout
      classes={{ root: classes.root }}
      column={column}
      items={related.map(({
        id: relatedId, shortname, icon,
        category, city, image, smalldescription,
        follower, liked, likes,
      }) => (
        <RelatedCard
          key={relatedId}
          connected={connected}
          icon={{
            alt: `Icône de ${shortname}`,
            src: icon ? icon.src : null,
          }}
          shortname={shortname}
          category={category}
          city={city}
          image={{
            alt: `Image de ${shortname}`,
            src: image ? image.src : null,
          }}
          smalldescription={smalldescription}
          follower={follower}
          liked={liked}
          likes={likes}
          onSubscribe={() => {}}
          onUnsubscribe={() => {}}
          onLike={() => {}}
          onDislike={() => {}}
        />
      ))}
    />
  );
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
