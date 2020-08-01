/* global window: false */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    padding: ({ padding }) => `${padding}px 0px`,
    overflow: 'hidden',
  },
  slider: {
    position: 'relative',
    left: 0,
    display: 'grid',
    gridTemplateColumns: ({ number }) => `repeat(${number}, auto) minmax(0px, 1fr)`,
    gridColumnGap: ({ spacing }) => spacing,
    zIndex: 1,
    transition: theme.transitions.create('left'),
  },
  left: ({ placement }) => {
    switch (placement) {
      case 'top':
        return {
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 2,
        };
      case 'center':
        return {
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translate(0, -50%)',
          zIndex: 2,
        };
      case 'bottom':
        return {
          position: 'absolute',
          bottom: 10,
          left: 10,
          zIndex: 2,
        };
      default:
        return {};
    }
  },
  right: ({ placement }) => {
    switch (placement) {
      case 'top':
        return {
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
        };
      case 'center':
        return {
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translate(0, -50%)',
          zIndex: 2,
        };
      case 'bottom':
        return {
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 2,
        };
      default:
        return {};
    }
  },
}));

let rootRef;
let sliderRef;
const Slider = withSize()((props) => {
  const {
    resize, itemsLoaded,
    padding, spacing, items,
    left, right, size: { width },
    moveLen, ...rest
  } = props;
  const [leftGap, setLeftGap] = useState(null);
  const [rightGap, setRightGap] = useState(null);
  const [moving, setMoving] = useState(false);
  const classes = useStyles({
    padding, spacing, number: items.length, ...rest,
  });

  useEffect(() => {
    if (!moving) {
      setLeftGap((-1) * sliderRef.offsetLeft);
      setRightGap(sliderRef.offsetLeft + sliderRef.scrollWidth - rootRef.offsetWidth);
    }
  }, [leftGap, rightGap, width, moving, itemsLoaded]);

  const prev = () => {
    const newLeftGap = leftGap - moveLen > 0 ? leftGap - moveLen : 0;

    sliderRef.style.left = `${(-1) * newLeftGap}px`;
    setMoving(true);
  };

  const next = () => {
    const newLeftGap = rightGap - moveLen > 0 ? leftGap + moveLen : leftGap + rightGap;

    sliderRef.style.left = `${(-1) * newLeftGap}px`;
    setMoving(true);
  };

  const onTransitionEnd = () => {
    setMoving(false);
  };

  if (items.length === 0) return null;

  if (resize) { window.onresize = () => { if (sliderRef) { sliderRef.style.left = '0px'; setMoving(true); } }; }

  return (
    <div ref={(el) => { rootRef = el; }} className={classes.root}>
      {Boolean(leftGap && leftGap > 0) && left(classes.left, prev)}
      <div
        ref={(el) => { sliderRef = el; }}
        className={classes.slider}
        onTransitionEnd={onTransitionEnd}
      >
        {items}
      </div>
      {Boolean(rightGap && rightGap > 0) && right(classes.right, next)}
    </div>
  );
});

Slider.propTypes = {
  resize: PropTypes.bool,
  itemsLoaded: PropTypes.number,
  padding: PropTypes.number,
  spacing: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.node),
  left: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(['top', 'center', 'bottom']),
  moveLen: PropTypes.number,
};

Slider.defaultProps = {
  resize: true,
  itemsLoaded: Number.POSITIVE_INFINITY,
  padding: 0,
  spacing: 10,
  items: [],
  placement: 'center',
  moveLen: 300,
};

export default Slider;
