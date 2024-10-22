import React, { useState } from "react";

import ResultsComponent from 'pages/shared/Results/ResultsComponent';

const LandingPage = ({authorised}) => {

    return (
        <ResultsComponent authorised={authorised} />
    )
};

export default LandingPage;