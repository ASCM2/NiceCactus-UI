import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import { useTheme } from '@material-ui/core/styles';


const RelatedFormAnimation = (props) => {
  const { show, node, height } = props;

  const theme = useTheme();
  const duration = theme.transitions.duration.standard;
  const defaultTransitionStyles = {
    opacity: 0,
    height: 0,
    transition: theme.transitions.create(['height', 'opacity'], { duration }),
  };
  const transitionStyles = {
    entering: { opacity: 0, height: 0 },
    entered: { opacity: 1, height },
    exiting: { opacity: 1, height },
    exited: { opacity: 0, height: 0 },
  };

  return (
    <Transition in={show} appear timeout={duration}>
      {(state) => node({ ...defaultTransitionStyles, ...transitionStyles[state] })}
    </Transition>
  );
};

RelatedFormAnimation.propTypes = {
  show: PropTypes.bool,
  height: PropTypes.number.isRequired,
  node: PropTypes.func.isRequired,
};

RelatedFormAnimation.defaultProps = {
  show: true,
};

export default RelatedFormAnimation;
