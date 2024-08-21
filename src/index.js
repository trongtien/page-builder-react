import './assets/scss/tailwindcss.css'
import './assets/scss/app.scss'

import React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import * as serviceWorker from "./serviceWorker";

const root = createRoot(document.getElementById("root"));

root.render(<App />);

if (module.hot) {
  module.hot.accept();
}
serviceWorker.unregister();
