import React from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import TwoRows from './two-rows';
import EquallySpacedLayout from './equally-spaced';


const useStyles = makeStyles({
  root: ({ gap }) => ({
    gridRowGap: gap,
  }),
});

const uGenerator = (cols) => (n) => {
  const j = Math.floor(n / cols);
  const i = n - j * cols;

  return (i + j) % 2 === 0 ? 1 : 2;
};

const CheckboardLayout = withSize()((props) => {
  const {
    size: { width },
    height, column,
    gap, items: inputItems,
    ...rest
  } = props;
  const classes = useStyles({
    height, gap, ...rest,
  });

  const cols = Math.floor(width / column);

  const u = uGenerator(cols);
  const items = [];
  let index = 0;
  let n = 0;
  let current;

  while (index < inputItems.length) {
    current = u(n);
    if (current === 1) {
      items.push((
        <div style={{ height }}>
          {inputItems[index]}
        </div>
      ));
      index += 1;
    } else if (current === 2) {
      items.push(
        <TwoRows
          height={height}
          gap={gap}
          items={inputItems.slice(index, index + 2)}
        />,
      );
      index += 2;
    }
    n += 1;
  }

  return (
    <EquallySpacedLayout
      classes={{ root: classes.root }}
      column={column}
      gap={gap}
      items={items}
    />
  );
});

CheckboardLayout.propTypes = {
  height: PropTypes.number,
  column: PropTypes.number,
  gap: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
};

CheckboardLayout.defaultProps = {
  height: 400,
  column: 250,
  gap: 20,
};

export default (props) => (
  <CheckboardLayout
    items={Array(50).fill(null).map(
      () => (
        <Paper
          style={{ width: '100%', height: '100%' }}
          square
        />
      ),
    )}
    {...props}
  />
);
