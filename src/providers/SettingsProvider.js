import { loadSettings, storeSettings } from '@/helpers/settings';
import { setRowColumnCssValues, setTileBackColorCssValue } from '@/helpers/css';
import React from 'react';
import Settings from '@/components/Settings';

export const SettingsContext = React.createContext();

const DEFAULT_SETTINGS = Object.freeze({
  columnCount: 4,
  cycle: true,
  rowCount: 4,
  showDiscovered: false,
  showShuffle: true,
  sound: true,
  tileBackColor: '#90C590',
});

const SettingsProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(() => {
    const settings = loadSettings(DEFAULT_SETTINGS);
    setRowColumnCssValues(settings.rowCount, settings.columnCount);
    setTileBackColorCssValue(settings.tileBackColor);
    return settings;
  });
  const [triggerReset, setTriggerReset] = React.useState(true);

  const clearTriggerReset = React.useCallback(() => setTriggerReset(false), []);

  const openSettings = React.useCallback(() => setIsOpen(true), []);

  const closeSettings = React.useCallback(() => setIsOpen(false), []);

  const applyCssRowColumnSettings = React.useCallback((rowCount, columnCount) => {
    setRowColumnCssValues(rowCount, columnCount);
  }, []);

  const saveSettings = React.useCallback(
    (newSettings) => {
      setIsOpen(false);
      setSettings(newSettings);
      setTileBackColorCssValue(newSettings.tileBackColor);
      storeSettings(newSettings);
      setTriggerReset(newSettings.rowCount !== settings.rowCount || newSettings.columnCount !== settings.columnCount);
    },
    [settings]
  );

  const value = React.useMemo(
    () => ({
      applyCssRowColumnSettings,
      clearTriggerReset,
      defaultSettings: DEFAULT_SETTINGS,
      openSettings,
      settings,
      triggerReset,
    }),
    [applyCssRowColumnSettings, clearTriggerReset, openSettings, settings, triggerReset]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
      {isOpen && <Settings onCloseSettings={closeSettings} onSaveSettings={saveSettings} settings={settings} />}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
