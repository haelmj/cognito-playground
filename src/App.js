import React from 'react';
import { Account } from './components/Accounts';
import Status from './components/Status';

/*
* Load Account Component for access to context and pass in Status as the child component
 */
const App = () => {
  
  return (
    <Account>
      <Status />
    </Account>
  )
}

export default App
