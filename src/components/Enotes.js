import React from 'react';

const Enotes = () => {
  //inline styles for centering content
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',     
    height: '60vh',           
    textAlign: 'center',      
  };

  const headingStyle = {
    margin: 0,
  };

  const paragraphStyle = {
    fontSize: '18px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={headingStyle}>Welcome to Enotes</h1>
        <p style={paragraphStyle}>You can keep your notes safe here.</p>
      </div>
    </div>
  );
};

export default Enotes;