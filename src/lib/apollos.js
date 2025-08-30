import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  credentials: 'include',
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
