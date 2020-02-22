import * as React from 'react';
import { applyRange, getRange, moveToEnd } from './range';
import styles from './styles.css';

export interface EditorProps {
  value?: string;
  defaultValue?: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [restProp: string]: any; // onto <div>
}

export interface EditorRefAttrs {
  focus: () => void;
  insertHTML: (html: string) => void;
  insertText: (text: string) => void;
}

let {
  forwardRef,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
} = React;

export let Editor = forwardRef<EditorRefAttrs, EditorProps>((props, ref) => {
  let {
    value,
    defaultValue,
    className,
    placeholder,
    allowInWebDrop,
    processHTML,
    processText,
    onFocus,
    onBlur,
    onChange,
    onDrop,
    onPaste,
    ...restProps
  } = props;
  let [onceChanged, setOnceChanged] = useState(false);
  let elRef = useRef<HTMLDivElement>(null);
  let rangeRef = useRef<Range | null>(null);

  let saveRange = useCallback(() => {
    let range = getRange();
    rangeRef.current = range;
  }, []);

  let restoreRange = useCallback(() => {
    let range = rangeRef.current;
    if (range) {
      applyRange(range);
    } else {
      let el = elRef.current;
      if (el) moveToEnd(el);
    }
  }, []);

  let focus = useCallback(() => {
    let el = elRef.current;
    if (el) el.focus();
  }, []);

  let insertHTML = useCallback(
    (html: string) => {
      focus();
      if (processHTML) html = processHTML(html);
      document.execCommand('insertHTML', false, html);
    },
    [processHTML]
  );

  let insertText = useCallback(
    (text: string) => {
      focus();
      if (processText) text = processText(text);
      document.execCommand('insertHTML', false, text);
    },
    [processText]
  );

  let handleInput = useCallback(() => {
    let el = elRef.current;
    if (el) {
      if (el && el.innerText === '\n') {
        // @fixme
        el.innerHTML = ''; // fix placeholder
      }
      setOnceChanged(true);
      let newValue = el.innerHTML;
      if (onChange) onChange(newValue);
    }
  }, []);

  let handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    restoreRange();
    if (onFocus) onFocus(e);
  }, []);

  let handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    saveRange();
    if (onBlur) onBlur(e);
  }, []);

  let handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      let files = e.dataTransfer.files || [];
      // avoid in-web drop unless set to allow
      if (files.length <= 0 && !allowInWebDrop) {
        e.preventDefault();
      }
      // avoid file-open as browser default
      if (files.length >= 1) {
        e.preventDefault();
      }
      if (onDrop) onDrop(e);
    },
    [allowInWebDrop]
  );

  let handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      // e.preventDefault();
      // // const types = e.clipboardData.types || []
      // // const items = e.clipboardData.items || []
      // let html = e.clipboardData.getData('text/html');
      // let text = e.clipboardData.getData('text/plain');
      // // @todo types & items
      // if (html) {
      //   insertHTML(html);
      // } else if (text) {
      //   insertText(text);
      // }
      // @todo
      if (onPaste) onPaste(e);
    },
    [insertHTML, insertText]
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        focus,
        insertHTML,
        insertText,
      };
    },
    [insertHTML, insertText]
  );

  useLayoutEffect(() => {
    let el = elRef.current;
    if (el && value !== undefined && value !== el.innerHTML) {
      let html = value;
      if (processHTML) html = processHTML(html);
      el.innerHTML = html;
      moveToEnd(el);
    }
  }, [value, processHTML]);

  useLayoutEffect(() => {
    let el = elRef.current;
    if (
      el &&
      !onceChanged &&
      value === undefined &&
      defaultValue !== undefined &&
      defaultValue !== el.innerHTML
    ) {
      let html = defaultValue;
      if (processHTML) html = processHTML(html);
      el.innerHTML = html;
      moveToEnd(el);
    }
  }, [value, processHTML, defaultValue, onceChanged]);

  return (
    <div
      ref={elRef}
      contentEditable
      data-placeholder={placeholder}
      className={[styles.editor, className].filter(Boolean).join(' ')}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onInput={handleInput}
      {...restProps}
    />
  );
});
