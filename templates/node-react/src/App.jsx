/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import OracleLogo from './assets/ORCL.svg'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState()
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/connection/status');
        const data = await response.json();

        console.log(data);

        if (data.status === 'ok') {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const checkingConnection = (isConnected) => {
    if (isConnected == undefined) {
      return 'Checking connection status...'
    } else if (isConnected) {
      return 'Database is working!'
    } else {
      return 'Something is wrong with the database!'
    }

  }

  return (
    <>
      <div>
        <a href="https://www.oracle.com/uk/database/" target="_blank">
          <img src={OracleLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{checkingConnection(isConnected)}</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Oracle and React logos to learn more
      </p>
    </>
  )
}

export default App
