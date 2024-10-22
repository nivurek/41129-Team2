import React from "react";

import ResultsComponent from 'pages/shared/Results/ResultsComponent';

const LandingPage = ({isAuth}) => {

    return (
        <ResultsComponent isAuth={isAuth} />
    )
};

export default LandingPage;