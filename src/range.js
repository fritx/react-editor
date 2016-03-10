
import $ from 'jquery'

const selection = window.getSelection()


export function clearRange() {
  // 是否可以 只移除特定range
  selection.removeAllRanges()
}

export function getRange(dom) {
  const count = selection.rangeCount
  for (let i = 0; i < count; i++) {
    const range = selection.getRangeAt(i)
    if ($(range.commonAncestorContainer).closest(dom).length) {
      return range
    }
  }
  return null
}

export function setRange(range) {
  clearRange()
  if (range) selection.addRange(range)
}
