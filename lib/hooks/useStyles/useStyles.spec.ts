import { renderHook } from '@testing-library/react-hooks';

import { useViewStyles, useTextStyles, useImageStyles } from '.';

describe('useStyles', () => {
  it('test useViewStyles', () => {
    const { result } = renderHook(() => useViewStyles(() => [
      {
        backgroundColor: 'red',
        marginTop: 5,
      },
      {
        marginTop: 10,
      },
    ], []));

    expect(result.current).toEqual({
      backgroundColor: 'red',
      marginTop: 10,
    });
  });

  it('test useTextStyles', () => {
    const { result } = renderHook(() => useTextStyles(() => [
      {
        fontSize: 10,
        color: 'red',
      },
      {
        fontSize: 5,
      },
    ], []));

    expect(result.current).toEqual({
      color: 'red',
      fontSize: 5,
    });
  });

  it('test useImageStyles', () => {
    const { result } = renderHook(() => useImageStyles(() => [
      {
        backgroundColor: 'red',
        marginTop: 5,
      },
      {
        marginTop: 10,
      },
    ], []));

    expect(result.current).toEqual({
      backgroundColor: 'red',
      marginTop: 10,
    });
  });

  it('test styles memo', () => {
    const { result } = renderHook(() => useImageStyles(() => [
      {
        backgroundColor: 'red',
        resizeMode: 'center',
      },
      {
        resizeMode: 'contain',
      },
    ], []));

    expect(result.current).toEqual({
      backgroundColor: 'red',
      resizeMode: 'contain',
    });
  });
});
