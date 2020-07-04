/* global window: false, localStorage: false */
import React, { useState } from 'react';
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


const CREATE_BUSINESS = loader('../../requests/create-business.graphql');

let touched = false;
const validationErrors = {};
const CreateBusiness = () => {
  const user = JSON.parse(localStorage.user);

  const [step, setStep] = useState('basics');

  const onPrev = () => { setStep('basics'); };
  const onNext = () => { setStep('location'); };

  /* Attributes for the basics step. */
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [shortname, setShortname] = useState('');
  const [longname, setLongname] = useState('');
  const [smalldescription, setSmalldescription] = useState('');

  /* Attributes for the location step */
  const [fullAddress, setFullAddress] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('FRANCE');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  const [errors, setErrors] = useState({});

  const [create, { loading, error, data }] = useMutation(CREATE_BUSINESS);

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

                  create({
                    variables: {
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
                      owner: user.id,
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

export default CreateBusiness;
