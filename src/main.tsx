import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import { BaseTheme } from './theme/base.ts';
import { BrowserRouter } from 'react-router';
import { MotionConfig } from 'framer-motion';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';

import '@mantine/core/styles.css';
import './index.css';
import { Provider } from 'react-redux';
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
            </BrowserRouter>
          </MotionConfig>
        </MantineEmotionProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
