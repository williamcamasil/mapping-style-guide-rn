import React from 'react';

import { render } from '@testing-library/react-native';

import Shimmer from '.';

describe('Shimmer snapshots', () => {
  it('empty', () => {
    const tree = render(<Shimmer visible contentList={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('simple shimmer', () => {
    const tree = render(<Shimmer
      visible
      contentList={[
        { height: 10, width: 10 },
        { height: 10, width: 10 },
        { height: 10, width: 10 },
      ]}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('nested shimmer', () => {
    const tree = render(<Shimmer
      visible
      contentList={[
        {
          contentList: [
            { height: 10, width: 10 },
            { height: 10, width: 10 },
            { height: 10, width: 10 },
          ],
        },
      ]}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('invisible shimmer', () => {
    const tree = render(<Shimmer
      visible={false}
      contentList={[
        {
          contentList: [
            { height: 10, width: 10 },
            { height: 10, width: 10 },
            { height: 10, width: 10 },
          ],
        },
      ]}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
