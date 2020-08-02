import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {},
  underappbar: {
    display: 'grid',
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `
        'gallery gallery gallery gallery gallery'
        'subappbar subappbar subappbar subappbar subappbar'
        '. header header header .'
        '. body . map .'
        '. body . address .'
        '. body . contacts .'
        '. body . promoted .'
        '. body . . .'
      `,
      gridTemplateColumns: 'minmax(10px, 7%) minmax(410px, 1fr) 10px 320px minmax(10px, 7%)',
    },
    [theme.breakpoints.only('sm')]: {
      gridTemplateAreas: `
        'gallery gallery gallery'
        'subappbar subappbar subappbar'
        '. header .'
        '. body .'
        '. map .'
        '. address .'
        '. contacts .'
        '. promoted .'
      `,
      gridTemplateColumns: '10px 1fr 10px',
    },
    marginBottom: 20,
  },
  gallery: {
    gridArea: 'gallery',
  },
  subappbar: {
    gridArea: 'subappbar',
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginRight: 10,
    },
  },
  header: {
    gridArea: 'header',
    margin: `${theme.spacing(5)}px 0px ${theme.spacing(7)}px`,
  },
  body: {
    gridArea: 'body',
  },
  map: {
    gridArea: 'map',
    [theme.breakpoints.up('md')]: {
      height: 500,
    },
    [theme.breakpoints.only('sm')]: {
      marginTop: 10,
      paddingTop: '30%',
    },
  },
  address: {
    gridArea: 'address',
    marginTop: 10,
  },
  contacts: {
    gridArea: 'contacts',
    marginTop: 10,
  },
  promoted: {
    gridArea: 'promoted',
    marginTop: 10,
  },
}));

const BusinessLayout = (props) => {
  const {
    mode,
    appbar, gallery, subappbar,
    header, body, map, address,
    contacts, promoted,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <div className={classes.root}>
      {appbar(classes.appbar)}
      <div className={classes.underappbar}>
        {gallery(classes.gallery)}
        {mode === 'edit' && subappbar(classes.subappbar)}
        {header(classes.header)}
        {body(classes.body)}
        {/* map(classes.map) */}
        {address(classes.address)}
        {contacts(classes.contacts)}
        {promoted(classes.promoted)}
      </div>
    </div>
  );
};

BusinessLayout.propTypes = {
  mode: PropTypes.oneOf(['view', 'edit']).isRequired,
  appbar: PropTypes.func.isRequired,
  gallery: PropTypes.func.isRequired,
  subappbar: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
  body: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
  address: PropTypes.func.isRequired,
  contacts: PropTypes.func.isRequired,
  promoted: PropTypes.func.isRequired,
};

export default (props) => (
  <BusinessLayout
    appbar={(className) => <Paper style={{ height: 60, backgroundColor: 'lightblue' }} classes={{ root: className }} />}
    gallery={(className) => <Paper style={{ height: 200 }} classes={{ root: className }} />}
    subappbar={() => null}
    header={() => null}
    body={() => null}
    map={() => null}
    address={() => null}
    contacts={() => null}
    promoted={() => null}
    {...props}
  />
);
