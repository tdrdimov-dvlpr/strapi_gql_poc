import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const categories = gql`
 query GetCategoryBySlug($slug: String) {
  categories(filters:{slug: {eq: $slug}}) {
    data {
      attributes {
        name
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
    }
  }
}
`

export default function Category(props) {
  const { slug } = useParams()
  const { loading, error, data } = useQuery(categories, {
    variables: { slug }
  })

  if (loading) return <p>Loading...</p>
  if (error) return console.log('!!!!!!!!!!', error)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>{data.categories.data[0].attributes.name}</h1>
      <Grid container item xs={10} spacing={3}>
        {data.categories.data[0].attributes.products.data.map(prd =>
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
    </Box>
  )
}
