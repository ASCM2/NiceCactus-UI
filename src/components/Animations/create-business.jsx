/*
  Liste des tests (Début)

   1) Vérifier que par défaut l'étape Basics est affichée en subissant
      une transition de type Grow.
   2) Vérifier que si la prop step est initialement à 'basics', alors
      l'étape Basics est uniquement affichée en subissant une transition de type
      Grow.
   3) Vérifier que si la prop step est initialement à 'location', alors
      l'étape Location est uniquement affichée en subissant une transition de type
      Grow.
   4) Vérifier que si la prop step passe de 'basics' à 'location', alors une transition
      Slide de sortie vers la gauche est appliquée à l'étape Basics, tandis qu'une transition
      Slide d'entrée de la droite vers le centre est appliquée à l'étape Location.
   5) Vérifier que si la prop step passe de 'location' à 'basics', alors une transition
      Slide de sortie vers la droite est appliquée à l'étape Location, tandis qu'une transition
      Slide d'entrée de la gauche vers le centre est appliquée à l'étape Basics.
   6) Vérifier que si la prop step passe de 'basics' à 'basics' ou de 'location' à 'location',
      l'étape en cours ne subit aucune transition.

  P.S: Effectuer un snapshot dès qu'un test portant sur les composants est effectué.

  Liste des tests (Fin)
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

import { withTheme, withStyles } from '@material-ui/core/styles';


const GrowStyleProvider = (props) => {
  const { style, node } = props;

  return node(style);
};

GrowStyleProvider.propTypes = {
  style: PropTypes.shape({}),
  node: PropTypes.func.isRequired,
};

GrowStyleProvider.defaultProps = {
  style: {},
};

const SlideExit = (props) => {
  const { direction, delay, children } = props;
  const [exit, setExit] = useState(false);

  setTimeout(setExit, delay, true);

  return (
    <Slide
      mountOnEnter
      unmountOnExit
      appear={false}
      in={!exit}
      enter={false}
      exit
      direction={direction}
    >
      {children}
    </Slide>
  );
};

SlideExit.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  delay: PropTypes.number,
  children: PropTypes.node.isRequired,
};

SlideExit.defaultProps = {
  delay: 1,
};

const SlideEnter = (props) => {
  const { direction, delay, children } = props;
  const [enter, setEnter] = useState(false);

  setTimeout(setEnter, delay, true);

  return (
    <Slide
      mountOnEnter
      unmountOnExit
      appear
      in={enter}
      enter
      exit={false}
      direction={direction}
    >
      {children}
    </Slide>
  );
};

SlideEnter.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  delay: PropTypes.number,
  children: PropTypes.node.isRequired,
};

SlideEnter.defaultProps = {
  delay: 1,
};

class CreateBusinessAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: undefined,
      animations: {
        basics: {
          type: undefined, direction: undefined,
        },
        location: {
          type: undefined, direction: undefined,
        },
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { step } = props;
    const { animations, currentStep } = state;

    // Le composant actuel est monté pour la toute première fois.
    if (currentStep === undefined) {
      if (step === 'basics') {
        return {
          currentStep: step,
          animations: {
            ...animations,
            basics: { type: 'grow', direction: undefined },
          },
        };
      }

      if (step === 'location') {
        return {
          currentStep: step,
          animations: {
            ...animations,
            location: { type: 'grow', direction: undefined },
          },
        };
      }
    }

    if (currentStep === 'basics' && step === 'location') {
      return {
        currentStep: step,
        animations: {
          basics: { type: 'slide', direction: 'right' },
          location: { type: 'slide', direction: 'left' },
        },
      };
    }

    if (currentStep === 'location' && step === 'basics') {
      return {
        currentStep: step,
        animations: {
          basics: { type: 'slide', direction: 'right' },
          location: { type: 'slide', direction: 'left' },
        },
      };
    }

    return { animations, currentStep };
  }

  render() {
    const {
      basics, location, theme, classes,
    } = this.props;
    const { currentStep, animations } = this.state;

    return (
      <div style={{ overflow: 'hidden', flexGrow: 1 }} className={classes.root}>
        {!animations.basics.type && !animations.location.type && currentStep === 'basics' && basics({})}
        {!animations.basics.type && !animations.location.type && currentStep === 'location' && location({})}
        {animations.basics.type === 'grow' && currentStep === 'basics' && (
          <Grow in>
            <GrowStyleProvider
              node={(transitionStyles) => basics(transitionStyles)}
            />
          </Grow>
        )}
        {animations.location.type === 'grow' && currentStep === 'location' && (
          <Grow in>
            <GrowStyleProvider
              node={(transitionStyles) => location(transitionStyles)}
            />
          </Grow>
        )}
        {animations.location.type === 'slide' && currentStep === 'location' && (
          <>
            <SlideExit direction={animations.basics.direction} delay={0}>
              {basics({})}
            </SlideExit>
            <SlideEnter
              direction={animations.location.direction}
              delay={theme.transitions.duration.leavingScreen}
            >
              {location({})}
            </SlideEnter>
          </>
        )}
        {animations.basics.type === 'slide' && currentStep === 'basics' && (
          <>
            <SlideExit direction={animations.location.direction} delay={0}>
              {location({})}
            </SlideExit>
            <SlideEnter
              direction={animations.basics.direction}
              delay={theme.transitions.duration.leavingScreen}
            >
              {basics({})}
            </SlideEnter>
          </>
        )}
      </div>
    );
  }
}

CreateBusinessAnimation.propTypes = {
  /*
    Classes de styles pour le composant Animation.
    Les styles appliquées au composant root s'appliquent
    aux deux étapes Basics et Location.
  */
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  /*
    Thème Material UI.
  */
  theme: PropTypes.shape({
    transitions: PropTypes.shape({
      duration: PropTypes.shape({
        leavingScreen: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  /*
    N.B: Pour comprendre l'utilisation des transitions
    de type Grow et Slide, veuillez vous rendre à la page
    de documentation des transitions Material UI.

    Prop représentant l'étape en cours à afficher
    actuellement.
    'basics' => l'étape Basics représentée par la
    prop basics est l'étape actuellement affichée.
    'location' => l'étape Location représentée par
    la prop location est l'étape actuellement affichée.

    L'évolution de la prop step au cours du temps
    détermine le type d'animations subit par les
    étapes Basics et Location.

    Au tout premier rendu:
      _Si la prop step est à basics, alors l'étape basics
      est uniquement affichée et subit une transition de type
      Grow depuis son centre
      _Si la prop step est à location, alors l'étape location
      est uniquement affichée et subit une transition de type
      Grow depuis son centre.

    Aux rendus suivants, quatre variations de valeur
    pour la prop step sont possibles:
      _'basics' => 'location':
        L'étape basics subit une transition de sortie slide
        depuis le centre de l'écran vers la gauche de l'écran.
        L'étape location subit une transition d'entrée slide
        depuis la droite de l'écran vers le centre de l'écran.
      _'location' => 'basics':
        L'étape location subit une transition de sortie slide
        depuis le centre de l'écran vers la droite de l'écran.
        L'étape basics subit une transition d'entrée slide
        depuis la gauche de l'écran vers le centre de l'écran.
      _'basics' => 'basics' ou 'location' => 'location':
        L'étape en cours ne subit aucune animation particulière.
  */
  step: PropTypes.oneOf(['basics', 'location']),
  /*
    Fonction retournant un node représentant l'étape Basics
    du formulaire.
    Cette fonction est appelée avec un unique paramètre
    représentant les styles de transitions à appliquer à l'élément
    racine du node retourné en utilisant l'attribut style sur l'élément
    racine du node retourné.
    Si les styles de transition ne sont pas appliqués sur l'attribut racine,
    les transitions ne pourront pas s'appliquer sur l'étape en cours.
  */
  basics: PropTypes.func.isRequired,
  /*
    Fonction retournant un node représentant l'étape Location
    du formulaire.
    Cette fonction est appelée avec un unique paramètre
    représentant les styles de transitions à appliquer à l'élément
    racine du node retourné en utilisant l'attribut style sur l'élément
    racine du node retourné.
    Si les styles de transition ne sont pas appliqués sur l'attribut racine,
    les transitions ne pourront pas s'appliquer sur l'étape en cours.
  */
  location: PropTypes.func.isRequired,
};

CreateBusinessAnimation.defaultProps = {
  /* Initialement et par défaut, l'étape Basics est affichée. */
  step: 'basics',
};

const styles = { root: {} };

export default withTheme(withStyles(styles)(CreateBusinessAnimation));
