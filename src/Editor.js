import React, { Component, PropTypes } from 'react'
import { filter, lint } from './format'
import { clearRange, setRange, getRange } from './range'

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;') // `&`必须最前`
    // .replace(/ /g, '&nbsp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function objEqual(o1 = {}, o2 = {}) {
  const [k1, k2] = [Object.keys(o1), Object.keys(o2)]
  if (k1.length !== k2.length) return false
  return k1.every(k => {
    return o1[k] === o2[k]
  })
}

export default class Editor extends Component {

  static propTypes = {
    pasteToFs: PropTypes.bool,
    emojiReplace: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  constructor() {
    super()
    this.savedRange = null
    this.onMouseDown = ::this.onMouseDown
    this.onKeyDown = ::this.onKeyDown
    this.onPaste = ::this.onPaste

    // http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html
    // this.shouldComponentUpdate = PureRenderMixin
    //   .shouldComponentUpdate.bind(this)
  }

  focus() {
    this.refs.edit.blur() // 确保focus有效 好神奇
    this.refs.edit.focus()
  }

  shouldComponentUpdate(props) {
    // dangerousSetInnerHTML不需要更新
    // 修复输入文字 cursor回跳现象
    if (!objEqual(props.style, this.props.style)) return true
    return false
  }

  componentDidMount() {
    this.lint()
  }

  lint() {
    lint(this.refs.edit)
  }
  clearRange() {
    clearRange()
  }
  restoreRange() {
    if (this.savedRange) {
      setRange(this.savedRange)
      this.savedRange = null
    }
  }
  saveRange() {
    this.lint()
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
    const { emojiReplace } = this.props
    this.focus()
    setTimeout(() => {
      if (emojiReplace) {
        html = emojiReplace(html)
      }
      document.execCommand('insertHTML', 0, html)
    })
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
    e = e.originalEvent || e
    const { pasteToFs } = this.props
    const types = e.clipboardData.types || []
    const items = e.clipboardData.items || []
    let html = e.clipboardData.getData('text/html')
    let text = e.clipboardData.getData('text/plain')
    // console.log('paste:html', html)
    // console.log('paste:text', text)

    // mac上base64图片 text存在 html为空
    // 发送消息时有安全过滤 不怕恶意代码插入
    if (!html.trim() && /^\s*data:image\//.test(text)) {
      html = `<img src="${text.trim()}">`
    }
    // mac finder与qq图文 暂时无法区分
    // else {
    //   // 放入else 因为后者意外地包含前者
    //   // 在mac上直接从finder复制粘贴文件 nw无法获取具体路径
    //   // 因此直接忽略行为 windows本身也是忽略
    //   // qq能正常响应并且发送文件 这点我们做不到
    //   const isFinderCopy = types[0] === 'text/plain'
    //     && types[1] === 'Files'
    //     && !/^https?:\/\//.test(text)
    //   if (isFinderCopy) return
    // }

    // 优先处理图片 即可实现 base64粘贴和excel粘贴为图片
    // const isFile = types && types.indexOf('Files') > -1
    let i = 0, item
    for (; i < types.length; i++) {
      if (types[i] === 'Files') {
        item = items[i]
        break
      }
    }
    const hasImage = item
      && item.kind === 'file'
      && /^image\/|^(jpe?g|png|bmp|gif)$/.test(item.type)

    const pasteHTMLOrText = () => {
      if (html) {
        const _html = filter.call(this, html) // pass `this`
        setTimeout(() => { this.insertHTML(_html) })
      }
      else if (text) {
        text = text.replace(/^\n+|\n+$/g, '')
        setTimeout(() => { this.insertText(text) })
      }
    }
    const isImage = hasImage && (!html && !text)

    let isTable = false
    if (html) {
      // 来自filter函数的部分逻辑
      const mat = html.match(/<body(>| [^>]*>)([\s\S]*?)<\/body>/i)
      if (mat) {
        const div = document.createElement('div')
        div.innerHTML = mat[2]
        if (div.querySelector('table')) {
          isTable = true
        }
      }
    }

    // 从word/excel粘贴表格 需要提取图片 同QQ
    const pasteImage = hasImage && (isImage || isTable)

    // 延时 解决 execCommand('paste') 递归问题
    // setTimeout(() => {
    // xslx表格含html(优先提取图片) MacQQ图文不含html(优先提取文本)
    // if (pasteToFs && isImage && (html.trim() || !text.trim() && !html.trim())) {
    if (pasteToFs && pasteImage) {
      require('./pasteFile').default.call(this, e, err => {
        // windows qq粘贴单图 result为空 可以html粘贴
        if (err) {
          pasteHTMLOrText()
        }
      })
    }
    else {
      pasteHTMLOrText()
    }
    // mac粘贴word需要 优先识别文本 然后图片
    // 粘贴板内有files 如来自QQ截屏
    // else if (pasteToFs && types && types.indexOf('Files') > -1) {
    //   require('./pasteFile').default.call(this, e)
    // }
    // })
  }

  // 确保选中前clean 不影响选中
  onMouseDown() {
    this.lint()
  }

  // 差点漏了从richtext从迁移
  onKeyDown(e) {
    // 禁止PageUp/Down键 导致页面诡异上移
    // 具体原因不详
    if (e.keyCode === 33 || e.keyCode === 34) {
      e.preventDefault()
    }
  }

  render() {
    // fix warning: Unknown prop `abc` on <div> tag.
    // Remove this prop from the element.
    // For details, see https://fb.me/react-unknown-prop
    const { id, className, style } = this.props
    return (
      <div ref="edit" contentEditable
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onPaste={this.onPaste}
        {...{
          id,
          className,
          style,
        }} />
    )
  }

}
