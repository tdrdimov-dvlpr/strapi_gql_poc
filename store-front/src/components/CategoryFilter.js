import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const categories = gql`
  query getCategories {
    categories {
      data {
        attributes {
          name
          slug
        }
      }
    }
  }
`

export default function StoreFront(props) {
    const { loading, error, data } = useQuery(categories)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <List>
            {data.categories.data.map(cat =>
                <ListItem key={cat.attributes.slug} disablePadding>
                    <Link to={`/category/${cat.attributes.slug}`}>
                        <ListItemButton>
                            <ListItemText primary={cat.attributes.name} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            )}
        </List>
    )
}