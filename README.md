# react-editor is FINALLY RETURNED !!

> It's been over 4 years...<br>
> Now react-editor is BACK with fully TS & REACT-HOOKS integrated

- [x] Content-editable Rich-text editor
- [x] Typescript & React-hooks based with React >= 16.8
- [ ] Polyfill workaround with React < 16.8
- [x] Placeholder via CSS
- [x] Methods: focus(), insertHTML(s), insertText(s)
- [x] auto saveRange, restoreRange, moveToEnd
- [x] Controlled component - value, onChange
- [x] Uncontrolled component - onChange (defaultValue wip)
- [x] Inline-image, File handleDrop
- [x] processHTML, processText on insert
- [ ] processHTML, processText on paste
- [ ] common processHTML lint demo
- [x] Props API [here](#props)
- [ ] Test cases
- [x] 1.x Legacy: https://github.com/fritx/react-editor/tree/1.x
- [x] 2.0-alpha Demo: https://fritx.github.io/react-editor

```sh
npm i -S react-editor
```

```tsx
import { Editor } from 'react-editor' // named export, both
import Editor from 'react-editor' // default export

let [value, setValue] = useState('')
let ref = useRef()

ref.focus()
ref.insertText('foo')
ref.insertHTML('<img src="https://foo.bar/baz.png">')
value = 'set content'

<Editor
  ref={ref}
  placeholder="Type message to send..."
  className={styles.editor}
  value={value}
  onChange={setValue}
/>
```

#### Props

```tsx
export interface EditorProps {
  value?: string;
  className?: string;
  placeholder?: string;
  allowInWebDrop?: boolean;
  processHTML?: (html: string) => string;
  processText?: (text: string) => string;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLDivElement>) => void;
  onChange?: (value: string) => void;
  [restProp: string]: any; // onto <div>
}

export interface EditorRefAttrs {
  focus: () => void;
  insertHTML: (html: string) => void;
  insertText: (text: string) => void;
}
```

**for react < 16.8 we need hooks polyfill workaround**

```tsx
// todo
```

**for react-editor legacy version**

```sh
npm i -S react-editor@1.x
```

---

This project was bootstrapped with [react-ts-demo](https://github.com/fritx/react-ts-demo).
