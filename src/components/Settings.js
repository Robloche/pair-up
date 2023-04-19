import FocusLock from "react-focus-lock";
import Image from "next/image";
import React from "react";
import closeIcon from "../assets/x.svg";
import styles from "./Settings.module.css";

const Settings = ({ onCloseSettings, onSaveSettings, settings }) => {
  const [cycle, setCycle] = React.useState(settings.cycle);
  const [showDiscovered, setShowDiscovered] = React.useState(
    settings.showDiscovered
  );
  const [rowCount, setRowCount] = React.useState(settings.rowCount);
  const [columnCount, setColumnCount] = React.useState(settings.columnCount);
  const cycleId = React.useId();
  const showDiscoveredId = React.useId();
  const rowId = React.useId();
  const columnId = React.useId();

  const cycleOnChange = React.useCallback((event) => {
    setCycle(event.target.checked);
  }, []);

  const showDiscoveredOnChange = React.useCallback((event) => {
    setShowDiscovered(event.target.checked);
  }, []);

  const rowCountOnChange = React.useCallback((event) => {
    setRowCount(Number(event.target.value));
  }, []);

  const columnCountOnChange = React.useCallback((event) => {
    setColumnCount(Number(event.target.value));
  }, []);

  const saveOnClick = React.useCallback(
    (event) => {
      onSaveSettings({ columnCount, cycle, rowCount, showDiscovered });
    },
    [columnCount, cycle, onSaveSettings, rowCount, showDiscovered]
  );

  const isWarningDisplayed =
    rowCount !== settings.rowCount || columnCount !== settings.columnCount;

  return (
    <FocusLock>
      <div className={styles.settingsWrapper}>
        <div className={styles.modal}>
          <div className={styles.content}>
            <label htmlFor={cycleId} className={styles.label}>
              Keyboard navigation cycling:
            </label>
            <input
              checked={cycle}
              id={cycleId}
              onChange={cycleOnChange}
              type="checkbox"
            />
            <label htmlFor={showDiscoveredId}>
              Show already discovered tiles:
            </label>
            <input
              checked={showDiscovered}
              id={showDiscoveredId}
              onChange={showDiscoveredOnChange}
              type="checkbox"
            />
            <label className={styles.fullRow} htmlFor={rowId}>
              Number of rows:
            </label>
            <input
              id={rowId}
              max={10}
              min={1}
              onChange={rowCountOnChange}
              type="range"
              value={rowCount}
            />
            <span className={styles.count}>{rowCount}</span>
            <label className={styles.fullRow} htmlFor={columnId}>
              Number of columns:
            </label>
            <input
              id={columnId}
              max={10}
              min={1}
              onChange={columnCountOnChange}
              type="range"
              value={columnCount}
            />
            <span className={styles.count}>{columnCount}</span>
          </div>
          <button
            className={`action ${styles.saveButton}`}
            disabled={(rowCount * columnCount) % 2 > 0}
            onClick={saveOnClick}
          >
            Save & Close
          </button>
          {isWarningDisplayed && (
            <div className={styles.warning}>
              (Changing rows or columns will start a new game.)
            </div>
          )}
          <button className={styles.closeBtn} onClick={onCloseSettings}>
            <Image alt="Close icon" src={closeIcon} />
          </button>
        </div>
      </div>
    </FocusLock>
  );
};

export default Settings;
