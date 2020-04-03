/* global document: false, alert: false */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { loader } from 'graphql.macro';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import businessIcon from '../business-icon';
import HomeLayout from '../Layouts/home';
import HomeAppBar from '../AppBars/home';
import WallSearchBar from '../SearchBars/wall';
import Subtitle from '../subtitle';
import Criterias from '../criterias';
import NoBusinesses from '../EmptyStates/no-businesses';
import ConnectionLost from '../EmptyStates/connection-lost';
import Card from '../Cards/business';
import BusinessCardSkeleton from '../Skeletons/business-card';


const LAST_BUSINESSES = loader('../../requests/last-businesses.graphql');
const SEARCH_BUSINESSES = loader('../../requests/search-businesses.graphql');

const parseQuery = (location) => new URLSearchParams(location.search);

const numberOfCardsToDisplay = (cols) => {
  if (cols === 1) return 4;
  if (cols === 2) return 6;

  return 2 * cols;
};

const cols = (
  viewportWidth, column, gutter,
) => Math.floor((viewportWidth + gutter) / (column + gutter));

const getComputedMargin = (viewportWidth, column, gutter) => {
  const columns = cols(viewportWidth, column, gutter);

  return (viewportWidth - (columns * column + (columns - 1) * gutter)) / 2;
};

const subtitles = { last: 'Les derniers établissements créés.' };

let cachedData;
let cachedCategories;
let cachedResolver;
let cachedSearchFetchMore;
let searchCalled = false;
let searchContext = false;
const Home = () => {
  const [term, setTerm] = useState(undefined);
  const [categories, setCategories] = useState(null);
  const viewportWidth = document.body.clientWidth;
  const column = 360;
  const gutter = 10;
  const columns = cols(viewportWidth, column, gutter);
  const number = numberOfCardsToDisplay(columns);

  const lastVariables = { number, categories };
  const {
    loading: lastLoading, error: lastError, data: lastData,
    fetchMore: lastFetchMore, refetch: lastRefetch,
  } = useQuery(LAST_BUSINESSES, {
    variables: lastVariables,
    notifyOnNetworkStatusChange: true,
  });
  const [searchBusinesses, {
    loading: searchLoading, error: searchError, data: searchData,
    fetchMore: searchFetchMore, refetch: searchRefetch,
  }] = useLazyQuery(SEARCH_BUSINESSES);

  const loading = searchContext ? searchLoading : lastLoading;
  const error = searchContext ? searchError : lastError;
  let resolver = 'last';
  if (searchContext) { resolver = 'search'; }
  const data = searchContext ? searchData : lastData;

  const networkError = error && error.networkError;
  const noBusinesses = data && (data[resolver].businesses.length === 0);
  const displayPlaceholder = Boolean(error) || noBusinesses;

  cachedData = data || cachedData;
  cachedCategories = categories || cachedCategories;
  cachedResolver = resolver || cachedResolver;

  if (searchContext) {
    cachedSearchFetchMore = searchFetchMore;
  }

  const location = useLocation();
  const queries = parseQuery(location);
  const urlTab = queries.get('tab');
  const [tab, setTab] = useState(urlTab === 'posts' ? 'posts' : 'wall');
  const subtitle = subtitles.last;

  const BusinessesCardsPlaceholder = Array(
    numberOfCardsToDisplay(columns)
  ).fill(<BusinessCardSkeleton />);

  const onCategorySelected = (category) => setCategories([category]);
  const BusinessesCards = (businesses) => businesses.map(({
    id, image, category, shortname,
    followersNumber, address, city,
    smalldescription, likes,
  }) => (
    <Card
      key={id}
      image={image}
      icon={businessIcon(category)}
      shortname={shortname}
      label={category}
      followersNumber={followersNumber}
      shortAddress={address}
      city={city}
      smalldescription={smalldescription}
      likes={likes}
      onCategorySelected={onCategorySelected}
    />
  ));

  return (
    <>
      <HomeLayout
        column={column}
        gutter={gutter}
        margin={getComputedMargin(viewportWidth, column, gutter)}
        appbar={(className) => (
          <HomeAppBar
            classes={{ root: className }}
            startingTab={tab}
            onWallClicked={() => setTab('wall')}
            onPostsClicked={() => setTab('posts')}
          />
        )}
        search={(className) => {
          if (tab === 'wall') {
            return (
              <WallSearchBar
                classes={{ root: className }}
                selected={categories || []}
                onChipSelect={
                  (selected) => {
                    if (searchContext) {
                      searchRefetch({ term, number, categories: selected });
                    } else {
                      lastRefetch({ term, ...lastVariables, categories: selected });
                    }

                    setCategories(selected);
                  }
                }
                submit={(search) => {
                  if (search.length) {
                    searchContext = true;
                    setTerm(search);
                    if (searchCalled) { searchRefetch({ term: search, number, categories }); }
                    searchBusinesses({ variables: { term: search, number, categories } });
                    searchCalled = true;
                  } else {
                    searchContext = false;
                    setTerm(undefined);
                  }
                }}
              />
            );
          }

          return null;
        }}
        subtitle={(className) => {
          if (tab === 'wall') {
            return <Subtitle classes={{ root: className }} subtitle={subtitle} />;
          }

          return null;
        }}
        sortCriteria={(className) => {
          if (tab === 'wall') {
            return <Criterias classes={{ root: className }} onSelect={(criteria) => alert(`Vous avez choisi le critère ${criteria}`)} />
          }

          return null;
        }}
        placeholderUI={displayPlaceholder}
        placeholder={(className) => {
          if (tab === 'wall') {
            if (error) {
              return (
                <ConnectionLost
                  classes={{ root: className }}
                  header={!networkError ? "Oups ! Une erreur s'est produite côté serveur." : undefined}
                  subheader={!networkError ? "Contactez l'équipe technique dès maintenant ou réessayer plus tard." : undefined}
                />
              );
            }

            if (noBusinesses) {
              return (
                <NoBusinesses
                  classes={{ root: className }}
                  header={categories ? 'Aucun établissement sur KHEOS ne correspond à vos critères de recherche.' : undefined}
                  subheader={categories
                    ? 'Affinez vos critères ou parlez de KHEOS autour de vous à des entreprises qui pouvant être intéressées' : undefined}
                />
              );
            }
          }

          return null;
        }}
        cards={() => {
          if (tab === 'wall') {
            if (loading) {
              if (data && data[resolver].businesses) {
                const { businesses } = data[resolver];

                return [...BusinessesCards(businesses), ...BusinessesCardsPlaceholder];
              }

              return BusinessesCardsPlaceholder;
            }

            const { [resolver]: { businesses } } = data;

            return BusinessesCards(businesses);
          }

          return [];
        }}
        onListEndReached={() => {
          if (tab === 'wall') {
            const after = cachedData[cachedResolver].last;
            const { term: resultTerm, end: noBusinessesLeft } = cachedData[cachedResolver];

            if (!noBusinessesLeft) {
              if (cachedResolver === 'search') {
                cachedSearchFetchMore({
                  variables: {
                    term: resultTerm, after, number, categories: cachedCategories,
                  },
                  updateQuery: (prevData, { fetchMoreResult: moreData }) => {
                    if (!moreData) return prevData;
                    const { __typename: typename } = prevData[cachedResolver];
                    const { [cachedResolver]: { last, businesses, end } } = moreData;

                    return {
                      [cachedResolver]: {
                        term: resultTerm,
                        last,
                        businesses: [...prevData[cachedResolver].businesses, ...businesses],
                        end,
                        __typename: typename
                      }
                    };
                  }
                })
              } else if (cachedResolver === 'last') {
                lastFetchMore({
                  variables: { after, number, categories: cachedCategories },
                  updateQuery: (prevData, { fetchMoreResult: moreData }) => {
                    if (!moreData) return prevData;
                    const { __typename: typename } = prevData[cachedResolver];
                    const { [cachedResolver]: { last, businesses, end } } = moreData;

                    return {
                      [cachedResolver]: {
                        term: resultTerm,
                        last,
                        businesses: [...prevData[cachedResolver].businesses, ...businesses],
                        end,
                        __typename: typename
                      }
                    };
                  }
                })
              }
            }
          }

          return null;
        }}
      />
    </>
  );
}

export default Home;
