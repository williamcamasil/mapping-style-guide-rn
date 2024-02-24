import { renderHook } from '@testing-library/react-hooks';

import { useDimensions } from '.';

describe('useStyles', () => {
  it('test useViewStyles', () => {
    const { result } = renderHook(() => useDimensions());

    expect(result.current).toEqual({
      screen: {
        fontScale: 2,
        height: 1334,
        scale: 2,
        width: 750,
      },
      statusBar: {
        height: 0,
      },
      window: {
        fontScale: 2,
        height: 1334,
        scale: 2,
        width: 750,
      },
    });
  });
});
