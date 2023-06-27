class CustomHtmlCell {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = this.getValueToDisplay(params);
    if( params.colDef.htmlObj){
      this.eGui.innerHTML = "";
      this.eGui.appendChild(this.getValueToDisplay(params));
    }
  }

  removeSpaces(str) {
    return str ? str.replace(/\s/g, '') : str;
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return false;
  }
  getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
export default CustomHtmlCell;