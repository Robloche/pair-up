const CssRows = '--grid-rows';
const CssColumns = '--grid-columns';

const setCssValues = (rowCount, columnCount) => {
  if (typeof window === 'undefined') {
    return;
  }

  const rootElt = window.document.querySelector(':root');
  rootElt.style.setProperty(CssRows, rowCount);
  rootElt.style.setProperty(CssColumns, columnCount);
};

const updateCssVariablesIfNeeded = (rowCount, columnCount) => {
  const bodyStyles = window.getComputedStyle(document.body);
  const currentRowCount = Number(bodyStyles.getPropertyValue(CssRows));
  const currentColumnCount = Number(bodyStyles.getPropertyValue(CssColumns));

  if (rowCount === currentRowCount && columnCount === currentColumnCount) {
    // Same values
    return false;
  }

  // New values
  setCssValues(rowCount, columnCount);
  return true;
};

export { setCssValues, updateCssVariablesIfNeeded };
