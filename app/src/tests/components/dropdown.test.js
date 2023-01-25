import React from 'react';
import { render } from '@testing-library/react';
import Dropdown from '../../components/Dropdown';

describe('Component Autocomplete', () => {
  const mockData = [
    {
      id: 1,
      attributes: {
        name: 'It',
        results: 1000,
        level: 0,
      },
    },
  ];
  it('should render the component', () => {
    const { container } = render(<Dropdown data={mockData} />);
    expect(container.getElementsByClassName('dropdownWrapper').length).toBe(1);
  });
});
