import React, { useState, useCallback, useRef } from 'react';
import logo from './logo.svg';
import styles from './Home.module.css';
import { Editor, EditorRefAttrs } from 'react-editor';

let processText = (s: string) => s; // noop
let processHTML = (s: string) => s; // todo limit

export let Home: React.FC = () => {
  let [value, setValue] = useState('');
  let [value4, setValue4] = useState('');
  let [imgHeight, setImgHeight] = useState('40px');
  let ref = useRef<EditorRefAttrs>(null);

  let setRandomValue = useCallback(() => {
    setValue(String(Math.random()));
  }, []);

  let insertEmoji = useCallback(() => {
    let editor = ref.current;
    if (editor) editor.insertText('😁');
  }, []);

  let insertHTML = useCallback(() => {
    let editor = ref.current;
    if (editor)
      editor.insertHTML(
        // '&nbsp;<span contenteditable="false" class="atwho-item">@fritx</span>&nbsp;'
        '<img src="./static/media/logo.5d5d9eef.svg">'
      );
  }, []);

  let handleImgHeight = useCallback(e => {
    setImgHeight(e.target.value);
  }, []);

  return (
    <div className={styles.Home}>
      <style>{`.${styles.Editor} img { height: ${imgHeight} }`}</style>

      <header className={styles.HomeHeader}>
        <img src={logo} className={styles.HomeLogo} alt="logo" />
        <a
          className={styles.HomeLink}
          href="https://github.com/fritx/react-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-editor
        </a>
      </header>

      <section className={styles.EditorBlock3}>
        <div>
          <button className={styles.EditorButton} onClick={setRandomValue}>
            Set Random
          </button>
          <button className={styles.EditorButton} onClick={insertEmoji}>
            Insert Emoji
          </button>
          <button className={styles.EditorButton} onClick={insertHTML}>
            Insert HTML
          </button>
          <input
            type="text"
            className={styles.InputControl}
            value={imgHeight}
            onChange={handleImgHeight}
          />
        </div>
        <div className={styles.EditorWrap3}>
          <Editor
            ref={ref}
            placeholder="Controlled Component"
            allowInWebDrop
            className={styles.Editor}
            processHTML={processHTML}
            processText={processText}
            value={value}
            onChange={setValue}
          />
        </div>
      </section>

      <section className={styles.EditorWrap1}>
        <Editor
          title={value4}
          placeholder="Uncontrolled Component"
          className={styles.Editor}
          onChange={setValue4}
        />
      </section>

      <section className={styles.EditorWrap1}>
        <Editor placeholder="Fixed Height" className={styles.Editor} />
      </section>

      <section className={styles.EditorWrap2}>
        <Editor placeholder="Auto Size" className={styles.Editor} />
      </section>
    </div>
  );
};
