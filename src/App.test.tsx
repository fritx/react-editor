import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-editor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Editor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
