import React from 'react';

const ValidationMessage = props => (
    props.show
        ? <div className="validation-message">{props.error}</div>
        : null
);


export default ValidationMessage