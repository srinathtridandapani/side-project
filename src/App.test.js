import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import AddTask from './components/AddTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a snapshot', () => {
  const tree = renderer.create(<AddTask/>).toJSON();
  expect(tree).toMatchSnapshot();
});
