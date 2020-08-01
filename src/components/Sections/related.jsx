/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import EquallySpacedLayout from '../Layouts/equally-spaced';
import NoRelated from '../EmptyStates/no-related';
import RelatedCard from '../Cards/related';


const useStyles = makeStyles({
  root: {},
  editContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: 60,
  },
  edit: {
    color: '#fff',
  },
});

const FOLLOW_BUSINESS = loader('../../requests/follow-business.graphql');
const UNSUBSCRIBE_BUSINESS = loader('../../requests/unsubscribe-business.graphql');
const LIKE_BUSINESS = loader('../../requests/like-business.graphql');
const DISLIKE_BUSINESS = loader('../../requests/dislike-business.graphql');

const column = 400;
const Related = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));

  const [redirectId, setRedirectId] = useState(null);

  const [subscribe] = useMutation(FOLLOW_BUSINESS);
  const [unsubscribe] = useMutation(UNSUBSCRIBE_BUSINESS);
  const [like] = useMutation(LIKE_BUSINESS);
  const [dislike] = useMutation(DISLIKE_BUSINESS);

  const theme = useTheme();
  const editLabel = 'Gérer les pages reliées';

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
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 400 }} className={classes.root}>
        {owner && mode === 'edit' && (
          <NoRelated
            owner={owner}
            mode={mode}
            header="Vous n'avez défini aucune page reliée."
            subheader={`
              Ajoutez et commentez des pages d'autres établissements pour améliorer
              l'intégration sur la région des nouveaux étudiants ou salariés intégrant
              votre établissement.
            `}
            onClick={() => setRedirectAddRelated(true)}
          />
        )}
        {mode === 'view' && <NoRelated />}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {owner && mode === 'edit' && (
        <div className={classes.editContainer}>
          <Button
            classes={{ root: classes.edit }}
            variant="contained"
            color="secondary"
            onClick={() => setRedirectAddRelated(true)}
          >
            <EditIcon />
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              {editLabel}
            </Typography>
          </Button>
        </div>
      )}
      <EquallySpacedLayout
        column={column}
        gap={60}
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
            onSubscribe={() => {
              subscribe({ variables: { user: user.id, business: relatedId } });
            }}
            onUnsubscribe={() => {
              unsubscribe({ variables: { user: user.id, business: relatedId } });
            }}
            onLike={() => {
              like({ variables: { user: user.id, business: relatedId } });
            }}
            onDislike={() => {
              dislike({ variables: { user: user.id, business: relatedId } });
            }}
            onRedirect={() => setRedirectId(relatedId)}
          />
        ))}
      />
      {redirectId && (
        <Redirect
          push
          to={{
            pathname: `/${redirectId}`,
            state: { from: `/${id}` }
          }}
        />
      )}
    </div>
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
