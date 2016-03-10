import React, { Component } from 'react'
import { filter, lint } from './format'
import { clearRange, setRange, getRange } from './range'
// import pasteFile from './pasteFile'
// import { emojiReplace } from '../Emoji'
// import { escapeHTML } from '../Text'

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;') // `&`必须最前`
    // .replace(/ /g, '&nbsp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}


export default class Editor extends Component {

  constructor() {
    super()
    this.savedRange = null
    global.editor = this
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
    // note: 造成editor滚动失效
    e.preventDefault()
    const types = e.clipboardData.types
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    // console.log('paste:html', html)
    // console.log('paste:text', text)

    // 粘贴板内有files 如来自QQ截屏
    // if (types && types.indexOf('Files') > -1) {
    //   pasteFile(e)
    //   return
    // }

    // fixme: use this.insertHTML
    setTimeout(() => { // 解决execCommand递归
      if (html) {
        const _html = filter(html)
        // console.log('insert:html', _html)
        this.insertHTML(_html)
        // const _html = emojiReplace(filter(html))
        // console.log('insert:html', _html)
        // document.execCommand('insertHtml', 0, _html)
      }
      else if (text) {
        // console.log('insert:text', text)
        this.insertText(text)
        // const _html = emojiReplace(textToHTML(text))
        // document.execCommand('insertHtml', 0, _html)
        // document.execCommand('insertText', 0, text)
      }
      this.lint()
    })
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
