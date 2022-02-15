import React, { useState } from 'react';
import { Account } from './components/Accounts';
import Status from './components/Status';

/*
* Load Account Component for access to context and pass in Status as the child component
 */
const App = () => {
  const [status, setStatus] = useState(false)
  return (
    <Account>
      <Status status={status} setStatus={setStatus} />
    </Account>
  )
}

export default App
