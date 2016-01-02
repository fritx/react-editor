import React, { Component } from 'react'
import { filter, clean } from './format'
import { clear, save, restore } from './selection'


export default class Editor extends Component {

  onPaste(e) {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    // console.log('paste:html', html)
    // console.log('paste:text', text)

    if (html) {
      const _html = filter(html)
      console.log('insert:html', _html)
      document.execCommand('insertHtml', 0, _html)
    }
    else if (text) {
      console.log('insert:text', text)
      document.execCommand('insertText', 0, text)
    }
    clean(this.refs.edit)
  }

  onFocus() {
    restore()
  }

  onBlur() {
    clean(this.refs.edit)
    save(this.refs.edit)

    // 解决win上其他域选中干扰
    clear()
  }

  // 确保选中前clean 不影响选中
  onMouseDown() {
    clean(this.refs.edit)
  }

  render() {
    return (
      <div {...this.props} ref="edit" contentEditable
        onMouseDown={this.onMouseDown.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onPaste={this.onPaste.bind(this)} />
    )
  }

}
