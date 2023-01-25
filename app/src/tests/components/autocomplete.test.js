import React from 'react';
import { render } from '@testing-library/react';
import Autocomplete from '../../components/Autocomplete';

describe('Component Autocomplete', () => {
  it('should render the component', () => {
    const { container } = render(<Autocomplete placeholder="Test" />);
    expect(container.getElementsByClassName('userInput').length).toBe(1);
  });
});
