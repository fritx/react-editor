import React, { Component } from 'react'
import Editor from '../src'
import styles from './Page.css'


const html = `
  <div>Awesome Electron&nbsp;<img src="../demo/awesome.svg"></div><div><img src="../demo/electron.svg"></div><div>Useful resources for creating apps with&nbsp;Electron</div><div>Inspired by the&nbsp;awesome&nbsp;list thing. You might also like&nbsp;awesome-nodejs.</div><div>Example apps</div><div>Some good apps written with Electron.</div><div>Open Source</div><div>Atom&nbsp;- Code editor.</div><div>Nuclide&nbsp;- Unified IDE.</div><div>Playback&nbsp;- Video player.</div>
`

export default class Page extends Component {

  render() {
    return (
      <div>
        <Editor ref="editor" className={styles.editor}
          dangerouslySetInnerHTML={{__html: html}} />
      </div>
    )
  }
}
