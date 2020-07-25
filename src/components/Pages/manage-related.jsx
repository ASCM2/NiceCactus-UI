/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/react-hooks';

import CreateBusinessLayout from '../Layouts/create-business';
import AppBar from '../AppBars/manage-related';
import RelatedBusinessesForm from '../Forms/related-businesses';


const SEARCH_BUSINESSES = loader('../../requests/search-businesses.graphql');

const ManageRelated = (props) => {
  const user = JSON.parse(localStorage.user);

  const { match: { params: { id } } } = props;

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [related, setRelated] = useState([]);
  const [searchRelated, { data }] = useLazyQuery(SEARCH_BUSINESSES);

  let businesses = [];

  if (data) { businesses = data.search.businesses; }

  console.log('related: ');
  console.log(related);

  let timeout = null;
  const onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'search':
        searchRelated({ variables: { user: user.id, term: search, number: 7 } });
        setSearch(value);
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
          setSuggestions(businesses.map(({ longname }) => longname));
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
            related={related}
            onChange={onChange}
            onSelect={(i) => {
              setRelated([businesses[i], ...related]);
              setSuggestions([]);
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
