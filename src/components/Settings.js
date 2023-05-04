import FocusLock from 'react-focus-lock';
import Image from 'next/image';
import React from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';
import closeIcon from '../assets/x.svg';
import styles from './Settings.module.css';

const Settings = ({ onCloseSettings, onSaveSettings, settings }) => {
  const [cycle, setCycle] = React.useState(settings.cycle);
  const [sound, setSound] = React.useState(settings.sound);
  const [showDiscovered, setShowDiscovered] = React.useState(settings.showDiscovered);
  const [showShuffle, setShowShuffle] = React.useState(settings.showShuffle);
  const [tileBackColor, setTileBackColor] = React.useState(settings.tileBackColor);
  const [rowCount, setRowCount] = React.useState(settings.rowCount);
  const [columnCount, setColumnCount] = React.useState(settings.columnCount);

  const { defaultSettings } = React.useContext(SettingsContext);

  const cycleId = React.useId();
  const soundId = React.useId();
  const showDiscoveredId = React.useId();
  const showShuffleId = React.useId();
  const tileBackColorId = React.useId();
  const rowId = React.useId();
  const columnId = React.useId();

  const cycleOnChange = React.useCallback((event) => {
    setCycle(event.target.checked);
  }, []);

  const soundOnChange = React.useCallback((event) => {
    setSound(event.target.checked);
  }, []);

  const showDiscoveredOnChange = React.useCallback((event) => {
    setShowDiscovered(event.target.checked);
  }, []);

  const showShuffleOnChange = React.useCallback((event) => {
    setShowShuffle(event.target.checked);
  }, []);

  const tileBackColorOnChange = React.useCallback((event) => {
    setTileBackColor(event.target.value);
  }, []);

  const rowCountOnChange = React.useCallback((event) => {
    setRowCount(Number(event.target.value));
  }, []);

  const columnCountOnChange = React.useCallback((event) => {
    setColumnCount(Number(event.target.value));
  }, []);

  const resetOnClick = React.useCallback(() => {
    setCycle(defaultSettings.cycle);
    setSound(defaultSettings.sound);
    setShowDiscovered(defaultSettings.showDiscovered);
    setShowShuffle(defaultSettings.showShuffle);
    setTileBackColor(defaultSettings.tileBackColor);
    setRowCount(defaultSettings.rowCount);
    setColumnCount(defaultSettings.columnCount);
  }, [defaultSettings.columnCount, defaultSettings.cycle, defaultSettings.rowCount, defaultSettings.showDiscovered, defaultSettings.showShuffle, defaultSettings.sound, defaultSettings.tileBackColor]);

  const saveOnClick = React.useCallback(() => {
    onSaveSettings({ columnCount, cycle, rowCount, showDiscovered, showShuffle, sound, tileBackColor });
  }, [columnCount, cycle, onSaveSettings, rowCount, showDiscovered, showShuffle, sound, tileBackColor]);

  const isWarningDisplayed = rowCount !== settings.rowCount || columnCount !== settings.columnCount;

  return (
    <FocusLock className={styles.settingsWrapper} returnFocus>
      <div className={styles.modal}>
        <div className={styles.content}>
          <label htmlFor={cycleId} className={styles.label}>
            Keyboard navigation cycling:
          </label>
          <input checked={cycle} id={cycleId} onChange={cycleOnChange} type='checkbox' />
          <label htmlFor={soundId} className={styles.label}>
            Enable sound:
          </label>
          <input checked={sound} id={soundId} onChange={soundOnChange} type='checkbox' />
          <label htmlFor={showDiscoveredId}>Show already discovered tiles:</label>
          <input checked={showDiscovered} id={showDiscoveredId} onChange={showDiscoveredOnChange} type='checkbox' />
          <label htmlFor={showShuffleId}>Show shuffling animation:</label>
          <input checked={showShuffle} id={showShuffleId} onChange={showShuffleOnChange} type='checkbox' />
          <label htmlFor={tileBackColorId}>Back color of tiles:</label>
          <input id={tileBackColorId} onChange={tileBackColorOnChange} type='color' value={tileBackColor} />
          <label className={styles.fullRow} htmlFor={rowId}>
            Number of rows:
          </label>
          <input id={rowId} max={10} min={1} onChange={rowCountOnChange} type='range' value={rowCount} />
          <span className={styles.count}>{rowCount}</span>
          <label className={styles.fullRow} htmlFor={columnId}>
            Number of columns:
          </label>
          <input id={columnId} max={10} min={1} onChange={columnCountOnChange} type='range' value={columnCount} />
          <span className={styles.count}>{columnCount}</span>
        </div>
        <div className={styles.buttons}>
          <button className={`action ${styles.resetButton}`} onClick={resetOnClick}>
            Reset
          </button>
          <button className={`action ${styles.saveButton}`} disabled={(rowCount * columnCount) % 2 > 0} onClick={saveOnClick}>
            Save & Close
          </button>
        </div>
        {isWarningDisplayed && <div className={styles.warning}>(Changing rows or columns will start a new game.)</div>}
        <button className={styles.closeBtn} onClick={onCloseSettings}>
          <Image alt='Close icon' src={closeIcon} />
        </button>
      </div>
    </FocusLock>
  );
};

export default Settings;
