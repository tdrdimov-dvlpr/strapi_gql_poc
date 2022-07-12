import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryFilter from '../components/CategoryFilter'

const products = gql`
  query getProducts {
    products {
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

export default function StoreFront(props) {
  const { loading, error, data } = useQuery(products)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={2} style={{ display: 'flex' }}>
          <CategoryFilter />
        </Grid>
        <Grid container item xs={10} spacing={3}>
          {data.products.data.map(prd =>
            <Grid key={prd.attributes.slug} item xs={3} style={{ display: 'flex' }}>
              <Card style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  alt={prd.attributes.slug}
                  height="140"
                  image={`${props.baseURL}${prd.attributes.image.data ? prd.attributes.image.data.attributes.url : ''}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prd.attributes.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prd.attributes.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/product/${prd.attributes.slug}`}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}