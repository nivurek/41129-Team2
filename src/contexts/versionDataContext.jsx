import { createContext, useContext, useState } from 'react';

const VersionContext = createContext(null);

export const useVersion = () => useContext(VersionContext);

export const VersionProvider = ({ children }) => {
  const [versionData, updateVersionData] = useState(null);
  const [openVersionIdx, updateOpenVersionIdx] = useState(null);

  return (
    <VersionContext.Provider value={{ versionData, updateVersionData, openVersionIdx, updateOpenVersionIdx }}>
      {children}
    </VersionContext.Provider>
  );
};

export const withVersionContext = (Component) => {
  return function VersionContextWrapper(props) {

    return <VersionProvider><Component {...props} /></VersionProvider>;
  };
};