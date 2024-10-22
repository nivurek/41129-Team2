import { createContext, useContext, useState } from 'react';

const ResultIdxContext = createContext(null);

export const useResultIdx = () => useContext(ResultIdxContext);

export const OpenResultIdxProvider = ({ children }) => {
  const [openResultIdx, updateOpenResultIdx] = useState(null);

  return (
    <ResultIdxContext.Provider value={{ openResultIdx, updateOpenResultIdx }}>
      {children}
    </ResultIdxContext.Provider>
  );
};

export const withOpenResultIdxCtx = (Component) => {
  return function AuthWrapper(props) {

    return <OpenResultIdxProvider><Component {...props} /></OpenResultIdxProvider>;
  };
};
