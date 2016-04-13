import React, { Component } from 'react'
import Editor from '../src'
import styles from './Page.css'

const html = `
  <div>Awesome Electron&nbsp;<img src="../demo/awesome.svg"></div><div><img src="../demo/electron.svg"></div><div>Useful resources for creating apps with&nbsp;Electron</div><div>Inspired by the&nbsp;awesome&nbsp;list thing. You might also like&nbsp;awesome-nodejs.</div><div>Example apps</div><div>Some good apps written with Electron.</div><div>Open Source</div><div>Atom&nbsp;- Code editor.</div><div>Nuclide&nbsp;- Unified IDE.</div><div>Playback&nbsp;- Video player.</div>
`
const isCtrlSend = true


export default class Page extends Component {

  componentDidMount() {
    this.refs.editor.setHTML(html) // 初始化内容

    window.addEventListener('click', () => {
      this.forceUpdate() // demo中模拟外部render
    })
  }

  submitForm() {
    // todo
    console.log('submitForm')
  }

  onFocus() {
    this.refs.editor.restoreRange()
  }
  onBlur() {
    const { editor } = this.refs
    editor.lint()
    editor.saveRange()

    // 解决win上其他域选中干扰
    editor.clearRange()
  }
  onKeyDown(e) {
    // note: hasCtrl && !isCtrlSend insert换行
    // 造成editor滚动失效
    if (e.keyCode === 13) {
      const hasCtrl = e.ctrlKey || e.metaKey
      if (hasCtrl ^ isCtrlSend) { // 不一致
        if (hasCtrl) {
          e.preventDefault() // 滚动失效
          this.refs.editor.insertText('\n')
        } // else不处理 采用默认行为
      } else { // 一致
        e.preventDefault()
        this.submitForm()
      }
      return
    }
  }

  render() {
    return (
      <div onFocus={(e) => this.onFocus(e)}
        onBlur={(e) => this.onBlur(e)}
        onKeyDown={(e) => this.onKeyDown(e)}>
        <Editor ref="editor" className={styles.editor} />
      </div>
    )
  }
}
