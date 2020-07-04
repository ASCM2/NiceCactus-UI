/*
  Liste des tests (Début)

   1) Vérifier que pour les champs address, postalCode,
      city, latitude, longitude, le changement de valeur
      entraîne bien l'appel correct à la fonction onChange
      passée en paramètre.
   2) Vérifier que pour les champs address, postalCode,
      city, latitude, longitude, le rensignement de ces
      valeurs en props est bien pris en compte dans le
      formulaire.
   3) Vérifier que pour les champs address, postalCode,
      city, latitude, longitude, le renseignement d'une
      erreur entraîne bien l'erreur attendue recquise
      graphiquement.
   4) Vérifier que le clic sur le bouton "PRECEDENT" appelle bien la
      fonction onPrev.
   5) Vérifier que le clic sur le bouton "CREER UNE PAGE" appelle bien
      la fonction submit.
   6) Vérifier que l'étape Location réagit bien en fonction
      de la valeur de l'attribut submitting.

  Liste des tests (Fin)
*/

import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import france from '../icons/france.svg';
import benin from '../icons/benin.svg';

import InputWithHelp from '../input-with-help';
import Map from '../map';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
  },
  countryContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  country: {
    minWidth: 180,
  },
  fullAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 2),
    position: 'relative',
  },
  fullAddress: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    width: '100%',
    maxWidth: 600,
  },
  iconContainer: {
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullAddressInput: {
    flexGrow: 1,
  },
  suggestions: {
    width: '100%',
    maxWidth: 600,
    position: 'absolute',
    top: '100%',
    zIndex: 1,
  },
  locationInfos: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 2),
  },
  postalCode: {
    maxWidth: 200,
    marginRight: theme.spacing(2),
  },
  city: {
    flexGrow: 1,
  },
  coordinatesContainer: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'center',
  },
  coordinates: {
    maxWidth: 300,
  },
  mapContainer: {
    margin: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mapTitle: {
    marginBottom: 3,
  },
  map: {
    width: '100%',
    height: 200,
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
  action: {
    marginLeft: theme.spacing(1),
  },
}));

const addressDescription = `
  L'adresse complète de votre établissement sans
  la mention du code postal, de la localité ou de la ville,
  du pays et de toute autre information complémentaire.
`;

const cityDescription = `
  La ville, ou sinon le nom de la localité ou de la bourgade où vous résidez.
`;

const Location = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const {
    transitionStyles,
    fullAddress, address, postalCode,
    city, country, suggestions, errors,
    latitude, longitude, submitting,
    onChange, onSelect,
    onPrev, submit,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  const addressError = Boolean(errors.ADDRESS_EMPTY);
  const postalCodeError = Boolean(errors.POSTAL_CODE_EMPTY);
  const cityError = Boolean(errors.CITY_EMPTY);
  const latitudeError = Boolean(errors.LATITUDE_NOT_A_NUMBER || errors.LATITUDE_OVERFLOWS);
  const longitudeError = Boolean(errors.LONGITUDE_NOT_A_NUMBER || errors.LONGITUDE_OVERFLOWS);

  let latitudeErrorText;
  let longitudeErrorText;

  if (errors.LATITUDE_NOT_A_NUMBER) {
    latitudeErrorText = 'Un nombre est requis';
  }

  if (errors.LATITUDE_OVERFLOWS) {
    latitudeErrorText = 'Latitude non bornée';
  }

  if (errors.LONGITUDE_NOT_A_NUMBER) {
    longitudeErrorText = 'Un nombre est requis';
  }

  if (errors.LONGITUDE_OVERFLOWS) {
    longitudeErrorText = 'Longitude non bornée';
  }

  return (
    <Card
      className={classes.root}
      style={transitionStyles}
      ref={ref}
    >
      <div className={classes.countryContainer}>
        <FormControl variant="outlined" className={classes.country}>
          <InputLabel id="select">Pays*</InputLabel>
          <Select
            name="country"
            labelId="select"
            id="select"
            value={country || 'FRANCE'}
            onChange={onChange}
            label="Pays"
          >
            <MenuItem value="FRANCE">
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ position: 'relative', top: -2 }} width="30" height="30" alt="France Flag" src={france} />
                <Typography style={{ marginLeft: 12 }} variant="inherit">
                  FRANCE
                </Typography>
              </span>
            </MenuItem>
            <MenuItem value="BENIN">
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ position: 'relative', top: -2 }} width="30" height="30" alt="France Flag" src={benin} />
                <Typography style={{ marginLeft: 12 }} variant="inherit">
                  BENIN
                </Typography>
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.fullAddressContainer}>
        <Paper classes={{ root: classes.fullAddress }} square>
          <div className={classes.iconContainer}>
            <IconButton aria-label="Search Icon Button">
              <SearchIcon />
            </IconButton>
          </div>
          <div className={classes.fullAddressInput}>
            <form>
              <InputBase
                fullWidth
                autoComplete="off"
                placeholder="Votre adresse..."
                name="fullAddress"
                value={fullAddress || ''}
                onChange={onChange}
              />
            </form>
          </div>
        </Paper>
        {suggestions.length > 0 && (
          <Paper className={classes.suggestions} square>
            <List component="nav" aria-label="Address suggestions">
              {suggestions.map((suggestion, index) => (
                <ListItem onClick={() => onSelect(index)} button>
                  <ListItemText primary={suggestion.fullAddress} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
      <div className={classes.locationInfos}>
        <InputWithHelp
          input={(className) => (
            <TextField
              autoComplete="address-line1"
              classes={{ root: className }}
              required
              id="address"
              name="address"
              label="Adresse Courte"
              value={address || ''}
              helperText="*Requis"
              error={addressError}
              onChange={onChange}
            />
          )}
          message={addressDescription}
        />
        <div style={{ marginTop: theme.spacing(1), display: 'flex' }}>
          <TextField
            autoComplete="postal-code"
            classes={{ root: classes.postalCode }}
            required
            id="postalCode"
            name="postalCode"
            label="Code postal"
            value={postalCode || ''}
            helperText="*Requis"
            error={postalCodeError}
            onChange={onChange}
          />
          <InputWithHelp
            classes={{ root: classes.city }}
            input={(className) => (
              <TextField
                autoComplete="off"
                classes={{ root: className }}
                required
                id="city"
                name="city"
                label="Ville"
                value={city || ''}
                helperText="*Requis"
                error={cityError}
                onChange={onChange}
              />
            )}
            message={cityDescription}
          />
        </div>
      </div>
      <div className={classes.coordinatesContainer}>
        <form>
          <TextField
            autoComplete="off"
            classes={{ root: classes.coordinates }}
            required
            id="latitude"
            name="latitude"
            label="Latitude"
            value={latitude || ''}
            helperText={latitudeError ? latitudeErrorText : '*Requis'}
            error={latitudeError}
            onChange={onChange}
          />
          <TextField
            style={{ marginLeft: theme.spacing(1) }}
            autoComplete="off"
            classes={{ root: classes.coordinates }}
            required
            id="longitude"
            name="longitude"
            label="Longitude"
            value={longitude || ''}
            helperText={longitudeError ? longitudeErrorText : '*Requis'}
            error={longitudeError}
            onChange={onChange}
          />
        </form>
      </div>
      {Boolean(
        latitude && longitude && !Number.isNaN(Number(latitude)) && !Number.isNaN(Number(longitude))
        && Math.abs(Number(latitude)) <= 90 && Math.abs(Number(longitude)) <= 180
      ) && (
        <div className={classes.mapContainer}>
          <Typography
            classes={{ root: classes.mapTitle }}
            component="div"
            variant="subtitle1"
            color="textPrimary"
          >
            Votre position
          </Typography>
          <Map
            classes={{ root: classes.map }}
            lat={Number(latitude)}
            lng={Number(longitude)}
          />
        </div>
      )}
      <CardActions className={classes.actionsContainer}>
        <Typography variant="subtitle1" color="textPrimary" component="div">
          ETAPE 2/2
        </Typography>
        <div>
          <Button
            classes={{ root: classes.action }}
            color="secondary"
            variant="contained"
            onClick={onPrev}
          >
            PRECEDENT
          </Button>
          <Button
            disabled={submitting}
            classes={{ root: classes.action }}
            color="primary"
            variant="contained"
            onClick={submit}
          >
            CREER VOTRE PAGE
          </Button>
        </div>
      </CardActions>
    </Card>
  );
});

Location.propTypes = {
  /*
    Styles appliqués à l'élément racine afin d'effectuer
    une transition du composant.
    Ces styles peuvent être injectés à l'aide de composants
    pour gérer les transitions comme les composants Grow, Slide
    ou Fade de la librairie Material UI.
  */
  transitionStyles: PropTypes.shape({}),
  /*
    Prop indiquant si le soumission des données pour
    la création d'un établissement est en cours.
    true => la soumission des données est en cours.
    false => la soumission des données n'est pas en cours.
  */
  submitting: PropTypes.bool,
  /*
    Début d'adresse entré par l'utilisateur courant
    afin de renseigner ses informations de géolocalisation.
  */
  fullAddress: PropTypes.string,
  /*
    Liste de suggestions d'adresses correspondantes au début
    d'adresse entré par l'utilisateur.
  */
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    fullAddress: PropTypes.string.isRequired,
  })),
  /*
    Adresse courte sans le code postal, ni la ville,
    ni le pays ni toute autre information complémentaire.
  */
  address: PropTypes.string,
  /*
    Code postal de l'établissement à créer.
  */
  postalCode: PropTypes.string,
  /*
    Ville de l'établissement à créer.
  */
  city: PropTypes.string,
  /*
    Pays de l'établissement à créer.
   */
  country: PropTypes.string,
  /*
    Latitude de l'établissement à créer
  */
  latitude: PropTypes.string,
  /*
    Longitude de l'établissement à créer
  */
  longitude: PropTypes.string,
  /*
    Erreurs avec en clés la liste des erreurs
    pouvant être déclenchées par l'activité de
    l'utilisateur sur cette étape du composant
    Location.
  */
  errors: PropTypes.shape({
    ADDRESS_EMPTY: PropTypes.number,
    POSTAL_CODE_EMPTY: PropTypes.number,
    CITY_EMPTY: PropTypes.number,
    LATITUDE_NOT_A_NUMBER: PropTypes.number,
    LATITUDE_OVERFLOWS: PropTypes.number,
    LONGITUDE_NOT_A_NUMBER: PropTypes.number,
    LONGITUDE_OVERFLOWS: PropTypes.number,
  }),
  /*
    Fonction appelée chaque fois que l'utilisateur
    change la valeur d'un input au niveau de l'étape
    Location afin de mettre à jour les props correspondantes
    de ce composant.
  */
  onChange: PropTypes.func.isRequired,
  /*
    Fonction appelée lorsque l'utilisateur sélectionne une adresse
    parmi la liste de suggestions d'adresses.
  */
  onSelect: PropTypes.func.isRequired,
  /*
    Fonction appelée lorsque l'utilisateur clique sur le bouton
    "PRECEDENT".
  */
  onPrev: PropTypes.func.isRequired,
  /*
    Fonction de soumission des données de création d'un établissement
    déclenchée lorsque l'utilisateur clique sur le bouton "CREER UNE PAGE".
  */
  submit: PropTypes.func.isRequired,
};

Location.defaultProps = {
  /*
    Par défaut, on considère qu'aucun style de transition n'est appliqué
    à l'élément racine.
  */
  transitionStyles: {},
  /*
    Par défaut, on considère que l'utilisateur courant n'est pas en train
    de soumettre les données du formulaire.
  */
  submitting: false,
  /*
    Par défaut, on considère que toutes les props correspondant
    à des entrées utilisateurs sont à null.
    La prop suggestions est par défaut un tableau vide si
    aucun suggestion d'adresse n'est nécessaire.
  */
  fullAddress: null,
  suggestions: [],
  address: null,
  postalCode: null,
  city: null,
  country: 'FRANCE',
  latitude: null,
  longitude: null,
  /*
    Par défaut, on considère qu'il n'y a pas d'erreur de saisie de la part
    de l'utilisateur courant.
  */
  errors: {},
};

export default Location;
