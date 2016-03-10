# (WIP) react-editor

<img width="437" height="411" src="https://raw.githubusercontent.com/fritx/react-editor/dev/Snip20160310_3.png">

React component of `contentEditable` Rich-Text Editor that behaves like Tencent QQ's.

- [x] Rich-Text (includes texts, images)
- [x] Selection (range clear, save, restore)
- [x] Format (filters on paste, cleans on blur)
- [ ] Parse (content tokenizing)
- [ ] Qface & Emoji Insertion
- [ ] Font Settings (name, size, bold, color)
- [ ] Drop dependency of the fucking jquery ;)

```plain
$ npm i -S jquery react-editor
```

```.jsx
import React, { Component } from 'react'
import Editor from 'react-editor'

class Page extends Component {

  onFocus() {
    this.refs.editor.restoreRange()
  }
  onBlur() {
    const { editor } = this.refs
    editor.lint()
    editor.saveRange()
    editor.clearRange()
  }
  
  render() {
    return (
      <div onFocus={(e) => this.onFocus(e)}
        onBlur={(e) => this.onBlur(e)}>
        <Editor ref="editor" className={styles.editor}
          dangerouslySetInnerHTML={{__html: html}} />
      </div>
    )
  }
}
```
