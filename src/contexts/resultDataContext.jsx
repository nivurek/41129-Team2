import { createContext, useContext, useState } from 'react';

const ResultContext = createContext(null);

export const useResult = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
  const [resultData, updateResultData] = useState(null);
  const [openResultIdx, updateOpenResultIdx] = useState(null);

  return (
    <ResultContext.Provider value={{ resultData, updateResultData, openResultIdx, updateOpenResultIdx }}>
      {children}
    </ResultContext.Provider>
  );
};

export const withResultContext = (Component) => {
  return function ResultContextWrapper(props) {

    return <ResultProvider><Component {...props} /></ResultProvider>;
  };
};