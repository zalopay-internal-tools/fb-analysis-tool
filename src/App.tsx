import React from 'react';
import 'antd/dist/antd.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { MasterHeader } from './components';
import { TokenProvider } from './context/TokenContext';

function App() {
  React.useEffect(() => {}, []);

  return (
    <TokenProvider>
      <MasterHeader />
      <BrowserRouter basename='/fb-analysis-tool'>
        <AppRoutes />
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
