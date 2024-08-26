import './App.css'
import './globals.css'
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './configs/authConfig';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthenticationPage from './features/authentication/LoginPage';
import TargetCommissionPage from './features/target-commission/TargetCommissionPage';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<TargetCommissionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MsalProvider>
  )
}

export default App
