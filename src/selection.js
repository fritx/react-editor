
import $ from 'jquery'

const selection = window.getSelection()
let savedRange


export function clear() {
  // 是否可以 只移除特定range
  selection.removeAllRanges()
}

function getRange(dom) {
  const count = selection.rangeCount
  for (let i = 0; i < count; i++) {
    const range = selection.getRangeAt(i)
    if ($(range.commonAncestorContainer).closest(dom).length) {
      return range
    }
  }
  return null
}

export function save(dom) {
  savedRange = getRange(dom)
  // console.log('save', savedRange)
}

export function restore() {
  if (savedRange) {
    // console.log('restore', savedRange)
    selection.addRange(savedRange)
    savedRange = null
  }
}
