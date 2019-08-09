import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { ViewModeProvider } from './Hooks/useViewMode';
import { CurrentUserProvider } from './Hooks/useCurrentUser';
import { ThemeProvider, createGlobalStyle } from './Theme/styled-components';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import theme from './Theme/theme';
import styled from './Theme/styled-components';
import AppPanel from './Components/Container/AppPanel';

import apolloCodegenData from './github-schema.json';

import { CURRENT_USER } from './Queries/User';

const introspectionQueryResultData = {
  ...apolloCodegenData,
  __schema: {
    ...apolloCodegenData.__schema,
    types: apolloCodegenData.__schema.types.filter(
      type => type.possibleTypes !== null
    )
  }
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

declare global {
  interface Window {
    GITHUB_ACCESS_TOKEN: any;
  }
}

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: 'bearer 6b52542db1cffe837250d13ca681a8f893b8b6ca', // tslint:disable-line
        Accept: 'application/vnd.github.merge-info-preview+json'
      }
    })
  ]),
  cache
});

const ContentWrapper = styled.div`
  padding-top: 60px;
`;

const Loader: React.FC = () => <p>Fetching initial data ...</p>;

const Test = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);

  console.log(data, loading, error);
  return <p>test</p>;
};

const GlobalStyle = createGlobalStyle`

  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
    font-family: 'Roboto';
    font-size: 14px;
    color:${props => props.theme.colors.dark};
    background: #f4f4f4;
    margin: 0;
  }
`;

const Dashboard = () => (
  <ApolloProvider client={client}>
    <ViewModeProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <CurrentUserProvider>
            <GlobalStyle />
            <AppPanel />
            <ContentWrapper>
              <App />
            </ContentWrapper>
          </CurrentUserProvider>
        </Suspense>
      </ThemeProvider>
    </ViewModeProvider>
  </ApolloProvider>
);

ReactDOM.render(<Dashboard />, document.getElementById('root'));
