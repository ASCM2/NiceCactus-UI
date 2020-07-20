import React from 'react';
import { withSize } from 'react-sizeme';

import Paper from '@material-ui/core/Paper';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';

import EquallySpacedLayout from '../Layouts/equally-spaced';


const useStyles = makeStyles({
  root: {
    padding: '15px 0',
  },
});

const skeletonHeight = 250;
const skeletonWidth = 300;
const BusinessGallerySkeleton = withSize()((props) => {
  const { size: { width }, ...rest } = props;
  const classes = useStyles({ ...rest });
  const skeletonNumber = Math.floor(width / skeletonWidth);

  return (
    <Paper
      className={classes.root}
      elevation={1}
    >
      <EquallySpacedLayout
        gap={0}
        column={skeletonWidth}
        items={Array(skeletonNumber).fill(null).map(
          () => <Skeleton variant="rect" width={skeletonWidth} height={skeletonHeight} />,
        )}
      />
    </Paper>
  );
});

export default BusinessGallerySkeleton;
