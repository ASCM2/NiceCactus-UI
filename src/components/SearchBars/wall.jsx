/* Tests (début)

    1) Vérifier que si l'utilisateur clique sur le bouton rechercher avec un terme vide,
       la fonction submit n'est pas appelée.

    2) Vérifier que si l'utilisateur clique sur le bouton rechercher avec un terme non vide,
       la fonction submit est appelée avec en paramètre le terme entré.

    3) Vérifier que si l'utilisateur clique sur un chip, la fonction onChipSelect est
       appelée avec en paramètre la liste des catégories d'établissements sélectionnées
       par l'utilisateur.

    4) Vérifier que dès que le terme de recherche devient vide, la fonction submit est appelée

    P.S: Effectuer un snapshot du composant à chaque fois qu'un test portant
    sur les props du composant est effectué.

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import SupermarketIcon from '@material-ui/icons/ShoppingCart';
import CinemaIcon from '@material-ui/icons/Movie';
import StartUpIcon from '@material-ui/icons/Business';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';

import logo from '../images/logo.svg';

import BusinessChip from '../Chips/business';
import Slider from '../slider';


const logoContainerSize = 105;
const logoContainerPadding = logoContainerSize - 90;
const useStyles = makeStyles({
  root: {
    maxWidth: 958,
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    flexGrow: 1,
    display: 'flex',
  },
  logoContainer: {
    width: logoContainerSize,
    height: logoContainerSize,
    padding: logoContainerPadding,
  },
  logo: {
    height: '100%',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  search: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  searchContent: {
    height: 50,
    width: '100%',
    display: 'flex',
  },
  input: {
    flexGrow: 1,
  },
  inputTextField: {
    height: 50,
    boxSizing: 'border-box',
  },
  submit: {
    width: 80,
    height: 'inherit',
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitIcon: {
    color: 'white',
  },
  divider: {
    margin: '1px 0 0',
  },
  bottom: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: 5,
  },
  filterText: {
    width: logoContainerSize,
    minWidth: logoContainerSize,
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContainer: {
    marginTop: 5,
    /* flexGrow: 1,
    padding: '0 0 0 10px',
    display: 'flex',
    flexWrap: 'wrap',
    jusitifyContent: 'flex-start', */
  },
  chip: {
    marginTop: 5,
    marginRight: 5,
  },
});

const chipsData = [
  {
    label: 'Start-up', icon: StartUpIcon, category: 'STARTUP',
  },
  {
    label: 'Résidence', icon: HomeIcon, category: 'RESIDENCE',
  },
  {
    label: 'Restaurant', icon: RestaurantIcon, category: 'RESTAURANT',
  },
  {
    label: 'Ecole', icon: SchoolIcon, category: 'ECOLE',
  },
  {
    label: 'Supermarché', icon: SupermarketIcon, category: 'SUPERMARCHE',
  },
  {
    label: 'Cinéma', icon: CinemaIcon, category: 'CINEMA',
  },
];

const initialActiveStates = (selected) => {
  const actives = {};

  selected.map((category) => { actives[category] = true; return null; });
  return actives;
};

let search = '';
const SearchBar = (props) => {
  const {
    selected, submit, onChipSelect, ...rest
  } = props;
  const actives = initialActiveStates(selected);
  const classes = useStyles({ ...rest });
  const onSubmit = (term) => (term.length ? submit(term) : null);
  const handleSelect = ({ active, category: ctgry }) => {
    if (active) {
      actives[ctgry] = active;
    } else {
      delete actives[ctgry];
    }

    onChipSelect(Object.keys(actives));
  };

  return (
    <Paper elevation={1} classes={{ root: classes.root }}>
      <div className={classes.head}>
        <div className={classes.logoContainer}>
          <div className={classes.logo} />
        </div>
        <div className={classes.search}>
          <div className={classes.searchContent}>
            <TextField
              autoFocus
              InputProps={{ classes: { input: classes.inputTextField } }}
              classes={{ root: classes.input }}
              placeholder="Rechercher..."
              type="search"
              margin="none"
              variant="outlined"
              onChange={(event) => {
                search = event.target.value;
                if (search.length === 0) {
                  submit(search);
                }
              }}
            />
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={() => onSubmit(search)}
            >
              <SearchIcon classes={{ root: classes.submitIcon }} />
            </Button>
          </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.bottom}>
        <div className={classes.filterText}>
          <Typography variant="body2" color="textPrimary">
            Filtrer par
          </Typography>
        </div>
        <Slider
          classes={{ root: classes.chipsContainer }}
          resize={false}
          moveLen={60}
          items={chipsData.map(({ label, icon: Icon, category }) => (
            <BusinessChip
              key={label}
              active={actives[category]}
              label={label}
              icon={<Icon />}
              onClick={(active) => handleSelect({ active, category })}
            />
          ))}
          left={(className, prev) => (
            <div
              className={className}
              role="button"
              tabIndex={0}
              onClick={prev}
              onKeyPress={prev}
            >
              <LeftArrowIcon />
            </div>
          )}
          right={(className, next) => (
            <div
              className={className}
              role="button"
              tabIndex={0}
              onClick={next}
              onKeyPress={next}
            >
              <RightArrowIcon />
            </div>
          )}
        />
        {/*
        <div className={classes.chipsContainer}>
          {chipsData.map(({ label, icon: Icon, category }) => (
            <div key={label} className={classes.chip}>
              <BusinessChip
                active={actives[category]}
                label={label}
                icon={<Icon />}
                onClick={(active) => handleSelect({ active, category })}
              />
            </div>
          ))}
        </div>
        */}
      </div>
    </Paper>
  );
};

SearchBar.propTypes = {
  /*
     Tableau des chips à activer au niveau de la barre de recherche.
  */
  selected: PropTypes.arrayOf(PropTypes.string.isRequired),
  /*
     Fonction appelée quand l'utilisateur clique sur le bouton de recherche.
     Cette fonction n'est déclenchée que si l'utilisateur a saisi un terme de recherche non vide.
     Elle est appelée avec le terme saisi par l'utilisateur en paramètre.
   */
  submit: PropTypes.func.isRequired,
  /*
     Fonction appelée lorsque l'utilisateur clique sur un chip. Elle est appelée
     avec la liste des catégories des établissements sélectionnés par l'utilisateur.
   */
  onChipSelect: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  selected: [],
};

export default React.memo(SearchBar);
