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

it('usage of defaultValue and onChange', () => {
  let defaultValue = 'default content';
  let currValue = defaultValue;
  let editor: HTMLDivElement;

  const handleChange = (newValue: string) => {
    currValue = newValue;
  };

  const render = () => {
    act(() => {
      ReactDOM.render(
        <Editor id="editor" {...{ defaultValue }} onChange={handleChange} />,
        container
      );
    });
  };

  // initial render
  render();
  editor = container.querySelector('#editor') as HTMLDivElement;
  expect(editor.innerHTML).toBe('default content');

  // default value getting changed before once input
  for (let i = 1; i <= 3; i++) {
    defaultValue = `default content {i}`;
    render();
    editor = container.querySelector('#editor') as HTMLDivElement;
    expect(editor.innerHTML).toBe(`default content {i}`);
  }

  // user input and trigger onChange
  act(() => {
    editor.innerHTML = 'new content';
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  });
  expect(currValue).toBe('new content');

  // value prop updated
  render();
  editor = container.querySelector('#editor') as HTMLDivElement;
  expect(editor.innerHTML).toBe('new content');

  // default value getting changed after once input
  for (let i = 1; i <= 3; i++) {
    defaultValue = `default content {i}`;
    render();
    editor = container.querySelector('#editor') as HTMLDivElement;
    expect(editor.innerHTML).toBe('new content');
  }
});
