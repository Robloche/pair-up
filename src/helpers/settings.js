const SETTINGS_KEY = 'settings';

const storeSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.warn('Local storage seems disable (cannot store settings)');
  }
};

const loadSettings = (defaultSettings) => {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return {
      ...defaultSettings,
      ...settings,
    };
  } catch {
    console.warn('Local storage seems disable (cannot load settings)');
    return defaultSettings;
  }
};

const clearSettings = () => {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    console.warn('Local storage seems disable (cannot clear settings)');
  }
};

export { clearSettings, loadSettings, storeSettings };
