/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

import { useTheme } from '@material-ui/core/styles';

import { loader } from 'graphql.macro';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';

import AppBar from '../AppBars/business';
import AppBarSkeleton from '../Skeletons/business-appbar';
import Layout from '../Layouts/business';
import Gallery from '../Galleries/business-gallery';
import GallerySkeleton from '../Skeletons/business-gallery';
import Header from '../Headers/header';
import HeaderSkeleton from '../Skeletons/header';
import Presentation from '../Sections/presentation';
import PresentationSkeleton from '../Skeletons/presentation';


const QUERY_BUSINESS = loader('../../requests/query-business.graphql');
const FOLLOW_BUSINESS = loader('../../requests/follow-business.graphql');
const UNSUBSCRIBE_BUSINESS = loader('../../requests/unsubscribe-business.graphql');
const LIKE_BUSINESS = loader('../../requests/like-business.graphql');
const DISLIKE_BUSINESS = loader('../../requests/dislike-business.graphql');
const UPLOAD_IMAGES = loader('../../requests/upload-images.graphql');
const QUERY_IMAGES = gql`
  query queryImages($user: ID!, $business: ID!) {
    business(user: $user, id: $business) {
      id
      images {
        id
        src
        liked
        likes
      }
    }
  }
`;

const Business = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));
  const editBasicsInfosLabel = 'Modifier les informations de base';

  const theme = useTheme();
  const {
    match: { params: { id } },
    history,
    location: {
      state,
    },
  } = props;
  let reload;
  let defaultMode;

  if (state) {
    reload = state.reload;
    defaultMode = state.mode;
  }

  const [redirectUpdateBasics, setRedirectUpdateBasics] = useState(false);
  const [redirectCreatePresentation, setRedirectCreatePresentation] = useState(false);
  const [redirectUpdatePresentation, setRedirectUpdatePresentation] = useState(false);
  const [mode, setMode] = useState(defaultMode || 'view');
  const [tab, setTab] = useState('presentation');
  const [clientFilesUploading, setClientFilesUploading] = useState(false);
  const {
    loading, data,
  } = useQuery(QUERY_BUSINESS, {
    variables: { user: user.id, business: id },
    fetchPolicy: reload ? 'network-only' : 'cache-first',
  });
  const [upload, { loading: serverFilesUploading }] = useMutation(UPLOAD_IMAGES, {
    update: (cache, { data: { addimages: addedImages } }) => {
      const { business } = cache.readQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: id }
      });

      cache.writeQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: id },
        data: {
          business: { ...business, images: [...addedImages, ...business.images] },
        }
      });
    }
  });
  const [subscribe] = useMutation(FOLLOW_BUSINESS);
  const [unsubscribe] = useMutation(UNSUBSCRIBE_BUSINESS);
  const [like] = useMutation(LIKE_BUSINESS);
  const [dislike] = useMutation(DISLIKE_BUSINESS);

  const onTabSelected = (tabSelected) => setTab(tabSelected);

  const uploading = clientFilesUploading || serverFilesUploading;

  let icon;
  let logo;
  let image = {};
  let images = [];
  let category;
  let shortname;
  let longname;
  let smalldescription;
  let description;
  let address;
  let postalCode;
  let city;
  let country;
  let latitude;
  let longitude;
  let follower;
  let followers;
  let liked;
  let likes;
  let owner;

  if (data) {
    const { business } = data;

    icon = business.icon;
    logo = business.logo;
    image = business.image;
    images = business.images;
    category = business.category;
    shortname = business.shortname;
    longname = business.longname;
    smalldescription = business.smalldescription;
    description = business.description;
    address = business.address;
    postalCode = business.postalCode;
    city = business.city;
    country = business.country;
    latitude = business.location.lat;
    longitude = business.location.lng;
    follower = business.follower;
    followers = business.followersNumber;
    liked = business.liked;
    likes = business.likes;
    owner = business.owner;
  }

  if (redirectUpdateBasics) {
    return (
      <Redirect
        push
        to={{
          pathname: `/${id}/update`,
          state: {
            id,
            image: image || { src: null },
            category,
            shortname,
            longname,
            smalldescription,
            address,
            postalCode,
            city,
            country,
            latitude,
            longitude,
            owner,
          }
        }}
      />
    );
  }

  if (redirectCreatePresentation) return <Redirect push to={`/${id}/create-presentation`} />;

  if (redirectUpdatePresentation) {
    return (
      <Redirect
        push
        to={{
          pathname: `/${id}/update-presentation`,
          state: { logo, description },
        }}
      />
    );
  }

  return (
    <Layout
      mode={mode}
      appbar={(className) => {
        if (loading) return <AppBarSkeleton classes={{ root: className }} />;

        return (
          <AppBar
            classes={{ root: className }}
            mode={mode}
            flat={mode === 'edit' || images.length > 0}
            shortname={shortname}
            longname={longname}
            owner={user.id === owner}
            toggleMode={() => {
              if (mode === 'view') {
                setMode('edit');
              } else if (mode === 'edit') {
                setMode('view');
              }
            }}
            back={() => {
              history.push('/');
            }}
          />
        );
      }}
      gallery={(className) => {
        if (loading) return <GallerySkeleton classes={{ root: className }} />;

        return (
          <Gallery
            classes={{ root: className }}
            uploading={uploading}
            id={id}
            mode={mode}
            alt={`Image de galerie de ${shortname}`}
            images={images}
            onUploadStart={() => { setClientFilesUploading(true); }}
            onFileUploaded={(event) => {
              setClientFilesUploading(false);
              upload({
                variables: {
                  user: user.id,
                  business: id,
                  images: event.target.files,
                },
              });
            }}
          />
        );
      }}
      subappbar={(className) => (
        <div className={className}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRedirectUpdateBasics(true)}
          >
            <EditIcon />
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              {editBasicsInfosLabel}
            </Typography>
          </Button>
        </div>
      )}
      header={(className) => {
        if (loading) {
          return (
            <HeaderSkeleton
              classes={{ root: className }}
              tab={tab}
              onTabSelected={onTabSelected}
            />
          );
        }

        return (
          <Header
            classes={{ root: className }}
            connected={connected}
            alt={`Image principale de ${shortname}`}
            src={image ? image.src : null}
            category={category}
            longname={longname}
            follower={follower}
            followers={followers}
            liked={liked}
            likes={likes}
            tab={tab}
            onSubscribe={() => { subscribe({ variables: { user: user.id, business: id } }); }}
            onUnsubscribe={() => { unsubscribe({ variables: { user: user.id, business: id } }); }}
            onLike={() => { like({ variables: { user: user.id, business: id } }); }}
            onDislike={() => { dislike({ variables: { user: user.id, business: id } }); }}
            onTabSelected={onTabSelected}
          />
        );
      }}
      body={(className) => {
        switch (tab) {
          case 'presentation':
            if (loading) {
              return (
                <PresentationSkeleton classes={{ root: className }} />
              );
            }

            return (
              <Presentation
                classes={{ root: className }}
                owner={user.id === owner}
                mode={mode}
                icon={{
                  alt: `Icône de ${shortname}`,
                  src: icon ? icon.src : null,
                }}
                shortname={shortname}
                logo={{
                  alt: `Logo de ${shortname}`,
                  src: logo ? logo.src : null,
                }}
                description={description || ''}
                create={() => setRedirectCreatePresentation(true)}
                modify={() => setRedirectUpdatePresentation(true)}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
};

Business.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      reload: PropTypes.bool,
      mode: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Business;
