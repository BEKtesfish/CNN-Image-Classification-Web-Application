import React from 'react';

const ResultDisplay = ({result}) => {
    if(!result) return null;

    return (
        <div>
           <h3>Predition: <h1>{result.prediction}</h1></h3>
           <h3>Confidence: <h1>{100 * result.confidence}</h1></h3>
           
        </div>
    );
};

export default ResultDisplay;