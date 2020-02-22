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

it('should not clear when linebreak after <img>', () => {
  let currValue = '';
  let editor: HTMLDivElement;

  const handleChange = (newValue: string) => {
    currValue = newValue;
  };

  const render = () => {
    act(() => {
      ReactDOM.render(
        <Editor id="editor" value={currValue} onChange={handleChange} />,
        container
      );
    });
  };

  // initial render
  render();
  editor = container.querySelector('#editor') as HTMLDivElement;
  expect(editor.innerHTML).toBe('');

  // user input an <img>
  act(() => {
    editor.innerHTML += '<img src="some.png">';
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  });
  expect(currValue).toBe('<img src="some.png">');

  // user input a linebreak
  act(() => {
    editor.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, code: '13' })
    );
    editor.innerHTML += '<div><br></div>';
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  });
  expect(currValue).toBe('<img src="some.png"><div><br></div>');

  // value prop updated
  render();
  editor = container.querySelector('#editor') as HTMLDivElement;
  expect(editor.innerHTML).toBe('<img src="some.png"><div><br></div>');
});
