import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Editor } from 'react-editor';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
});

it('can render', () => {
  act(() => {
    ReactDOM.render(<Editor id="editor" />, container);
  });
  const editor = container.querySelector('#editor') as HTMLDivElement;
  expect(editor.innerHTML).toBe('');
});
