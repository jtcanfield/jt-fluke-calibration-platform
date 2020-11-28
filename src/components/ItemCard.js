import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Grid, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import defaultIcon from './default.png';

const useStyles = makeStyles(() => ({
  media: {
    height: '75px',
    width: '75px',
    objectFit: 'contain',
    margin: 'auto',
    display: 'block',
  },
}));

function ItemCard({
  category_name: categoryName,
  display_name: displayName,
  description,
  image_uri: imageUri,
}) {
  const classes = useStyles();

  return (
    <Grid item xs={11} md={5} lg={3}>
      <Card raised variant="elevation" id={categoryName}>
        <Grid
          container
          wrap="nowrap"
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              image={imageUri || defaultIcon}
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item>
            <CardContent>
              <Typography>
                {displayName}
              </Typography>
              {description && (
              <Typography>
                Description:
                {description}
              </Typography>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

ItemCard.propTypes = {
  category_name: PropTypes.string,
  display_name: PropTypes.string,
  description: PropTypes.string,
  image_uri: PropTypes.string,
};

ItemCard.defaultProps = {
  category_name: null,
  display_name: null,
  description: null,
  image_uri: null,
};

export default ItemCard;
