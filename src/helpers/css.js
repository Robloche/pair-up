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

const setCssValues = ({ tileBackColor, rowCount, columnCount }) => {
  setCssValue(CssTileBackColor, tileBackColor);
  setCssValue(CssRows, rowCount);
  setCssValue(CssColumns, columnCount);
};

export { setCssValue, setCssValues };
