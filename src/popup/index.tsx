import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import 'antd/dist/reset.css';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
); 