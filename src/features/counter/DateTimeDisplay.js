import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  const padValue = ('0'+ value).slice(-2)
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p>{padValue}</p>
        {/* <span>{type}</span> */}
    </div>
  );
};

export default DateTimeDisplay
