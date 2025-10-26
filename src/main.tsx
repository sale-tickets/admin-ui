import { MantineProvider } from "@mantine/core";
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import { MotionConfig } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { BaseTheme } from './theme/base.ts';

import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={BaseTheme}
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <MotionConfig transition={{ duration: 0.2 }}>
            <BrowserRouter>
              <App />
              <Notifications />
            </BrowserRouter>
          </MotionConfig>
        </MantineEmotionProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
