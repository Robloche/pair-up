import {
  getFoundTiles,
  getVisibleTiles,
  initializeTiles,
} from "@/helpers/tiles";
import Banner from "@/components/Banner";
import Image from "next/image";
import React from "react";
import Score from "@/components/Score";
import Settings from "@/components/Settings";
import { State } from "@/helpers/types";
import Tiles from "@/components/Tiles";
import settingsIcon from "../assets/settings.svg";
import styles from "./Game.module.css";
import useArrowNavigation from "@/hooks/use-arrow-navigation";
import useKeyUp from "@/hooks/use-key-up";

const Game = () => {
  const [attempts, setAttempts] = React.useState(0);
  const [tiles, setTiles] = React.useState([]);
  const [areSettingsOpen, setAreSettingsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState({
    columnCount: 6,
    cycle: true,
    rowCount: 4,
    showDiscovered: false,
  });

  useArrowNavigation(settings.rowCount, settings.columnCount, settings.cycle);

  const openSettings = () => {
    setAreSettingsOpen(true);
  };

  const closeSettings = () => {
    setAreSettingsOpen(false);
  };

  const saveSettings = (newSettings) => {
    setAreSettingsOpen(false);
    setSettings(newSettings);
  };

  useKeyUp("Escape", closeSettings);

  const hideTiles = (hideFound = false) => {
    setTiles((tiles) =>
      tiles.map((t) => ({
        ...t,
        state: hideFound || t.state === State.Visible ? State.Hidden : t.state,
      }))
    );
  };

  const reset = React.useCallback(
    (waitForHiding = true) => {
      const initTiles = () =>
        setTiles(initializeTiles(settings.rowCount, settings.columnCount));

      setAttempts(0);
      hideTiles(true);
      if (waitForHiding) {
        setTimeout(initTiles, 500);
      } else {
        initTiles();
      }
    },
    [settings]
  );

  // Initialization
  React.useEffect(() => {
    const bodyStyles = window.getComputedStyle(document.body);
    const currentRowCount = Number(bodyStyles.getPropertyValue("--grid-rows"));
    const currentColumnCount = Number(
      bodyStyles.getPropertyValue("--grid-columns")
    );

    if (
      settings.rowCount !== currentRowCount ||
      settings.columnCount !== currentColumnCount
    ) {
      const rootElt = document.querySelector(":root");
      rootElt.style.setProperty("--grid-rows", settings.rowCount);
      rootElt.style.setProperty("--grid-columns", settings.columnCount);
      reset(false);
    }
  }, [reset, settings]);

  const showTile = React.useCallback(
    (index) => {
      const newTiles = [...tiles];
      newTiles[index].state = State.Visible;
      newTiles[index].discovered = true;

      const visibleTiles = getVisibleTiles(tiles);

      if (visibleTiles.length === 2) {
        setAttempts(attempts + 1);
        if (visibleTiles[0].char === visibleTiles[1].char) {
          // Pair found
          newTiles[visibleTiles[0].index].state = State.Found;
          newTiles[visibleTiles[1].index].state = State.Found;
        } else {
          // Missed
          setTimeout(hideTiles, 1_000);
        }
      }

      setTiles(newTiles);
    },
    [attempts, tiles]
  );

  const missed = attempts - getFoundTiles(tiles).length / 2;

  const isEnd =
    getFoundTiles(tiles).length === settings.rowCount * settings.columnCount;

  return (
    <>
      {isEnd && <Banner attempts={attempts} missed={missed} onReset={reset} />}
      <div className={styles.gameWrapper}>
        <button className={styles.settingsBtn} onClick={openSettings}>
          <Image alt="Settings icon" src={settingsIcon} />
        </button>
        <Score attempts={attempts} missed={missed} />
        <Tiles
          showDiscovered={settings.showDiscovered}
          showTile={showTile}
          tiles={tiles}
        />
      </div>
      {areSettingsOpen && (
        <Settings
          onCloseSettings={closeSettings}
          onSaveSettings={saveSettings}
          settings={settings}
        />
      )}
    </>
  );
};

export default Game;
