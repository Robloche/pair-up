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

const setRowColumnCssValues = (rowCount, columnCount) => {
  setCssValue(CssRows, rowCount);
  setCssValue(CssColumns, columnCount);
};

const setTileBackColorCssValue = (tileBackColor) => {
  setCssValue(CssTileBackColor, tileBackColor);
};

export { setCssValue, setRowColumnCssValues, setTileBackColorCssValue };
