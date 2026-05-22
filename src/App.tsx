import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { TailwindIndicator } from '@/blocks/TailwindIndicator';
import { chatRoute, isDev, rootRoute, startRoute } from '@/config';
import { ChatPage, IntroPage, StartPage } from '@/pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path={rootRoute} element={<IntroPage />} />
      <Route path={startRoute} element={<StartPage />} />
      <Route path={chatRoute} element={<ChatPage />} />
      {/* <Route path={resultsRoute} element={<ResultsPage />} /> */}
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
