import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Routing from './Components/Routing/Routing';
import AddJobForm from './Components/AddJobform';
import { BrowserRouter as Router } from "react-router-dom";
import AddjobTable from './Components/AddjobTable';
import SignUp from './Components/SignUp';
function App() {
  
  return (
    <div className="App">
    

    <Routing/>
    
    </div>
  );
}

export default App;
