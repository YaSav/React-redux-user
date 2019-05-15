import React from 'react';

const ValidationMessage = ({show, error}) => (
    (show && error) && <div className="validation-message">{error}</div>
);

export default ValidationMessage