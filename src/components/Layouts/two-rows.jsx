import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: ({ number, height, gap }) => {
    let style = {
      width: '100%',
      height,
      display: 'grid',
    };

    if (number === 1) {
      style = {
        ...style,
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      };
    }

    if (number >= 2) {
      style = {
        ...style,
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
        gridRowGap: gap,
      };
    }

    return style;
  },
});

const TwoRows = (props) => {
  const {
    items, height, gap,
    ...rest
  } = props;
  const classes = useStyles({
    number: items.length, height, gap, ...rest,
  });

  if (items.length === 0) return null;

  return (
    <div className={classes.root}>
      {items.slice(0, 2)}
    </div>
  );
};

TwoRows.propTypes = {
  height: PropTypes.number.isRequired,
  gap: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
};

TwoRows.defaultProps = {
  gap: 20,
};

export default TwoRows;
