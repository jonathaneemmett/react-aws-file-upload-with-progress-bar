import React, { useState } from 'react';
import AWSFileUpload from "./components/shared/AWSFileUpload";


function App() {
    // Folder can be set or left empty, you do not need this. If you omit it, remove folder prop form component below.
    const [folder, setFolder] = useState('');

    // Progress will take up total width of container, so as this is not needed, some restraint is recommended.
    const containerStyles = {
        margin: "15px auto",
        display: "flex",
        justifyContent: "center"
    }

  return (
    <div style={containerStyles} >
      <AWSFileUpload folder={folder} />
    </div>
  );
}

export default App;
