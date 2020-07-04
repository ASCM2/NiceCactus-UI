/*
  Liste des tests (Début)

   1) Vérifier que pour les champs image, category,
      shortname, longname, smalldescription,
      le changement de valeur entraîne bien l'appel correct
      à la fonction onChange passée en paramètre.
   2) Vérifier que pour les champs image, category,
      shortname, longname, smalldescription,
      le rensignement de ces valeurs en props est bien pris en compte
      dans le formulaire.
   3) Vérifier que pour les champs image, category,
      shortname, longname, smalldescription,
      le renseignement d'une erreur entraîne bien l'erreur
      attendue recquise graphiquement.
   4) Vérifier que le clic sur le bouton "SUIVANT" appelle bien la
      fonction onNext.

  Liste des tests (Fin)
*/

import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import WithImage from '../with-image';
import Portrait from '../portrait';
import businessIcon from '../business-icon';
import UploadButton from '../Buttons/upload-button';
import InputWithHelp from '../input-with-help';


const mediaHeight = 170;
const sideMediaSize = 162;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    height: mediaHeight,
  },
  media: {
    width: '100%',
    height: mediaHeight,
  },
  upload: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  select: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 180,
  },
  sideMediaContainer: {
    margin: `0 ${theme.spacing(1)}px ${theme.spacing(4)}px`,
    display: 'flex',
  },
  sideMedia: {
    width: sideMediaSize,
    height: sideMediaSize,
  },
  namesContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  smalldescription: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  smalldescriptionHelp: {
    top: -15,
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

const shortnameDescription = `
  Le nom court est le nom de substitut pour le nom complet de
  votre établissement lorsque l'espace alloué pour le nom devient
  réduit.
  C'est de préférence le nom court, clair et concis par lequel la
  majorité des personnes désigne votre établissement.
  Il fait au maximum 19 caractères.
`;

const longnameDescription = `
  Le nom long est le nom aussi long que vous le souhaitiez que vous voudriez
  indiquer pour votre établissement. Par exemple "Restaurant XXX" pourrait très
  bien être le nom long d'un restaurant avec le nom court "XXX".
`;

const smalldescriptionHelp = `
  Une description courte et attirante de votre établissement
  donnant immédiatement envie d'en savoir plus sur votre
  établissement.
  La description courte est limitée à 188 caractères.
`;

const Basics = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const {
    style,
    image, uploading, category,
    errors, shortname, longname,
    smalldescription,
    onUploadStart, onChange, onNext,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const Icon = businessIcon(category);

  const media = (
    <WithImage
      classes={{ root: classes.media }}
      mediaLoading={false}
      mediaError={Boolean(!image)}
      component={<CardMedia classes={{ root: classes.media }} image={image} />}
      error={(
        <Portrait
          classes={{ root: classes.media }}
          icon={Icon}
        />
      )}
      loading={<div />}
    />
  );

  const selectItemIcon = (categoryName) => {
    const ItemIcon = businessIcon(categoryName);

    return (
      <ItemIcon
        style={{ position: 'relative', top: 5 }}
        color="primary"
      />
    );
  };

  const categoryError = Boolean(errors.CATEGORY_EMPTY);
  const shortnameError = Boolean(errors.SHORTNAME_EMPTY);
  const longnameError = Boolean(errors.LONGNAME_EMPTY);
  const smalldescriptionError = Boolean(errors.SMALL_DESCRIPTION_EMPTY);

  const select = (
    <FormControl variant="outlined" className={classes.select} error={categoryError}>
      <InputLabel id="select">Catégorie*</InputLabel>
      <Select
        name="category"
        labelId="select"
        id="select"
        value={category || ''}
        onChange={onChange}
        label="Catégorie"
      >
        <MenuItem style={{ display: 'flex', alignItems: 'center' }} value="RESIDENCE">
          <span>
            {selectItemIcon('RESIDENCE')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Résidence
            </Typography>
          </span>
        </MenuItem>
        <MenuItem value="RESTAURANT">
          <span>
            {selectItemIcon('RESTAURANT')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Restaurant
            </Typography>
          </span>
        </MenuItem>
        <MenuItem value="SUPERMARCHE">
          <span>
            {selectItemIcon('SUPERMARCHE')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Supermarché
            </Typography>
          </span>
        </MenuItem>
        <MenuItem value="ECOLE">
          <span>
            {selectItemIcon('ECOLE')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Ecole
            </Typography>
          </span>
        </MenuItem>
        <MenuItem value="STARTUP">
          <span>
            {selectItemIcon('STARTUP')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Start-up
            </Typography>
          </span>
        </MenuItem>
        <MenuItem value="CINEMA">
          <span>
            {selectItemIcon('CINEMA')}
            <Typography style={{ marginLeft: theme.spacing(1) }} variant="inherit">
              Cinéma
            </Typography>
          </span>
        </MenuItem>
      </Select>
      <FormHelperText>
        {categoryError ? 'Le type d\'établissement doit être renseigné.' : '*Requis'}
      </FormHelperText>
    </FormControl>
  );

  return (
    <Card
      style={style}
      classes={{ root: classes.root }}
      ref={ref}
    >
      <div className={classes.mediaContainer}>
        {media}
        <UploadButton
          classes={{ root: classes.upload }}
          uploading={uploading}
          image={Boolean(image)}
          onUploadStart={onUploadStart}
          onFileUploaded={onChange}
        />
      </div>
      {select}
      <div className={classes.sideMediaContainer}>
        <Portrait classes={{ root: classes.sideMedia }} icon={Icon} />
        <div className={classes.namesContainer}>
          <InputWithHelp
            input={(className) => (
              <TextField
                classes={{ root: className }}
                required
                id="shortname"
                name="shortname"
                label="Nom Court"
                value={shortname || ''}
                inputProps={{ maxLength: 19 }}
                helperText="*Requis"
                error={shortnameError}
                onChange={onChange}
              />
            )}
            message={shortnameDescription}
          />
          <InputWithHelp
            input={(className) => (
              <TextField
                classes={{ root: className }}
                required
                id="longname"
                name="longname"
                label="Nom Long"
                value={longname || ''}
                helperText="*Requis"
                error={longnameError}
                onChange={onChange}
              />
            )}
            message={longnameDescription}
          />
        </div>
      </div>
      <InputWithHelp
        classes={{
          root: classes.smalldescription,
          helpContainer: classes.smalldescriptionHelp,
        }}
        input={(className) => (
          <TextField
            classes={{ root: className }}
            required
            variant="outlined"
            multiline
            rows={2}
            id="smalldescription"
            name="smalldescription"
            label="Description Courte"
            value={smalldescription || ''}
            inputProps={{ maxLength: 188 }}
            helperText="*Requis"
            error={smalldescriptionError}
            onChange={onChange}
          />
        )}
        message={smalldescriptionHelp}
      />
      <CardActions className={classes.actionsContainer}>
        <Typography variant="subtitle1" color="textPrimary" component="div">
          ETAPE 1/2
        </Typography>
        <Button
          classes={{ root: classes.action }}
          color="secondary"
          variant="contained"
          onClick={onNext}
        >
          SUIVANT
        </Button>
      </CardActions>
    </Card>
  );
});

Basics.propTypes = {
  style: PropTypes.shape({}),
  /* Image uploadée par l'utilisateur. */
  image: PropTypes.string,
  /*
    Booléen indiquant que le chargement de l'image est en cours.
    true => loading.
    false => not loading.
  */
  uploading: PropTypes.bool,
  /*
    Catégorie de l"établissement à créer choisie par l'utilisateur courant.
  */
  category: PropTypes.string,
  /*
    Nom court de l'établissement à créer choisi par l'utilisateur.
    Ce nom court fait au maximum 19 caractères.
  */
  shortname: PropTypes.string,
  /*
    Nom long de l'établissement à créer choisi par l'utilisateur.
    Ce champ peut être aussi long que voulu.
  */
  longname: PropTypes.string,
  /*
    Description courte attractive de l'établissement choisie
    par l'utilisateur.
  */
  smalldescription: PropTypes.string,
  /*
    Erreurs pouvant survenir au niveau du composant
    Basics lorsque le formulaire de création est soumis.
    Par exemple, si une valeur truthy correspond à la clé
    CATEGORY_EMPTY dans l'objet errors, le composant Select
    affichera une erreur appropriée demandant la sélection
    d'au moins une catégorie d'établissement.
  */
  errors: PropTypes.shape({
    CATEGORY_EMPTY: PropTypes.number,
    SHORTNAME_EMPTY: PropTypes.number,
    LONGNAME_EMPTY: PropTypes.number,
    SMALL_DESCRIPTION_EMPTY: PropTypes.number,
  }),
  /* Fonction déclenchée dès que le bouton d'upload est cliqué. */
  onUploadStart: PropTypes.func.isRequired,
  /*
    Fonction déclenchée dès que l'utilisateur courant saisit
    une valeur donnée dans le formulaire de création des
    établissements.
    Cette valeur peut très bien être la valeur d'un champ
    de sélection, une valeur entrée dans un input ou une
    image.
    Cette fonction est appelée avec en paramètre un évènement
    approprié contenant dans ces attributs name, value et files
    les valeurs renseignées et les champs concernés par l'action
    de l'utilisateur.
  */
  onChange: PropTypes.func.isRequired,
  /*
    Fonction déclenchée lors du clic sur le bouton "Suivant" pour
    passer à l'étape suivante de création d'entreprise.
  */
  onNext: PropTypes.func.isRequired,
};

Basics.defaultProps = {
  style: {},
  /* Par défaut, on considère que l'utilisateur courant ne charge pas
     d'image pour son établissement.
   */
  uploading: false,
  /*
    Champs par défaut à null si non renseignés contenant les informations
    renseignées par l'utilisateur. Pour plus d'information sur ces valeurs,
    se référer aux définitions des propTypes ci-dessus.
  */
  image: null,
  category: null,
  shortname: null,
  longname: null,
  smalldescription: null,
  /*
    Objet censé contenir en clés les différents codes d'erreurs
    correspondant aux différents cas d'erreurs possibles dûs à une mauvaise
    saisie des données par l'utilisateur.
    La liste des codes d'erreur attendus est indiquée dans la définition du champ errors
    dans les PropTypes ci-dessus.
  */
  errors: {},
};

export default Basics;
