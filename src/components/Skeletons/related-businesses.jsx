import React from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';

import { makeStyles } from '@material-ui/core/styles';

import EquallySpacedLayout from '../Layouts/equally-spaced';
import RelatedSkeleton from './related';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const column = 400;
const Related = (props) => {
  const { size: { width }, ...rest } = props;
  const classes = useStyles({ ...rest });
  const cols = Math.floor(width / column);

  return (
    <div className={classes.root}>
      <EquallySpacedLayout
        classes={{ root: classes.root }}
        column={column}
        items={Array(2 * cols).fill(<RelatedSkeleton />)}
      />
    </div>
  );
};

Related.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default withSize()(Related);
