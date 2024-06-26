import "./index.css"

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App tasks={DATA} />
);

