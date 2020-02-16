export let applyRange = (range: Range) => {
  let selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export let getRange = () => {
  let selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }
  return null;
};

export let moveToEnd = (el: HTMLDivElement) => {
  el.focus();
  let selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.selectAllChildren(el); //range 选择obj下所有子内容
    selection.collapseToEnd(); //光标移至最后
  }
};
