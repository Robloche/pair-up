const storeSettings = (settings) => {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
  } catch {
    console.warn('Local storage seems disable (cannot store settings)');
  }
};

const loadSettings = (defaultSettings) => {
  try {
    const settings = JSON.parse(localStorage.getItem('settings'));
    return {
      ...defaultSettings,
      ...settings,
    };
  } catch {
    console.warn('Local storage seems disable (cannot load settings)');
    return defaultSettings;
  }
};

export { loadSettings, storeSettings };
