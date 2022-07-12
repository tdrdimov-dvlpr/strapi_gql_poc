import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const products = gql`
 query GetProductBySlug($slug: String) {
  products(filters:{slug: {eq: $slug}}) {
    data {
      attributes {
        price
        name
        description
        slug
        image {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`

export default function SingleProduct(props) {
  const { slug } = useParams()
  const { loading, error, data } = useQuery(products, {
    variables: { slug }
  })

  if (loading) return <p>Loading...</p>
  if (error) return console.log('!!!!!!!!!!', error)

  const prod = data.products.data[0].attributes

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                alt={prod.slug}
                height="440"
                image={`${props.baseURL}${prod.image.data ? prod.image.data.attributes.url : ''}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {prod.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {prod.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="large">Buy Now</Button>
              </CardActions>
            </Card>
          </Grid>
      </Grid>
    </Box>
  )
}
