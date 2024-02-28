import ReactDOM from 'react-dom';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from '@admin/app';
import './styles/main.scss';
import { AuthContextProvider } from '@admin/features/authentication/context/auth.context';
import { ThemeProvider } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { BrowserRouter } from 'react-router-dom';
import { DialogContextProvider } from '@admin/context/dialog';
import Hooks from '@shared/features/hooks';
import { SnackbarContextProvider } from './context/snackbar';

initializeIcons();

declare const ROUTER_PATH: string;
declare const PROJECT_ADMIN_ENTRY: string;

try {
  if (PROJECT_ADMIN_ENTRY) {
    require(PROJECT_ADMIN_ENTRY);
  }
} catch (e) {
  //
}

ReactDOM.render(
  <BrowserRouter basename={ROUTER_PATH}>
    <HelmetProvider>
      <ThemeProvider>
        <DialogContextProvider>
          <AuthContextProvider>
            <SnackbarContextProvider>
              <Helmet titleTemplate={`%s - ${process.env.PUBLIC_ADMIN_NAME}`}>
                <title>{process.env.PUBLIC_ADMIN_NAME}</title>
              </Helmet>
              <App />
            </SnackbarContextProvider>
          </AuthContextProvider>
        </DialogContextProvider>
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

window.Hooks = Hooks;

Hooks.addSyncFilter(
  'admin/field',
  (render, field) => {
    console.log(field);
    return () => <div>hello</div>;
  },
  { id: 'hello1' }
);

if (module?.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    Hooks.clearAllQueues();
  });
}
