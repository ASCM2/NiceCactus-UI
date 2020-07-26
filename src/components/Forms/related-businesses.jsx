import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import InputWithHelp from '../input-with-help';
import RelatedForm from './related';
import NoRelated from '../EmptyStates/no-related';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 960,
  },
  emptystate: {
    marginTop: 75,
  },
  relatedContainer: {
    marginTop: theme.spacing(1),
  },
  related: {
    marginBottom: 20,
  },
}));

const searchMessage = `
  Recherchez un établissement et cliquez sur une suggestion
  pour ajouter un établissement. Si aucune suggestion ne correspond
  à votre recherche, entrez au moins un mot complet, les débuts de mots
  sont ignorés pour des raisons d'optimisation. Si aucun établissement
  ne correspond à votre recherche, alors il n'existe aucun établissement
  correspondant à votre recherche sur notre plateforme.
`;
const header = `
  * Si vous cliquez sur le bouton promouvoir d'un établissement, il apparaîtra
  également sur la carte de votre établissement ainsi que dans vos recommandations
  d'établissement en bas de page.
`;

const RelatedBusinessesForm = (props) => {
  const theme = useTheme();

  const {
    search, suggestions, related,
    onChange, onSelect, onDelete,
    onPromote, onDowngrade, ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <form className={classes.root}>
      <InputWithHelp
        input={(className) => (
          <TextField
            autoComplete="off"
            classes={{ root: className }}
            id="search"
            name="search"
            label="Rechercher un établissement à relier..."
            value={search || ''}
            onChange={onChange}
          />
        )}
        message={searchMessage}
      />
      <Paper className={classes.suggestions} square>
        {suggestions.length > 0 && (
          <List component="nav" aria-label="Search suggestions">
            {suggestions.map((suggestion, index) => (
              <ListItem key={suggestion} onClick={() => onSelect(index)} button>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      {related.length === 0 && (
        <NoRelated
          classes={{ root: classes.emptystate }}
          header="Vous ne disposez d'aucune page reliée"
          subheader={`
            Ajoutez et commentez des pages reliées afin d'améliorer l'intégration
            des nouveaux étudiants et salariés sur la région.
          `}
        />
      )}
      {related.length > 0 && (
        <div className={classes.relatedContainer}>
          <Typography
            style={{ marginTop: theme.spacing(2), marginBottom: 50 }}
            variant="caption"
            component="div"
            color="textPrimary"
          >
            {header}
          </Typography>
          {related.map(
            ({
              show,
              id,
              shortname,
              smalldescription,
              image,
              category,
            }) => (
              <RelatedForm
                key={id}
                classes={{ root: classes.related }}
                show={show}
                image={{
                  alt: `Image principale de ${shortname}`,
                  src: image ? image.src : null,
                }}
                category={category}
                shortname={shortname}
                smalldescription={smalldescription}
                promote={() => onPromote(id)}
                dowgrade={() => onDowngrade(id)}
                onDelete={() => onDelete(id)}
              />
            )
          )}
        </div>
      )}
    </form>
  );
};

RelatedBusinessesForm.propTypes = {
  search: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string.isRequired),
  related: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPromote: PropTypes.func.isRequired,
  onDowngrade: PropTypes.func.isRequired,
};

RelatedBusinessesForm.defaultProps = {
  search: '',
  suggestions: [],
  related: [],
};

export default RelatedBusinessesForm;
/*
const remoteSuggestions = [
  { id: 1, name: 'Centre International de Valbonne' },
  { id: 2, name: 'Polytech Nice Sophia' },
  { id: 3, name: 'Ciro Italian Caffé' },
  { id: 4, name: 'Superette Casino Biot' },
];
const remoteRelated = [];

export default (props) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [related, setRelated] = useState([]);

  setTimeout(setSuggestions, 3000, remoteSuggestions.map(({ name }) => name));
  setTimeout(setRelated, 3000, remoteRelated);

  const onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'search':
        setSearch(value);
        break;
      default:
        break;
    }
  };

  return (
    <RelatedBusinessesForm
      search={search}
      suggestions={suggestions}
      related={related}
      onChange={onChange}
      onSelect={(index) => alert(`Vous venez de choisir la suggestion ${index}`)}
      {...props}
    />
  );
};
*/
