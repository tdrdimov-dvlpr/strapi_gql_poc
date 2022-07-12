import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layouts imports
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StoreFront from './pages/StoreFront'
import SingleProduct from './pages/SingleProduct'
import Category from './pages/Category'

import Box from '@mui/material/Box';
const baseURL = 'http://localhost:1337'
const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <Box sx={{ m: 3 }}>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/store" element={<StoreFront baseURL={baseURL} />} />
            <Route path="category/:slug" element={<Category baseURL={baseURL} />} />
            <Route path="product/:slug" element={<SingleProduct baseURL={baseURL} />} />
          </Routes>
        </Box>
      </ApolloProvider>
    </Router>
  );
}

export default App;
