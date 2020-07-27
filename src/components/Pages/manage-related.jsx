/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

import CreateBusinessLayout from '../Layouts/create-business';
import AppBar from '../AppBars/manage-related';
import RelatedBusinessesForm from '../Forms/related-businesses';


const SEARCH_BUSINESSES = loader('../../requests/search-businesses.graphql');
const ADD_RELATED = loader('../../requests/add-related.graphql');
const DELETE_RELATED = loader('../../requests/delete-related.graphql');
const QUERY_RELATED = loader('../../requests/query-business.graphql');
const PROMOTE_RELATED = loader('../../requests/promote-related.graphql');
const UNPROMOTE_RELATED = loader('../../requests/unpromote-related.graphql');

const numberOfSuggestions = 7;
let deletedId;
let promotedId;
const ManageRelated = (props) => {
  const user = JSON.parse(localStorage.user);

  const { match: { params: { id } } } = props;
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { data: relatedData } = useQuery(QUERY_RELATED, {
    variables: { user: user.id, business: id },
  });
  const [searchRelated, { data }] = useLazyQuery(SEARCH_BUSINESSES);
  const [addRelated] = useMutation(ADD_RELATED, {
    update: (cache, { data: { addrelated: { related: updatedRelated } } }) => {
      const { business } = cache.readQuery({
        query: QUERY_RELATED,
        variables: { user: user.id, business: id },
      });

      cache.writeQuery({
        query: QUERY_RELATED,
        variables: { user: user.id, business: id },
        data: {
          business: { ...business, related: updatedRelated },
        },
      });
    },
  });
  const [deleteRelated] = useMutation(DELETE_RELATED, {
    update: (cache) => {
      const { business } = cache.readQuery({
        query: QUERY_RELATED,
        variables: { user: user.id, business: id },
      });
      const updatedRelated = business.related.map((r) => {
        if (r.id === deletedId) return { ...r, show: false };
        return r;
      });

      cache.writeQuery({
        query: QUERY_RELATED,
        variables: { user: user.id, business: id },
        data: { business: { ...business, related: updatedRelated } },
      });
    },
  });
  const [promoteRelated] = useMutation(PROMOTE_RELATED);
  const [unpromoteRelated] = useMutation(UNPROMOTE_RELATED);

  let businesses = [];
  let relatedBusinesses = [];

  if (data) { businesses = data.search.businesses; }

  if (relatedData) {
    relatedBusinesses = relatedData.business.related;
  }

  let timeout = null;
  const onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'search':
        setSearch(value);
        if (search.length > 0) {
          searchRelated({
            variables: { user: user.id, term: search, number: numberOfSuggestions }
          });
        }
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
          setSuggestions(
            businesses.map(({ id: businessId, longname }) => ({ id: businessId, longname })),
          );
        }, 500);
        break;
      default:
        break;
    }
  };

  return (
    <CreateBusinessLayout
      appbar={(className) => <AppBar classes={{ root: className }} id={id} />}
      header={() => null}
      content={(className) => (
        <div className={className}>
          <RelatedBusinessesForm
            search={search}
            suggestions={suggestions}
            related={relatedBusinesses}
            onChange={onChange}
            onSelect={(selectedId) => {
              setSuggestions([]);
              addRelated({ variables: { user: user.id, business: id, related: selectedId } });
            }}
            onDelete={(toDeleteId) => {
              deletedId = toDeleteId;
              deleteRelated({ variables: { user: user.id, business: id, related: deletedId } });
            }}
            onPromote={(toPromoteId) => {
              promotedId = toPromoteId;
              promoteRelated({ variables: { user: user.id, business: id, related: promotedId } });
            }}
            onDowngrade={(downgradedId) => {
              unpromoteRelated({
                variables: { user: user.id, business: id, related: downgradedId },
              });
            }}
          />
        </div>
      )}
    />
  );
};

ManageRelated.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ManageRelated;
