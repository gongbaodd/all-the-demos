import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const dom = document.getElementById('root') as HTMLElement;
const root = createRoot(dom);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
