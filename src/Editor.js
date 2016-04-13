import React, { Component, PropTypes } from 'react'
import { filter, lint } from './format'
import { clearRange, setRange, getRange } from './range'
// import pasteFile from './pasteFile'
// import { emojiReplace } from '../Emoji'
// import { escapeHTML } from '../Text'

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;') // `&`必须最前`
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}


export default class Editor extends Component {

  static propTypes = {
    pasteToFs: PropTypes.bool,
  };

  constructor() {
    super()
    this.savedRange = null
  }

  focus() {
    this.refs.edit.blur() // 确保focus有效
    this.refs.edit.focus()
  }

  lint() {
    lint(this.refs.edit)
  }
  clearRange() {
    clearRange()
  }
  restoreRange() {
    if (this.savedRange) setRange(this.savedRange)
    this.savedRange = null
  }
  saveRange() {
    const range = getRange(this.refs.edit)
    if (range) this.savedRange = range
  }

  getHTML() {
    return this.refs.edit.innerHTML
  }
  setHTML(html) {
    this.refs.edit.innerHTML = html
  }

  insertHTML(html) {
    this.focus()
    // html = emojiReplace(html)
    document.execCommand('insertHTML', 0, html)
  }
  insertText(text) {
    const html = escapeHTML(text)
    this.insertHTML(html)
  }
  insertImage(src) {
    this.insertHTML(`<img src="${src}">`)
  }

  onPaste(e) {
    e.preventDefault()
    const { pasteToFs } = this.props
    const types = e.clipboardData.types
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    // console.log('paste:html', html)
    // console.log('paste:text', text)

    // 延时 解决 execCommand('paste') 递归问题
    // setTimeout(() => {
    if (html) {
      const _html = filter(html)
      // console.log('insert:html', _html)
      // document.execCommand('insertHtml', 0, _html)
      setTimeout(() => { this.insertHTML(_html) })
    }
    else if (text) {
      // console.log('insert:text', text)
      // document.execCommand('insertText', 0, text)
      setTimeout(() => { this.insertText(text) })
    }
    // mac粘贴word需要 优先识别文本 然后图片
    // 粘贴板内有files 如来自QQ截屏
    else if (pasteToFs && types && types.indexOf('Files') > -1) {
      require('./pasteFile').call(this, e)
    }
    // })
  }

  // 确保选中前lint 不影响选中
  onMouseDown() {
    this.lint()
  }

  render() {
    return (
      <div ref="edit" contentEditable
        onMouseDown={this.onMouseDown.bind(this)}
        onPaste={this.onPaste.bind(this)}
        {...this.props} />
    )
  }

}
