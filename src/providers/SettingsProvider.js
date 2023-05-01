import { loadSettings, storeSettings } from '@/helpers/settings';
import { setCssValues, updateCssVariablesIfNeeded } from '@/helpers/css';
import React from 'react';
import Settings from '@/components/Settings';
import useKeyUp from '@/hooks/use-key-up';

export const SettingsContext = React.createContext();

const DEFAULT_SETTINGS = Object.freeze({
  columnCount: 4,
  cycle: true,
  rowCount: 4,
  showDiscovered: false,
  tileBackColor: 'rgb(255 255 255 / 40%)',
});

const SettingsProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(() => {
    const settings = loadSettings() ?? DEFAULT_SETTINGS;
    setCssValues(settings.tileBackColor, settings.rowCount, settings.columnCount);
    return settings;
  });

  const openSettings = React.useCallback(() => setIsOpen(true), []);

  const closeSettings = React.useCallback(() => setIsOpen(false), []);

  useKeyUp('Escape', closeSettings);

  const saveSettings = React.useCallback((newSettings) => {
    setIsOpen(false);
    setSettings(newSettings);
    storeSettings(newSettings);
    updateCssVariablesIfNeeded(newSettings.tileBackColor, newSettings.rowCount, newSettings.columnCount);

    /*
     * if (updateCssVariablesIfNeeded(newSettings.rowCount, newSettings.columnCount)) {
     *   reset(true);
     * }
     */
  }, []);

  const value = React.useMemo(
    () => ({
      openSettings,
      settings,
    }),
    [openSettings, settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
      {isOpen && <Settings onCloseSettings={closeSettings} onSaveSettings={saveSettings} settings={settings} />}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
