import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { TailwindIndicator } from '@/blocks/TailwindIndicator';
import { isDev } from '@/config';
import { ChatPage, StartPage } from '@/pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* finished */}
    </Routes>
  );
}

const __showIndicator = true && isDev;

export function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
      <ToastContainer />
      {__showIndicator && <TailwindIndicator />}
    </HelmetProvider>
  );
}
