import React from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: ({
    gutter, column, rows, cols, gap,
  }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${column}px)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    columnGap: gutter,
    gridRowGap: gap,
    paddingLeft: gutter,
  }),
});

const getRowLine = (rows, cols, index) => Math.floor(index / cols) + 1;
const getColumnLine = (rows, cols, index) => (index % cols) + 1;
const EquallySpacedLayout = withSize()((props) => {
  const {
    column, gap, items,
    size: { width }, onWidthComputed,
    ...rest
  } = props;

  const number = items.length;

  if (column <= 0 || number === 0) return null;

  const cols = Math.floor(width / column);
  const rows = Math.floor(number / cols) + 1;
  const gutter = (width - cols * column) / (cols + 1);
  const classes = useStyles({
    gutter, column, rows, cols, gap, ...rest,
  });

  return (
    <div className={classes.root}>
      {items.map((item, index) => (
        <div
          style={{
            gridRow: `${getRowLine(rows, cols, index)} / span 1`,
            gridColumn: `${getColumnLine(rows, cols, index)} / span 1`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
});

EquallySpacedLayout.propTypes = {
  column: PropTypes.number.isRequired,
  gap: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

EquallySpacedLayout.defaultProps = {
  gap: 30,
};

export default EquallySpacedLayout;
