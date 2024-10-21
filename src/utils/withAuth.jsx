import React from 'react';
import NotAuthorisedComponent from '../pages/shared/NotAuthorisedComponent';
import { useUser } from '../contexts/userDataContext';

const withAuth = (Component) => {
  return function AuthWrapper(props) {
    const userData = useUser();
    // A better check could be done, but this is functionally good enough.
    const isAuthorized = (userData != null);

    if (isAuthorized) {
      return <Component {...props} />;
    }
    return <NotAuthorisedComponent />;
  };
};

export default withAuth;
