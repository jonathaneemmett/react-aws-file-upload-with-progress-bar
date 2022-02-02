import React, { useState } from 'react';
import AWSFileUpload from "./components/shared/AWSFileUpload";


function App() {

  return (
    <div className="App" >
      <AWSFileUpload folder="test" />
    </div>
  );
}

export default App;
