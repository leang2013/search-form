import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('Component App', () => {
  it('should render the component', () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName('box').length).toBe(1);
  });
});
