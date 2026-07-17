import React, { useState, useEffect } from "react";
import { I18nContext } from "./context";
import languages from "./languages";

export function AutoI18nProvider({
  children,
  defaultLanguage = "en",
  detectBrowserLanguage = true,
}) {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const browserLanguage = navigator.language;

    const lang = detectBrowserLanguage ? browserLanguage : defaultLanguage;

    loadLanguage(lang);
  }, []);

  async function loadLanguage(lang) {
    // Try the exact locale first (zh-CN, fr-CA, en-GB)
    let loader = languages[lang];

    // If not found, try the base language (zh, fr, en)
    if (!loader && lang.includes("-")) {
      loader = languages[lang.split("-")[0]];
    }

    // If still not found, use the default language
    if (!loader) {
      loader = languages[defaultLanguage];
    }

    const json = await loader();

    setLanguage(lang);

    setTranslations(json.default);
  }
  function t(key) {
    return translations[key] || key;
  }

  return (
    <I18nContext.Provider
      value={{
        t,
        language,
        setLanguage: loadLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}
