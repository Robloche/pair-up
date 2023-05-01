import { loadSettings, storeSettings } from '@/helpers/settings';
import { setRowColumnCssValues, setTileBackColorCssValue } from '@/helpers/css';
import React from 'react';
import Settings from '@/components/Settings';
import useKeyUp from '@/hooks/use-key-up';

export const SettingsContext = React.createContext();

const DEFAULT_SETTINGS = Object.freeze({
  columnCount: 4,
  cycle: true,
  rowCount: 4,
  showDiscovered: false,
  showShuffle: true,
  tileBackColor: '#666666',
});

const SettingsProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(() => {
    const settings = loadSettings(DEFAULT_SETTINGS);
    setRowColumnCssValues(settings.rowCount, settings.columnCount);
    setTileBackColorCssValue(settings.tileBackColor);
    return settings;
  });

  const openSettings = React.useCallback(() => setIsOpen(true), []);

  const closeSettings = React.useCallback(() => setIsOpen(false), []);

  const applyCssRowColumnSettings = React.useCallback((rowCount, columnCount) => {
    setRowColumnCssValues(rowCount, columnCount);
  }, []);

  useKeyUp('Escape', closeSettings);

  const saveSettings = React.useCallback((newSettings) => {
    setIsOpen(false);
    setSettings(newSettings);
    setTileBackColorCssValue(newSettings.tileBackColor);
    storeSettings(newSettings);
  }, []);

  const value = React.useMemo(
    () => ({
      applyCssRowColumnSettings,
      defaultSettings: DEFAULT_SETTINGS,
      openSettings,
      settings,
    }),
    [applyCssRowColumnSettings, openSettings, settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
      {isOpen && <Settings onCloseSettings={closeSettings} onSaveSettings={saveSettings} settings={settings} />}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
