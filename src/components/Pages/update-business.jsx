/* global window: false, localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';

import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Fade from '@material-ui/core/Fade';

import CreateBusinessLayout from '../Layouts/create-business';
import CreateBusinessAnimation from '../Animations/create-business';
import Appbar from '../AppBars/create-business';
import Basics from '../Forms/basics';
import Location from '../Forms/location';

import { autocomplete } from '../../services/mapbox';


const UPDATE_BUSINESS = loader('../../requests/update-business.graphql');

let touched = false;
const validationErrors = {};
const UpdateBusiness = (props) => {
  const user = JSON.parse(localStorage.user);

  const {
    location: {
      state: {
        id,
        image: { src },
        category: defaultCategory,
        shortname: defaultShortname,
        longname: defaultLongname,
        smalldescription: defaultSmallDescription,
        address: defaultAddress,
        postalCode: defaultPostalCode,
        city: defaultCity,
        latitude: defaultLatitude,
        longitude: defaultLongitude,
        owner,
      }
    }
  } = props;

  console.log('owner: ');
  console.log(owner);

  const [step, setStep] = useState('basics');

  const onPrev = () => { setStep('basics'); };
  const onNext = () => { setStep('location'); };

  /* Attributes for the basics step. */
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(src);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(defaultCategory);
  const [shortname, setShortname] = useState(defaultShortname);
  const [longname, setLongname] = useState(defaultLongname);
  const [smalldescription, setSmalldescription] = useState(defaultSmallDescription);

  /* Attributes for the location step */
  const [fullAddress, setFullAddress] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState(defaultAddress);
  const [postalCode, setPostalCode] = useState(defaultPostalCode);
  const [city, setCity] = useState(defaultCity);
  const [country, setCountry] = useState('FRANCE');
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);

  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  const [errors, setErrors] = useState({});

  const [update, { loading, error, data }] = useMutation(UPDATE_BUSINESS);

  if (error && !touched) {
    const { graphQLErrors } = error;

    if (graphQLErrors && graphQLErrors.length) {
      const { validationErrors: serverValidationErrors } = graphQLErrors[0].extensions;

      serverValidationErrors.map(({ code }) => {
        validationErrors[code] = 1;
        return null;
      });
    }
  }

  if (data) { setTimeout(setRedirectToHomePage, 1000, true); }

  let timeout = null;
  const onChange = (event) => {
    const { name, value, files } = event.target;

    touched = true;
    switch (name) {
      case 'image':
        if (files.length > 0) {
          setImage(files[0]);
          setUrl(window.URL.createObjectURL(files[0]));
          setUploading(false);
        }
        break;
      case 'category':
        setCategory(value);
        setErrors({ ...errors, CATEGORY_EMPTY: 0 });
        break;
      case 'shortname':
        validationErrors.SHORTNAME_EMPTY = 0;
        setShortname(value);
        break;
      case 'longname':
        validationErrors.LONGNAME_EMPTY = 0;
        setLongname(value);
        break;
      case 'smalldescription':
        validationErrors.SMALL_DESCRIPTION_EMPTY = 0;
        setSmalldescription(value);
        break;
      case 'fullAddress':
        setFullAddress(value);
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
          setSuggestions(await autocomplete(value, country));
        }, 500);
        break;
      case 'address':
        validationErrors.ADDRESS_EMPTY = 0;
        setAddress(value);
        break;
      case 'postalCode':
        validationErrors.POSTAL_CODE_EMPTY = 0;
        setPostalCode(value);
        break;
      case 'city':
        validationErrors.CITY_EMPTY = 0;
        setCity(value);
        break;
      case 'country':
        validationErrors.COUNTRY_EMPTY = 0;
        setCountry(value);
        break;
      case 'latitude':
        validationErrors.LATITUDE_OVERFLOWS = 0;
        setLatitude(value);
        setErrors({ ...errors, LATITUDE_NOT_A_NUMBER: 0 });
        break;
      case 'longitude':
        validationErrors.LONGITUDE_OVERFLOWS = 0;
        setLongitude(value);
        setErrors({ ...errors, LONGITUDE_NOT_A_NUMBER: 0 });
        break;
      default:
        break;
    }
  };

  const navigationButtons = (
    <>
      <Fade in={step === 'location'}>
        <IconButton aria-label="back-to-basics" onClick={onPrev}>
          <ArrowBackIcon color="primary" />
        </IconButton>
      </Fade>
      <Fade in={step === 'basics'}>
        <IconButton aria-label="to-location" onClick={onNext}>
          <ArrowForwardIcon color="primary" />
        </IconButton>
      </Fade>
    </>
  );

  return (
    <>
      <CreateBusinessLayout
        appbar={(className) => (
          <Appbar
            classes={{ root: className }}
            step={step}
          />
        )}
        header={(className) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className={className}>
            {navigationButtons}
          </div>
        )}
        content={(className) => (
          <CreateBusinessAnimation
            classes={{ root: className }}
            step={step}
            basics={(transitionStyles) => (
              <Basics
                style={{ ...transitionStyles }}
                image={url}
                uploading={uploading}
                category={category}
                shortname={shortname}
                longname={longname}
                smalldescription={smalldescription}
                errors={{ ...errors, ...validationErrors }}
                onUploadStart={() => setUploading(true)}
                onChange={onChange}
                onNext={onNext}
              />
            )}
            location={(transitionStyles) => (
              <Location
                update
                style={{ ...transitionStyles }}
                submitting={loading}
                fullAddress={fullAddress}
                suggestions={suggestions}
                address={address}
                postalCode={postalCode}
                city={city}
                country={country}
                latitude={latitude}
                longitude={longitude}
                errors={{ ...errors, ...validationErrors }}
                onChange={onChange}
                onSelect={(i) => {
                  setFullAddress(suggestions[i].fullAddress);

                  setAddress(suggestions[i].address);
                  setPostalCode(suggestions[i].postalCode);
                  setCity(suggestions[i].city);
                  setLatitude(`${suggestions[i].latitude}`);
                  setLongitude(`${suggestions[i].longitude}`);

                  setSuggestions([]);
                }}
                onPrev={onPrev}
                submit={() => {
                  touched = false;

                  if (category.length === 0) {
                    setErrors({ ...errors, CATEGORY_EMPTY: 1 });
                    setStep('basics');
                    return;
                  }

                  if (!latitude || Number.isNaN(Number(latitude))) {
                    setErrors({ ...errors, LATITUDE_NOT_A_NUMBER: 1 });
                    return;
                  }

                  if (!longitude || Number.isNaN(Number(longitude))) {
                    setErrors({ ...errors, LONGITUDE_NOT_A_NUMBER: 1 });
                    return;
                  }

                  update({
                    variables: {
                      user: user.id,
                      id,
                      image,
                      category,
                      shortname,
                      longname,
                      smalldescription,
                      address,
                      postalCode,
                      city,
                      country,
                      lat: Number(latitude),
                      lng: Number(longitude),
                      owner,
                    },
                  })
                }}
              />
            )}
          />
        )}
      />
      {redirectToHomePage && <Redirect push to="/" />}
    </>
  );
};

UpdateBusiness.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: {
        src: PropTypes.string,
      },
      category: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      smalldescription: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateBusiness;
