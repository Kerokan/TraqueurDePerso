import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import OBR from '@owlbear-rodeo/sdk';
import { setupContextMenu } from './contextMenu.tsx';
import { refreshBar } from './healthBar.tsx';
import FontStyles from "./fontStyles";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FontStyles/>
    <App />
  </React.StrictMode>,
)

OBR.onReady(() => {
  setupContextMenu();
  OBR.scene.items.onChange(refreshBar);
});