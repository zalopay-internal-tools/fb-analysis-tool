import React from 'react';
import 'antd/dist/antd.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

function App() {
  React.useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;