/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'containers/LoginPage/Loadable';
import MainPage from 'containers/MainPage/Loadable';
import { AuthProvider } from '../../context/Auth';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper>
        <Helmet
          titleTemplate="People Tech CRUD"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={MainPage} />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    </AuthProvider>
  );
}
