import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import i18next from "i18next";

import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { DataResultImageProvider } from "./context/DataResultImageContext";

import global_en from "./translation/en/global.json";
import global_vi from "./translation/vi/global.json";
import { I18nextProvider } from "react-i18next";
i18next.init({
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    vi: {
      global: global_vi,
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <DataResultImageProvider>
            <App />
          </DataResultImageProvider>
        </AuthContextProvider>
      </DarkModeContextProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
