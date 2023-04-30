const storeSettings = (settings) => {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
  } catch {
    console.warn('Local storage seems disable (cannot store settings)');
  }
};

const loadSettings = (settings) => {
  try {
    return JSON.parse(localStorage.getItem('settings'));
  } catch {
    console.warn('Local storage seems disable (cannot load settings)');
    return null;
  }
};

export { loadSettings, storeSettings };
