import React from 'react';
import { View } from 'react-native';

import { render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import ModalProvider from './ModalProvider';
import { renderModal } from './test-utils';

describe('ModalProvider snapshots', () => {
  it('should render default', () => {
    const tree = render(
      <ModalProvider>
        <View />
      </ModalProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('ModalProvider events', () => {
  it('should call show and close', async () => {
    const handleDismiss = jest.fn();
    const handleDismissEnd = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
      onDismissEnd: handleDismissEnd,
    });

    await act(async () => {
      const modalInstance = showModal();

      await result.findByTestId('modal-children-text');

      act(() => {
        modalInstance.dismiss();
      });

      expect(result.queryByTestId('modal-children-text')).toBeFalsy();
    });

    expect(handleDismiss).toBeCalled();
    expect(handleDismissEnd).toBeCalled();
  });
});
