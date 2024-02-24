import React from 'react';

import { render } from '@testing-library/react-native';

import TitlePage from '.';

describe('TitlePage', () => {
  it('Should match snapshot with description', () => {
    const component = render(<TitlePage title="Title" description="Description" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('Should match snapshot with title only', () => {
    const component = render(<TitlePage title="Title" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
