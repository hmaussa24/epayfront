import React from 'react';

const BodyComponent = ({children}) => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {children}
    </div>

  );
};

export default BodyComponent;