import React, { useState } from 'react';

/*
  Nous utilisons au sein de l'application quelques composants Material Design
  pour gérer le design.
  En l'occurence, nous utilisons ici les composants Typography et Checkbox
  qui permettent respectivement d'afficher du texte et des checkbox selon
  les règles du Material Design.
*/
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

/*
  Nous utilisons la librairie de styles propre à la librairie Material UI
  qui utilise en interne du JSS et qui permet de gérer le CSS des composants React
  de manière beaucoup plus efficace. Nous pouvons par exemple:
    1) Encapsuler les styles CSS d'un composant à l'intérieur du composant:
       Autrement dit, nous pouvons définir des classes CSS dans le style de ce
       composant sans nous préoccuper de savoir si ces classes sont déjà utilisées
       quelque part ailleurs dans l'application.
    2) Faire dépendre les styles CSS du composant des props passés au composant,
       du state interne du composant ou de toute autre variable interne au composant React.
    3) Permettre à un composant parent de modifier les styles internes de son composant fils
       sans devoir à chaque fois faire passer ces styles en props et devoir explicitement
       les gérer dans le CSS du composant fils.
       Cela peut par exemple être utile si le composant parent souhaite positionner son composant
       fils par exemple.
       Pour cela la librairie de styles Material UI donne accès aux classes CSS utilisées au sein
       du composant fils au composant père en lui permettant de modifier ces classes à volonté.
*/
import { makeStyles } from '@material-ui/core/styles';

/*
  Le composant PlayerVsComputer est affiché lorsque la partie fait s'affronter un joueur et l'ordinateur.
  Le composant ComputerVsComputer est affiché lorsque la partie fait s'affronter deux ordinateurs.

  Les composants PlayerVsComputer et ComputerVsComputer n'ont pas de logique interne. Ils n'ont pas d'état
  interne et ne déclenchent pas d'effets de bord (appel d'une API externe, ... ). ils se contentent juste
  de recevoir des props et en fonction de ces props de retourner les éléments graphiques attendus.
*/
import PlayerVsComputer from './player-versus-computer';
import ComputerVsComputer from './computer-versus-computer';

/*
  Nous utilisons ici des hooks à chaque fois que la UI doit déclencher un appel vers une API externe
  et ensuite à partir du résultat de cet appel modifer en conséquence et gérer l'état global de notre application.

  Nous aurions ici pu utiliser Redux pour gérer l'état global de notre application, mais nous avons décidé
  d'utiliser ici unqiuement des hooks, car la simplicité de l'application ici construite rendait pour nous l'utilisation
  de Redux pas très appropriée.
  C'est ce que préconise Redux dans sa documentation officille, à savoir n'utiliser
  Redux que lorsque cela est vraiment nécessaire. Ici, l'état global de l'application est implémenté au niveau du
  composant App qui englobe tous les composants de l'application et cela est largement suffisant.
  Par contre, si dans une perspective d'évolution, nous avions voulu implémenter Redux parce que par exemple
  l'application devenait de plus en complexe, cela n'aurait pas significativement impacté le code existant: il
  aurait juste fallu implémenter les hooks useSelector et useDispatch mis à disposition par Redux à l'intérieur
  du code des hooks actuels sans avoir à toucher au composant App ainsi défini.
*/
import usePlay from './hooks/play'; // Permet de stocker le résultat d'une partie dans la base de données et d'en récupérer le résultat.
import useLast from './hooks/last'; // Permet de récupérer le résultat de la partie précédent la partie en cours.
import useNext from './hooks/next'; // Permet de récupérer le résultat de la partie suivant la partie affichée.
import useClear from './hooks/clear'; // Permet de supprimer toutes les parties effectuées et de revenir à l'état initial.


/*
  L'objet passé ou retourné à la fonction makeStyles contient dans ces attributs
  les classes à appliquer aux éléments du composant React.

  Par exemple, les styles indiqués au niveau de l'attribut root sont appliqués à tout
  élément du composant App dont la classe vaut classes.root dans le code ci-dessous.

  Aussi, comme nous passons un objet, nous ne pouvons pas utiliser des tirets comme en CSS
  classique.'jusitfy-content' devient 'justifyContent', 'padding-top' devient paddingTop par exemple, etc...
  L'objet theme ici utilisé dans la fonction makeStyles est le thème Material global à toute l'application.
  On peut donc accéder à ce thème directement dans la définition de nos styles.

  Ici, theme.spacing(1) désigne un pas d'espace, car en Material Design, on a la possibilité de fractionner
  l'espace sur nos vues en de petits échantillons d'espace discrets. Ici, theme.spacing(2) désigne deux
  fois le pas d'espace défini dans le thème Material global et qui vaut par défaut 8.
  theme.spacing(2) vaut donc 16 ici avec la valeur du pas d'espace par défaut.
*/
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 90,
  },
  body: {
    marginTop: 50,
  },
  modes: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 25,
  },
  criteria: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
}));


const welcomeTitle = 'Welcome to the Rock Paper Scissor Tournament !';

/*
  Cette variable indique qui est le vainqueur de la partie actuelle.
  Elle ne prend que trois valeurs possibles 'none', 'left' et 'right'.
  Si elle vaut 'none', aucun des joueurs n'a gagné et la partie est une partie nulle.
  Si elle vaut 'left', alors le joueur du côté gauche de l'écran remporte la partie.
  Si elle vaut 'right', alors le joueur du côté droit de l'écran remporte la partie.
*/
let winner = 'none';
/*
  Cette variable indique quels sont les coups joués dans la partie actuellement affichée à l'écran.
  Elle est un tableau censé exactement contenir deux éléments.
  Le premier élément indique le coup joué par le joueur du côté gauche de l'écran.
  Le second élément indique le coup joué par le joueur du côté droit de l'écran.
  Si ce tableau est vide, c'est que aucun coup n'a actuellement été joué par aucun des deux joueurs.
*/
let moves = [];
/*
  A chaque fois que l'on joue une nouvelle partie, la variable position est augmentée de 1.
  Cette variable est donc l'index de la partie actuellement afiichée à l'écran dans le tableau des parties successives jouées.
*/
let position = (-1);

const App = (props) => {
  /*
    Indique si nous sommes dans un duel joueur contre ordinateur ou dans un duel ordinateur contre oridnateur.
    Elle permet de décider quel composant graphique afficher à l'écran.
    Elle permet également de détecter le changement de mode de jeu.
    Elle ne prend que deux valeurs possibles: 'player-versus-computer' et 'computer-versus-computer'.
  */
  const [mode, setMode] = useState('player-versus-computer');
  const classes = useStyles(props);

  /*
    Les hooks ainsi implémentés retournent tous une variable called,
    Cette variable permet de savoir quel hook a été appelé et de mettre à jour
    les variables winner, moves et position qui sont ensuite passées au composant
    graphique à afficher en fonction du mode de jeu.
  */
  const {
    winner: playWinner,
    moves: playMoves,
    position: playPosition,
    called: playCalled,
    play,
    reinit: playReinit,
  } = usePlay();
  const {
    winner: lastWinner,
    moves: lastMoves,
    position: lastPosition,
    called: lastCalled,
    last,
    reinit: lastReinit,
  } = useLast();
  const {
    winner: nextWinner,
    moves: nextMoves,
    position: nextPosition,
    called: nextCalled,
    next,
    reinit: nextReinit,
  } = useNext();
  const {
    winner: clearWinner,
    moves: clearMoves,
    position: clearPosition,
    called: clearCalled,
    clear,
  } = useClear();

  const toggleMode = (newMode) => {
    if (newMode !== mode) {
      /*
        Au changement de mode, on supprime toutes les parties existantes auparavant.
        Mais les dernières valeurs retournées par les hooks usePlay, useLast et useNext
        ne sont pas réinitialisées.
        On a donc défini dans ces hooks des fonctions permettant de réinitialiser au besoin les valeurs
        retournées par ces hooks et nous les appelons ici.
      */
      playReinit();
      lastReinit();
      nextReinit();
      clear();
    }
    setMode(newMode);
  };

  if (playCalled) {
    winner = playWinner;
    moves = playMoves;
    position = playPosition;
  }

  if (lastCalled) {
    winner = lastWinner;
    moves = lastMoves;
    position = lastPosition;
  }

  if (nextCalled) {
    winner = nextWinner;
    moves = nextMoves;
    position = nextPosition;
  }

  if (clearCalled) {
    winner = clearWinner;
    moves = clearMoves;
    position = clearPosition;
  }

  /*
    Les boutons LastRound et NextRound permettent respectivement de
    revenir à la partie précédant ou suivant la partie actuellement affichée
    à l'écran.
    showLastButton et showNextButton sont des variables indiquant dans les deux
    modes de jeu possible s'il faut ou non afficher l'un ou l'autre des boutons.
  */
  const showLastButton = Boolean(position > 0);
  const showNextButton = Boolean(position < playPosition);

  return (
    <div className={classes.root}> {/* Les styles indiqués dans l'attribut root sont aplliqués à cet élément.  */}
      <div>
        <div className={classes.modes}>
          <div className={classes.criteria}>
            <Checkbox
              checked={mode === 'player-versus-computer'}
              color="secondary"
              inputProps={{ 'aria-label': 'Player versus Computer' }}
              onChange={() => toggleMode('player-versus-computer')}
            />
            <Typography className={classes.label} variant="subtitle2" color="textSecondary">
              {`Player versus Computer`}
            </Typography>
          </div>
          <div className={classes.criteria}>
            <Checkbox
              checked={mode === 'computer-versus-computer'}
              color="secondary"
              inputProps={{ 'aria-label': 'Computer versus Computer' }}
              onChange={() => toggleMode('computer-versus-computer')}
            />
            <Typography className={classes.label} variant="subtitle2" color="textSecondary">
              {`Computer versus Computer`}
            </Typography>
          </div>
        </div>
        <div className={classes.game}>
          <Typography align="center" component="div" variant="h4">{welcomeTitle}</Typography>
          {mode === 'player-versus-computer' && (
            <PlayerVsComputer
              classes={{ root: classes.body }}
              winner={winner}
              moves={moves}
              showLastButton={showLastButton}
              showNextButton={showNextButton}
              play={() => play()}
              last={() => last()}
              next={() => next()}
            />
          )}
          {mode === 'computer-versus-computer' && (
            <ComputerVsComputer
              classes={{ root: classes.body }}
              winner={winner}
              moves={moves}
              showLastButton={showLastButton}
              showNextButton={showNextButton}
              play={() => play()}
              last={() => last()}
              next={() => next()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
