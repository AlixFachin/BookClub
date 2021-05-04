import React from 'react';

import {useHistory} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import PropTypes from 'prop-types';

const Auth0ProviderWithHistory = ({children}) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const history = useHistory();

  const onRedirectCallBack = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      cliendId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallBack={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};

Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.element,
};

export default Auth0ProviderWithHistory;
