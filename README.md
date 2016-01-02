# (WIP) react-editor

React component of `contentEditable` Rich-Text Editor that behaves like Tencent QQ's.

- [x] Rich-Text (includes texts, images)
- [x] Selection (range clear, save, restore)
- [x] Format (filters on paste, cleans on blur)
- [ ] Parse (content tokenizing)
- [ ] Qface & Emoji Icon
- [ ] Font Settings (name, size, bold, color)
- [ ] Drop dependency of the fucking jquery ;)

```plain
$ npm i -S react jquery react-editor
```

```.jsx
import React, { Component } from 'react'
import Editor from 'react-editor'

class Page extends Component {
  render() {
    return (
      <div>
        <Editor />
      </div>
    )
  }
}
```
