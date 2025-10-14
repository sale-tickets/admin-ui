import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import { BaseTheme } from './theme/base.ts';
import '@mantine/core/styles.css';
import './index.css';
import { BrowserRouter } from 'react-router';
import { MotionConfig } from 'framer-motion';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={BaseTheme}>
      <MotionConfig transition={{ duration: 0.2 }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </MantineProvider>
  </StrictMode>,
)
