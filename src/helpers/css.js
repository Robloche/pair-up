const CssTileBackColor = '--tile-back-color';
const CssRows = '--grid-rows';
const CssColumns = '--grid-columns';

const setCssValue = (cssName, value) => {
  if (typeof window === 'undefined') {
    return;
  }

  const rootElt = window.document.querySelector(':root');
  rootElt.style.setProperty(cssName, value);
};

const setCssValues = (tileBackColor, rowCount, columnCount) => {
  setCssValue(CssTileBackColor, tileBackColor);
  setCssValue(CssRows, rowCount);
  setCssValue(CssColumns, columnCount);
};

const updateCssVariablesIfNeeded = (tileBackColor, rowCount, columnCount) => {
  const bodyStyles = window.getComputedStyle(document.body);
  const currentTileBackColor = Number(bodyStyles.getPropertyValue(CssTileBackColor));
  const currentRowCount = Number(bodyStyles.getPropertyValue(CssRows));
  const currentColumnCount = Number(bodyStyles.getPropertyValue(CssColumns));

  let hasChanged = false;

  if (tileBackColor !== currentTileBackColor) {
    hasChanged = true;
    setCssValue(CssTileBackColor, tileBackColor);
  }

  if (rowCount !== currentRowCount) {
    hasChanged = true;
    setCssValue(CssRows, rowCount);
  }

  if (columnCount !== currentColumnCount) {
    hasChanged = true;
    setCssValue(CssColumns, columnCount);
  }

  return hasChanged;
};

export { setCssValue, setCssValues, updateCssVariablesIfNeeded };
