// server install and init
// npx json-server --port 3001 --watch db.json

// Install json-server as a development dependency (only used during development) by executing the command:
// npm install json-server --save-dev

/*
{
  // ... 
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "json-server -p3001 --watch db.json"
  },
}
*/

import "./App.css";
import Phonebook from "./components/phonebook/Phonebook";

const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  );
};

export default App;
